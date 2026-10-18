import { Suspense } from "react";
import { deleteMessage, setHandled } from "@/app/admin/cms-actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Loading, Notice, PageHead, btn, panel } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/security/admin";

export default function MessagesPage(props: PageProps<"/admin/messages">) {
  return (
    <Suspense fallback={<Loading />}>
      <Messages {...props} />
    </Suspense>
  );
}

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Budapest" }).format(new Date(iso));

async function Messages({ searchParams }: PageProps<"/admin/messages">) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data: messages } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200);

  return (
    <div className={panel}>
      <PageHead title="Messages" />
      {sp.deleted && <Notice tone="ok">Message deleted.</Notice>}
      {!messages?.length ? (
        <p className="px-6 py-10 text-lg text-ink-dim">No messages yet.</p>
      ) : (
        <ol>
          {messages.map((msg) => (
            <li key={msg.id} className={`border-b border-sheet-line px-6 py-5 ${msg.handled ? "opacity-70" : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-lg font-semibold">
                  {msg.name} <a href={`mailto:${msg.email}`} className="font-normal underline underline-offset-4">{msg.email}</a>
                </p>
                <p className="font-mono text-sm text-ink-dim">{when(msg.created_at)}</p>
              </div>
              {msg.subject && <p className="mt-1 font-semibold">{msg.subject}</p>}
              <p className="mt-2 max-w-[75ch] whitespace-pre-line">{msg.message}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <form action={setHandled.bind(null, msg.id, !msg.handled)}>
                  <button type="submit" className={btn}>
                    {msg.handled ? "Mark as unread" : "Mark as handled"}
                  </button>
                </form>
                <ConfirmButton action={deleteMessage.bind(null, msg.id)} label="Delete" confirmLabel="Delete message" className={btn} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
