import { Suspense } from "react";
import FeaturesClient from "./FeaturesClient";

export default function FeaturesPage() {
  return (
    <Suspense fallback={<div className="pt-14" />}>
      <FeaturesClient />
    </Suspense>
  );
}
