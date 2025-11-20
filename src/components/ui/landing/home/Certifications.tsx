"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Functions

import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

// Interfaces

interface Certification {
  id: number;
  title: string;
  year: string;
}

interface CertificationsResponse {
  certifications: Certification[];
}

// Hooks

import { useFetch } from "@/libs/api/useFetch";

export default function Certifications() {
  // States and Refs

  const [manualFetch, setManualFetch] = useState(true);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const hasFetchedFromAPI = useRef(false);

  // Hooks

  const { t } = useTranslation();

  const { mutate } = useFetch<CertificationsResponse>(
    "get",
    { endPoint: `/api/resume/certifications` },
    {
      manual: manualFetch,
      onSuccess: async (res) => {
        if (!res) return;

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "certifications", res, "global");
          hasFetchedFromAPI.current = true;
        }

        setCertifications(res.certifications || []);
        setManualFetch(true);
        document.cookie = `resume_refresh_certifications=; path=/; max-age=0`;
      },
    }
  );

  // Functions

  useEffect(() => {
    let mounted = true;

    const loadCertifications = async () => {
      try {
        await indexDB.connect();
        const certificationsKey = `resume:certifications:global`;
        const cachedCertifications = await indexDB.read<{
          data: CertificationsResponse;
        }>("resume", certificationsKey);

        if (cachedCertifications.success && cachedCertifications.data?.data) {
          console.log("Using cached global Certifications");
          if (mounted)
            setCertifications(
              cachedCertifications.data.data.certifications || []
            );
        } else {
          setManualFetch(false);
          mutate();
        }

        const certificationsCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_certifications=`))
          ?.split("=")[1];

        if (certificationsCookie === "1") {
          console.log("Certifications cookie changed → refetching...");
          setManualFetch(false);
          mutate();
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        setManualFetch(false);
        mutate();
      }
    };

    loadCertifications();
    return () => {
      mounted = false;
    };
  }, [mutate, manualFetch]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("certifications")}
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
          {certifications.length} {t("count_certifications")}
        </div>
      </div>

      {certifications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id || index}
              className="group p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Certificate Title */}
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Year with Calendar Icon */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{cert.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
