"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Contact { email: string; linkedin: string; github: string; }
interface ContactTabProps { lang: string; }

export default function ContactTab({ lang }: ContactTabProps) {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/contact/${lang}` });
  const [contact, setContact] = useState<Contact>({ email: "", linkedin: "", github: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setContact(data); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/contact/${lang}`, { method: "PUT", body: JSON.stringify(contact) });
        return contact;
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="Email" className="w-full p-2 border rounded"/>
      <input type="url" value={contact.linkedin} onChange={e => setContact({ ...contact, linkedin: e.target.value })} placeholder="LinkedIn" className="w-full p-2 border rounded"/>
      <input type="url" value={contact.github} onChange={e => setContact({ ...contact, github: e.target.value })} placeholder="GitHub" className="w-full p-2 border rounded"/>
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save Contact"}</button>
    </div>
  );
}
