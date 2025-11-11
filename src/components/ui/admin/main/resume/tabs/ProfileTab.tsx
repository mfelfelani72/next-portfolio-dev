"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface ProfileTabProps { lang: string; }

export default function ProfileTab({ lang }: ProfileTabProps) {
  const { data, mutate } = useFetch("get", {
    endPoint: `/api/resume/${lang}/profile/`,
  });

  const [profile, setProfile] = useState({ name: "", title: "", summary: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setProfile(data); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/${lang}/profile/`, {
          method: "PUT",
          body: JSON.stringify(profile),
        });
        return profile;
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Full Name" className="w-full p-2 border rounded" />
      <input type="text" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea value={profile.summary} onChange={e => setProfile({ ...profile, summary: e.target.value })} placeholder="Summary" className="w-full p-2 border rounded" />
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save Profile"}</button>
    </div>
  );
}