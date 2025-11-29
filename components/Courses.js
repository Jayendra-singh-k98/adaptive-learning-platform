"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


const gradients = [
  "from-blue-500 to-cyan-400", "from-purple-500 to-pink-400", "from-orange-500 to-yellow-400", "from-green-500 to-emerald-400", "from-red-500 to-rose-400", "from-indigo-500 to-purple-400", "from-teal-500 to-green-400","from-pink-500 to-rose-400", "from-violet-500 to-fuchsia-400", "from-amber-500 to-orange-400", "from-sky-500 to-blue-400", "from-lime-500 to-green-400", "from-fuchsia-500 to-pink-400", "from-cyan-500 to-teal-400", "from-rose-500 to-red-400", "from-emerald-500 to-green-400", "from-blue-600 to-indigo-400", "from-yellow-500 to-amber-400", "from-purple-600 to-indigo-400", "from-green-600 to-teal-400" ];

// Function to get random gradient
const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Or assign them to your categories
// const categories = [
//   {
//     id: "python-basics",
//     slug: "python-basics",
//     title: "Python Basics",
//     description: "Start programming with Python — fundamentals, syntax, and small projects.",
//     gradient: getRandomGradient(),
//     students: "2.5K"
//   },
//   {
//     id: "data-structures",
//     slug: "data-structures",
//     title: "Data Structures",
//     description: "Learn arrays, linked lists, stacks, queues, trees and more.",
//     gradient: getRandomGradient(),
//     students: "1.8K"
//   },
//   {
//     id: "web-development",
//     slug: "web-development",
//     title: "Web Development",
//     description: "HTML, CSS, JS and modern frameworks to build web apps.",
//     gradient: getRandomGradient(),
//     students: "3.2K"
//   },
//   {
//     id: "aptitude-prep",
//     slug: "aptitude-prep",
//     title: "Aptitude Prep",
//     description: "Logical reasoning, quantitative aptitude and interview practice.",
//     gradient: getRandomGradient(),
//     students: "1.5K"
//   },
// ];

const CoursesPage = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        if (data.success) {
          // Add gradient dynamically to each course
          const updated = data.courses.map((cr) => ({
            ...cr,
            gradient: getRandomGradient(),
          }));
          setCourses(updated);
        }
      } catch (err) {
        console.log("Error loading courses:", err);
      }
    };

    loadCourses();
  }, []);


  return (
    <div className="w-full py-10 bg-linear-to-b from-gray-50 to-white ">
      <div className="max-w-6xl mx-auto px-2">
        {/* Header */}
        <header className="mb-10 text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-2">
            📚 Explore & Learn
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Courses</h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">Choose a course to explore curated learning paths and courses.</p>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

function CategoryCard({ category }) {
  return (
    <Link
      href={`/courses/${category.slug}`}
      className="block group"
      aria-label={`Open ${category.title} courses`}
    >
      <div className="relative h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-300">
        {/* Gradient Header */}
        <div className={`h-18 bg-linear-to-br ${category.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="p-6 pt-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
            {category.title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {category.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
            {/* <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {category.courses} courses
            </span> */}
            <span className="text-gray-300">•</span>
            <span>{category.totalTopics} Topics</span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-600 group-hover:underline underline-offset-4 transition-all">
              Start Learning
            </span>
            <div className="w-7 h-7 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 group-hover:from-blue-600 group-hover:to-blue-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
              <svg className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute -inset-0.5 bg-linear-to-br ${category.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 -z-10 transition-all duration-500`}></div>
      </div>
    </Link>
  );
}


export default CoursesPage;