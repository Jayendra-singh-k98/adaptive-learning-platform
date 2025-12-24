import { Suspense } from "react";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="pt-14" />}>
      <QuizClient />
    </Suspense>
  );
}