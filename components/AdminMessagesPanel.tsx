"use client";

import { Mail, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContactMessage } from "@/types/contactMessage";

export function AdminMessagesPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadMessages() {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact-messages");

      if (!response.ok) {
        throw new Error(response.status === 401 ? "This device is not unlocked." : "Could not load messages.");
      }

      const data = (await response.json()) as { messages: ContactMessage[] };
      setMessages(data.messages);
      setStatus("ready");
    } catch (loadError) {
      setMessages([]);
      setError(loadError instanceof Error ? loadError.message : "Could not load messages.");
      setStatus("error");
    }
  }

  useEffect(() => {
    void loadMessages();
  }, []);

  async function deleteMessage(id: string) {
    const confirmed = window.confirm("Delete this message?");

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      const response = await fetch("/api/contact-messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error("Could not delete message.");
      }

      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== id));
      setStatus("ready");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete message.");
    } finally {
      setDeletingId(null);
    }
  }

  async function clearAllMessages() {
    const confirmed = window.prompt("Type DELETE to delete all messages. This cannot be undone.");

    if (confirmed !== "DELETE") {
      return;
    }

    setDeletingId("all");
    setError("");

    try {
      const response = await fetch("/api/contact-messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ all: true })
      });

      if (!response.ok) {
        throw new Error("Could not delete all messages.");
      }

      setMessages([]);
      setStatus("ready");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete all messages.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 py-10 text-slate-100 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">Private</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">KASH STUDIOS messages</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Private website enquiries submitted from the contact form.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={loadMessages}
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCw className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={clearAllMessages}
            disabled={messages.length === 0 || deletingId === "all"}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {deletingId === "all" ? "Deleting..." : "Clear All"}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Back to site
          </a>
        </div>
      </header>

      {error ? <p className="mt-4 rounded-md border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p> : null}

      <section className="mt-8 grid gap-4">
        {status === "loading" ? (
          <div className="rounded-lg border border-white/10 bg-slate-950 p-6 text-sm text-slate-300">Loading messages...</div>
        ) : null}

        {status === "ready" && messages.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-slate-950 p-6 text-sm text-slate-300">No messages yet.</div>
        ) : null}

        {messages.map((message) => (
          <article key={message.id} className="rounded-lg border border-white/10 bg-slate-950 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{message.name}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-teal-200">
                  <Mail className="h-4 w-4" />
                  Phone: {message.contact}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="rounded-md border border-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  {message.projectType}
                </p>
                <p className="mt-2 text-xs text-slate-500">{new Date(message.createdAt).toLocaleString()}</p>
                <button
                  type="button"
                  onClick={() => deleteMessage(message.id)}
                  disabled={deletingId === message.id}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {deletingId === message.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
            <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-300">{message.message}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
