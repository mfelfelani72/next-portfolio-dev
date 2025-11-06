/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:38:10
 * @Description:
 */
"use client";
import React from "react";

interface Language { name:string; level:string; percent:number }
interface LanguagesSectionProps { languages: Language[] }

export default function LanguagesSection({ languages }: LanguagesSectionProps){
  return (
    <section id="languages" className="mt-8 bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-teal-700">Languages</h2>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
        {languages.map(l=>(
          <div key={l.name} className="p-3 bg-slate-50 rounded-md text-sm">
            <div className="font-semibold">{l.name}</div>
            <div className="text-xs text-gray-500">{l.level}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="h-2 rounded-full bg-indigo-400" style={{width:`${l.percent}%`}}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

