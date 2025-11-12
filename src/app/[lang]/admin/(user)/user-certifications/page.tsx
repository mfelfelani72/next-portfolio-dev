"use client";
import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Certification {
  title: string;
  year: string;
}

interface CertificationsData {
  certifications: Certification[];
}

export default function Certifications() {
  const { data, mutate } = useFetch("get", {
    endPoint: `/api/resume/certifications/`,
  });
  const [CertificationsData, setCertificationsData] =
    useState<CertificationsData>({ certifications: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setCertificationsData(data);
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/certifications/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(CertificationsData),
        });
        return CertificationsData;
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  // 🎓 Certifications
  const addCertification = () =>
    setCertificationsData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { title: "", year: "" }],
    }));
  const removeCertification = (index: number) =>
    setCertificationsData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  const updateCertification = (
    index: number,
    field: "title" | "year",
    value: string
  ) =>
    setCertificationsData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));

  return (
    <div className="space-y-6 max-w-2xl">
     
      <div>
        <h3 className="font-semibold text-lg">🎓 Certifications</h3>
        <button
          onClick={addCertification}
          className="px-3 py-1 bg-green-600 text-white rounded mt-2"
        >
          Add Certification
        </button>
        {CertificationsData.certifications.map((cert, index) => (
          <div key={index} className="flex gap-2 items-center mt-2">
            <input
              type="text"
              placeholder="Title"
              value={cert.title}
              onChange={(e) =>
                updateCertification(index, "title", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Year"
              value={cert.year}
              onChange={(e) =>
                updateCertification(index, "year", e.target.value)
              }
              className="w-24 p-2 border rounded"
            />
            <button
              onClick={() => removeCertification(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {saving ? "Saving..." : "Save certifications"}
      </button>
    </div>
  );
}
