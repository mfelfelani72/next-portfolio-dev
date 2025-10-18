"use client";

import type { ScriptHTMLAttributes } from "react";

// Interfaces

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const scriptProps: ScriptHTMLAttributes<HTMLScriptElement> = {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema, null, 2),
    },
  };

  return <script {...scriptProps} />;
}
