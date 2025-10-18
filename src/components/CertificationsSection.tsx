/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:38:02
 * @Description:
 */

"use client";
import React from "react";

interface Certification { id:number; title:string; year:string }
interface CertificationsSectionProps { certifications: Certification[] }

export default function CertificationsSection({ certifications }: CertificationsSectionProps){
  return (
    <section id="certs" className="mt-8 bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-indigo-700">Certifications</h2>
      <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
        {certifications.map(c=><li key={c.id}>{c.title} — {c.year}</li>)}
      </ul>
    </section>
  )
}

