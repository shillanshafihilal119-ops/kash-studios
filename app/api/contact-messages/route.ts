import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  deleteAllContactMessages,
  deleteContactMessage,
  isValidAdminPasscode,
  readContactMessages,
  saveContactMessage
} from "@/lib/contactMessages";

export const runtime = "nodejs";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function cleanPhone(value: unknown) {
  const raw = cleanText(value);
  const hasLeadingPlus = raw.startsWith("+");
  const digits = raw.replace(/\D/g, "").slice(0, 15);

  return hasLeadingPlus ? `+${digits}` : digits;
}

function canAccessAdmin(request: Request) {
  const passcode = request.headers.get("x-admin-passcode");
  const isDeviceUnlocked = cookies().get("kash_admin_unlocked")?.value === "true";

  return isDeviceUnlocked || isValidAdminPasscode(passcode);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = cleanText(body.name);
  const contact = cleanPhone(body.contact);
  const projectType = cleanText(body.projectType);
  const message = cleanText(body.message);

  if (!name || !contact || !message) {
    return NextResponse.json({ error: "Name, phone number, and message are required." }, { status: 400 });
  }

  if (contact.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  try {
    const saved = await saveContactMessage({
      name,
      contact,
      projectType: projectType || "Not selected",
      message
    });

    return NextResponse.json({ message: saved }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Message storage is not configured." }, { status: 503 });
  }
}

export async function GET(request: Request) {
  if (!process.env.ADMIN_PASSCODE?.trim()) {
    return NextResponse.json({ error: "Admin passcode is not configured." }, { status: 503 });
  }

  if (!canAccessAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const messages = await readContactMessages();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Could not load messages." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!process.env.ADMIN_PASSCODE?.trim()) {
    return NextResponse.json({ error: "Admin passcode is not configured." }, { status: 503 });
  }

  if (!canAccessAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { id?: unknown; all?: unknown } | null;

  if (body?.all === true) {
    try {
      await deleteAllContactMessages();
      return NextResponse.json({ deleted: true });
    } catch {
      return NextResponse.json({ error: "Could not delete messages." }, { status: 503 });
    }
  }

  const id = cleanText(body?.id);

  if (!id) {
    return NextResponse.json({ error: "Message id is required." }, { status: 400 });
  }

  try {
    const deleted = await deleteContactMessage(id);
    return NextResponse.json({ deleted });
  } catch {
    return NextResponse.json({ error: "Could not delete message." }, { status: 503 });
  }
}
