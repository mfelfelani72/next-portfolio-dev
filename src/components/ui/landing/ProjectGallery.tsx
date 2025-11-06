/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:22
 * @Description:
 */

"use client";
import React, { useState, useEffect } from "react";

export default function ProjectGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=>setIndex(i=> (i+1)%images.length),3500);
    return ()=>clearInterval(t);
  },[images.length]);
  
  return (
    <div className="relative w-full rounded-md overflow-hidden">
      <img src={images[index]} alt={`project-${index}`} className="w-full h-44 object-cover transition-transform duration-700"/>
      <div className="absolute right-2 bottom-2 flex gap-2">
        {images.map((_,i)=>(
          <button key={i} onClick={()=>setIndex(i)} className={`w-2 h-2 rounded-full ${i===index?"bg-white":"bg-white/40"}`} aria-label={`Go to image ${i+1}`}/>
        ))}
      </div>
    </div>
  )
}

