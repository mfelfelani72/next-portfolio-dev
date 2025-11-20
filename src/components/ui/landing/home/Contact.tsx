"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Functions

import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Interfaces

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
  // States and Refs
  const [manualFetch, setManualFetch] = useState(true);
  const [contact, setContact] = useState<Contact>({
    email: "",
    linkedin: "",
    github: "",
    telegram: "",
  });
  const hasFetchedFromAPI = useRef(false);

  // Hooks

  const { t } = useTranslation();

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
        }

        setContact(res);
        setManualFetch(true);
        document.cookie = `resume_refresh_contact=; path=/; max-age=0`;
      },
    }
  );

  // Functions

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
          if (mounted) setContact(cachedContact.data.data);
        } else {
          setManualFetch(false);
          mutate();
        }

        const contactCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_contact=`))
          ?.split("=")[1];

        if (contactCookie === "1") {
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

  // Constants

  const contactItems = [
    {
      key: "email",
      href: `mailto:${contact.email}`,
      label: "email",
      username: contact.email,
      color: "from-blue-500 to-cyan-500",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      show: !!contact.email,
    },
    {
      key: "linkedin",
      href: contact.linkedin,
      label: "linkedin",
      username: contact.linkedin
        .replace("https://www.linkedin.com/in/", "")
        .replace("/", ""),
      color: "from-blue-600 to-blue-800",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      show: !!contact.linkedin,
    },
    {
      key: "github",
      href: contact.github,
      label: "github",
      username: contact.github
        .replace("https://github.com/", "")
        .replace("/", ""),
      color: "from-gray-700 to-gray-900",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      show: !!contact.github,
    },
    {
      key: "telegram",
      href: contact.telegram,
      label: "telegram",
      username: contact.telegram.replace("https://t.me/", "@"),
      color: "from-blue-400 to-blue-600",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
        </svg>
      ),
      show: !!contact.telegram,
    },
  ];

  const visibleItems = contactItems.filter((item) => item.show);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {t("get_in_touch")}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("contact_slogan")}
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visibleItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target={item.key !== "email" ? "_blank" : "_self"}
            rel={item.key !== "email" ? "noreferrer" : ""}
            className="group p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {/* Icon Container */}
              <div
                className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
              >
                <div className="text-white">{item.icon}</div>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {t(item.label)}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {item.username}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
