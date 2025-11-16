"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "@/libs/api/useFetch";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

interface Certification { 
  id: number; 
  title: string; 
  year: string; 
}

interface CertificationsResponse {
  certifications: Certification[];
}

export default function Certifications() {
  const [manualFetch, setManualFetch] = useState(true);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const hasFetchedFromAPI = useRef(false);

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
          console.log("Certifications saved to IndexedDB (global)");
        }

        setCertifications(res.certifications || []);
        setManualFetch(true);
        document.cookie = `resume_refresh_certifications=; path=/; max-age=0`;
      },
    }
  );

  useEffect(() => {
    let mounted = true;

    const loadCertifications = async () => {
      try {
        await indexDB.connect();
        const certificationsKey = `resume:certifications:global`;
        const cachedCertifications = await indexDB.read<{ data: CertificationsResponse }>(
          "resume",
          certificationsKey
        );

        if (cachedCertifications.success && cachedCertifications.data?.data) {
          console.log("Using cached global Certifications");
          if (mounted) setCertifications(cachedCertifications.data.data.certifications || []);
        } else {
          console.log("No cached Certifications → fetching from API...");
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
      <section id="certs" className="mt-8 bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-indigo-700">Certifications</h2>
        <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
          {certifications.map((c,index) => (
            <li key={index}>
              {c.title} — {c.year}
            </li>
          ))}
        </ul>
      </section>
    )
  );
}