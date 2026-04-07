"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// IMPORTANT: dynamic import (Next.js fix)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={onChange} height={500} />
    </div>
  );
}