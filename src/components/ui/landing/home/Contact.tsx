"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "@/libs/api/useFetch";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

interface Contact {
  email: string;
  linkedin: string;
  github: string;
  telegram: string;
}

interface ContactResponse {
  email: string;
  linkedin: string;
  github: string;
  telegram: string;
}

export default function Contact() {
  const [manualFetch, setManualFetch] = useState(true);
  const [contact, setContact] = useState<Contact>({ 
    email: "", 
    linkedin: "", 
    github: "" ,
    telegram: "" 
  });
  const hasFetchedFromAPI = useRef(false);

  const { mutate } = useFetch<ContactResponse>(
    "get",
    { endPoint: `/api/resume/contact` },
    {
      manual: manualFetch,
      onSuccess: async (res) => {
        if (!res) return;

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "contact", res, "global");
          hasFetchedFromAPI.current = true;
          console.log("Contact saved to IndexedDB (global)");
        }

        setContact(res);
        setManualFetch(true);
        document.cookie = `resume_refresh_contact=; path=/; max-age=0`;
      },
    }
  );

  useEffect(() => {
    let mounted = true;

    const loadContact = async () => {
      try {
        await indexDB.connect();
        const contactKey = `resume:contact:global`;
        const cachedContact = await indexDB.read<{ data: ContactResponse }>(
          "resume",
          contactKey
        );

        if (cachedContact.success && cachedContact.data?.data) {
          console.log("Using cached global Contact");
          if (mounted) setContact(cachedContact.data.data);
        } else {
          console.log("No cached Contact → fetching from API...");
          setManualFetch(false);
          mutate();
        }

        const contactCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_contact=`))
          ?.split("=")[1];

        if (contactCookie === "1") {
          console.log("Contact cookie changed → refetching...");
          setManualFetch(false);
          mutate();
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        setManualFetch(false);
        mutate();
      }
    };

    loadContact();
    return () => {
      mounted = false;
    };
  }, [mutate, manualFetch]);

  if (!contact.email && !contact.linkedin && !contact.github) {
    return null;
  }

  return (
    <section
      id="contact"
      className="mt-8 bg-white rounded-xl p-4 shadow-sm text-center"
    >
      <h2 className="text-sm font-semibold text-indigo-700">Contact</h2>
      <p className="text-xs text-gray-700 mt-2">
        Open to new opportunities — hire or contract.
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs hover:bg-indigo-700 transition-colors"
          >
            Email
          </a>
        )}
        {contact.linkedin && (
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-md bg-rose-100 text-rose-700 text-xs hover:bg-rose-200 transition-colors"
          >
            LinkedIn
          </a>
        )}
        {contact.github && (
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs hover:bg-sky-200 transition-colors"
          >
            GitHub
          </a>
        )}
        {contact.github && (
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-md bg-indigo-100 text-sky-700 text-xs hover:bg-sky-200 transition-colors"
          >
            Telegram
          </a>
        )}
      </div>
    </section>
  );
}