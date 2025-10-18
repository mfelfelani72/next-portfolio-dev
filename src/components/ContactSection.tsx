/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:38:19
 * @Description:
 */

"use client";
import React from "react";

interface Contact {
  email: string;
  linkedin: string;
  github: string;
}
interface ContactSectionProps {
  contact: Contact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
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
        <a
          href={`mailto:${contact.email}`}
          className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs"
        >
          Email
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 rounded-md bg-rose-100 text-rose-700 text-xs"
        >
          LinkedIn
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
