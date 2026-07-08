import { promises as fs } from "fs";
import path from "path";
import type { ContactMessage } from "@/types/contactMessage";

const messagesPath = path.join(process.cwd(), "data", "contact-messages.json");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

type StoredContactMessage = {
  id: string;
  name: string;
  contact: string;
  project_type: string;
  message: string;
  created_at: string;
};

function hasSupabaseStorage() {
  return Boolean(supabaseUrl && supabaseKey);
}

function assertWritableStorage() {
  if (process.env.VERCEL && !hasSupabaseStorage()) {
    throw new Error("Message storage is not configured for deployment.");
  }
}

function toContactMessage(message: StoredContactMessage): ContactMessage {
  return {
    id: message.id,
    name: message.name,
    contact: message.contact,
    projectType: message.project_type,
    message: message.message,
    createdAt: message.created_at
  };
}

async function supabaseRequest<T>(pathName: string, init?: RequestInit) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${pathName}`, {
    ...init,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Could not access message storage.");
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

async function ensureMessagesFile() {
  await fs.mkdir(path.dirname(messagesPath), { recursive: true });

  try {
    await fs.access(messagesPath);
  } catch {
    await fs.writeFile(messagesPath, "[]", "utf8");
  }
}

export async function readContactMessages(): Promise<ContactMessage[]> {
  if (hasSupabaseStorage()) {
    const messages = await supabaseRequest<StoredContactMessage[]>(
      "contact_messages?select=*&order=created_at.desc"
    );

    return messages.map(toContactMessage);
  }

  await ensureMessagesFile();
  const raw = await fs.readFile(messagesPath, "utf8");

  try {
    const messages = JSON.parse(raw) as ContactMessage[];
    return messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function saveContactMessage(message: Omit<ContactMessage, "id" | "createdAt">) {
  assertWritableStorage();

  const newMessage: ContactMessage = {
    ...message,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };

  if (hasSupabaseStorage()) {
    const created = await supabaseRequest<StoredContactMessage[]>("contact_messages", {
      method: "POST",
      headers: {
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        id: newMessage.id,
        name: newMessage.name,
        contact: newMessage.contact,
        project_type: newMessage.projectType,
        message: newMessage.message,
        created_at: newMessage.createdAt
      })
    });

    return toContactMessage(created[0]);
  }

  const messages = await readContactMessages();
  await fs.writeFile(messagesPath, JSON.stringify([newMessage, ...messages], null, 2), "utf8");
  return newMessage;
}

export async function deleteContactMessage(id: string) {
  assertWritableStorage();

  if (hasSupabaseStorage()) {
    await supabaseRequest<null>(`contact_messages?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE"
    });

    return true;
  }

  const messages = await readContactMessages();
  const nextMessages = messages.filter((message) => message.id !== id);
  await fs.writeFile(messagesPath, JSON.stringify(nextMessages, null, 2), "utf8");

  return nextMessages.length !== messages.length;
}

export async function deleteAllContactMessages() {
  assertWritableStorage();

  if (hasSupabaseStorage()) {
    await supabaseRequest<null>("contact_messages?id=not.is.null", {
      method: "DELETE"
    });

    return;
  }

  await ensureMessagesFile();
  await fs.writeFile(messagesPath, "[]", "utf8");
}

export function isValidAdminPasscode(passcode: string | null) {
  const expected = process.env.ADMIN_PASSCODE?.trim();
  return Boolean(passcode && passcode === expected);
}
