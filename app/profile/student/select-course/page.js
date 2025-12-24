import { Suspense } from "react";
import SelectCourseClient from "./SelectCourseClient";

export default function SelectCoursePage() {
  return (
    <Suspense fallback={<div className="pt-14" />}>
      <SelectCourseClient />
    </Suspense>
  );
}
