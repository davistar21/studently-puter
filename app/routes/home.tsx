import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import NavBar from "~/components/NavBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently" },
    { name: "description", content: "Your All-in-One AI Assistant" },
  ];
}
// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Studently" },
//     { name: "description", content: "Your All-in-One AI Assistant" },

//     // Open Graph (for Facebook, LinkedIn, etc.)
//     { property: "og:title", content: "Studently" },
//     { property: "og:description", content: "Your All-in-One AI Assistant" },
//     { property: "og:image", content: "https://yourdomain.com/og-image.jpg" },
//     { property: "og:url", content: "https://yourdomain.com" },
//     { property: "og:type", content: "website" },

//     // Twitter Card
//     { name: "twitter:card", content: "summary_large_image" },
//     { name: "twitter:title", content: "Studently" },
//     { name: "twitter:description", content: "Your All-in-One AI Assistant" },
//     { name: "twitter:image", content: "https://yourdomain.com/og-image.jpg" },
//   ];
// }

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { auth } = usePuterStore();
  // useEffect(() => {
  //   if (!auth.isAuthenticated) {
  //     navigate("/auth?next=/");
  //   }
  // }, [auth.isAuthenticated]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-no-repeat bg-center flex flex-col gap-16 h-[100vh] relative">
        <div className="absolute w-24 h-24 top-1/2 right-2/3 rounded-full bg-gradient-to-br from-[#abe8f5] to-[#deb1e370] animate-pulse"></div>
        <div className="absolute w-24 h-24 top-1/4 right-1/4 rounded-full bg-gradient-to-br from-[#abe8f5] to-[#deb1e370] animate-pulse"></div>
        <div className="absolute w-24 h-24 top-2/3 right-1/2 rounded-full bg-gradient-to-br from-[#abe8f5] to-[#deb1e370] animate-pulse"></div>
        <div className="z-20">
          <div className="hero top-hero !justify-start pb-24 min-h-screen">
            <span className="p-2 w-fit bg-gradient-to-br from-red-500 to-green-500 rounded-full">
              AI-Powered
            </span>
            <h1 className="">
              <span className="dark:!text-gradient">Your All-in-One </span>
              <span className="text-gradient-2 animate-pulse block">
                AI Study Companion
              </span>
            </h1>
            <h2 className=" lg:w-[60%]">
              Stay on top of courses, track GPA, and get smarter study
              recommendations — all in one app.{" "}
            </h2>
            <div className="flex gap-6 items-center justify-center mt-auto w-full">
              <button className="primary-button px-6 py-4 text-xl font-semibold w-fit">
                Watch Demo
              </button>
              <Link to="/dashboard">
                <button className="primary-button w-fit px-6 py-4 text-xl font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="hero min-h-screen min-lg:flex-row px-2 md:px-4 mt-4 gap-2">
            <div className="">
              <h2 className="!text-4xl font-bold md:!text-5xl mb-4">
                Too many apps, not enough focus
              </h2>
              <h2 className="!text-xl">
                From keeping track of grades, to juggling deadlines, to
                searching endless notes—it’s easy to feel like you’re always two
                steps behind.
              </h2>
            </div>
            <div className="w-[80%] overflow-hidden rounded-md">
              <img
                src="/images/student.svg"
                alt=""
                className="w-full object-contain"
              />
            </div>
          </div>
          <div className="hero flex-col-reverse  min-lg:flex-row">
            <div>
              <img src="/images/demo.svg" alt="" />
            </div>
            <div>
              <h2>All your academic tools. In a single AI-powered assistant</h2>
              <h3>
                Studently combines course tracking, GPA calculations,
                personalized study tips, and smart notifications into one simple
                dashboard — so you can spend less time managing and more time
                learning.
              </h3>
              <ul>
                <li>Struggling to track courses and grades across platforms</li>
                <li>Deadlines sneak up, assignments get missed</li>
                <li> Notes scattered across different apps and files</li>
                <li>The mental load of switching between too many tools</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h2>Why Studently?</h2>
            <h3>Your academic life. Simplified.</h3>
            <div className="features">
              <div className="feature gradient-border">
                <img alt="" />
                <h2>GPA Tracker</h2>
                <div>
                  Always know your academic standing with real-time GPA
                  calculations.
                </div>
              </div>
              <div className="feature">
                <img alt="" />
                <h2>GPA Tracker</h2>
                <div>
                  Always know your academic standing with real-time GPA
                  calculations.
                </div>
              </div>
              <div className="feature">
                <img alt="" />
                <h2>GPA Tracker</h2>
                <div>
                  Always know your academic standing with real-time GPA
                  calculations.
                </div>
              </div>
              <div className="feature">
                <img alt="" />
                <h2>GPA Tracker</h2>
                <div>
                  Always know your academic standing with real-time GPA
                  calculations.
                </div>
              </div>
              <div className="feature">
                <img alt="" />
                <h2>GPA Tracker</h2>
                <div>
                  Always know your academic standing with real-time GPA
                  calculations.
                </div>
              </div>
              <div className="feature">
                <img alt="" />
                <h2>GPA Tracker</h2>
                <div>
                  Always know your academic standing with real-time GPA
                  calculations.
                </div>
              </div>
            </div>
          </div>
          <section className="relative py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                From setup to success in just 3 steps
              </h2>
              <p className="text-lg text-gray-600 md:text-xl text-center mb-12">
                Studently fits right into your routine — no complexity, just
                results.
              </p>

              <div className="relative">
                {!isMobile ? (
                  <svg
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  >
                    <path d="M 20 60 C 300 100, 200 300, 500 200" />{" "}
                    {/* Curve */}
                    <path d="M 500 200 C 600 300, 300 400, 250 350" />{" "}
                    {/* Curve */}
                  </svg>
                ) : (
                  <svg
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  >
                    <line x1="50%" y1="0" x2="50%" y2="100%" />
                  </svg>
                )}
                <div className="grid md:grid-cols-2 gap-12 relative">
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="text-2xl font-bold mb-2">
                      1. Add Your Courses
                    </div>
                    <p className="text-gray-600">
                      Quickly enter subjects and past grades to get started.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center md:mt-20">
                    <div className="text-2xl font-bold mb-2">
                      2. Let AI Organize
                    </div>
                    <p className="text-gray-600">
                      Studently tracks GPA, schedules reminders, and summarizes
                      notes.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center md:col-span-2 md:mx-auto md:w-1/2">
                    <div className="text-2xl font-bold mb-2">
                      3. Study Smarter
                    </div>
                    <p className="text-gray-600">
                      Get personalized recommendations and instant Q&A support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )
        </div>
      </div>
      <footer>
        <section className="w-full"></section>
        <section className="w-full"></section>
      </footer>
    </>
  );
}
