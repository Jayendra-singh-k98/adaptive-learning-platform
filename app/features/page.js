import React from "react"
import Features from "../../components/Features"
import { useSearchParams } from "next/navigation";

export default function FeaturesPage() {
    const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  console.log("courseId from URL:", courseId);
    return (   
        <div className="pt-14">
            <Features courseId={courseId} />
        </div>
    )
}
