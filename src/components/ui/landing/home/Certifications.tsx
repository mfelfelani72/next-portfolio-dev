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

  const {t} = useTranslation();

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
    certifications.length > 0 && (
      <div className="mt-8">
        {/* Header - Same as Skills */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("certifications")}
            </h2>
          </div>
        </div>

        {/* Cards Grid - Same structure as Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id || index} 
              className="group p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                {/* Icon Container - Same as Skills */}
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title - Same style as Skills */}
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed mb-3">
                    {cert.title}
                  </h3>
                  
                  {/* Info Row - Similar to Skills progress info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{cert.year}</span>
                    </div>
                    
                    {/* Verified Badge - Similar to Skills percentage */}
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow - Same as Skills */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}