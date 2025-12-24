import { Suspense } from "react";
import QuizResultClient from "./QuizResultClient";

export default function QuizResultPage() {
  return (
    <Suspense fallback={<div className="pt-14" />}>
      <QuizResultClient />
    </Suspense>
  );
}
