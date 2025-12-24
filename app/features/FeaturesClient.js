"use client";

import { useSearchParams } from "next/navigation";
import Features from "../../components/Features";

export default function FeaturesClient() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  return (
    <div className="pt-14">
      <Features courseId={courseId} />
    </div>
  );
}
