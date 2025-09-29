// src/pages/CourseDetailPage.tsx
import { motion } from "framer-motion";
import AppDialog from "~/components/AppDialog";
import { Button } from "~/components/ui/button";
import TopicDeck from "~/components/TopicDeck";
import { useParams } from "react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAppStore } from "~/lib/store";
import type { Topic, Course } from "types/store";
import type { Semester } from "types";
import { usePuterStore } from "~/lib/puter";
import type { ToastType } from "~/components/toast";
import { useToast } from "~/components/ToastProvider";
import Loader from "~/components/Loader";

const CourseDetailsPage = () => {
  const { semesterId, courseId } = useParams();
  // const [course, setCourse] = useState<Course | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const { kv } = usePuterStore();
  const [error, setError] = useState("");
  const [statusText, setStatusText] = useState("");
  const [status, setStatus] = useState<ToastType | null>(null);
  const { showToast } = useToast();
  // const [progress, setProgress] = useState<number>(0);
  // const [topics, setTopics] = useState<Topic[]>([]);
  const {
    semesters,
    isLoading,
    updateSemester,
    setSemesters,
    getSemesterById,
    loadSemestersFromKV,
    setSelectedSemesterId,
    setSemesters: updateSemesters,
  } = useAppStore();
  useEffect(() => {
    if (!semesterId) return;
    setSelectedSemesterId(semesterId);
    loadSemestersFromKV(kv);
  }, [semesterId]);
  const course = useMemo(() => {
    const sem = semesterId ? getSemesterById(semesterId) : null;
    return sem?.courses.find((c) => c.id === courseId) ?? null;
  }, [semesterId, courseId, semesters]);
  const topics = useMemo(() => course?.topics ?? [], [course]);
  async function handleAddTopic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget.closest("form");
      if (!form || !semesterId || !course) return;

      const formData = new FormData(form);
      const title = formData.get("course-topic") as string;
      if (!title) return;

      const newTopic = {
        id: crypto.randomUUID().split("-")[0],
        title,
        status: "not_started",
        progress: 0,
      };

      const sem = getSemesterById(semesterId);
      if (!sem) throw new Error("Semester not found");

      const updatedCourse = {
        ...course,
        topics: [...(course.topics ?? []), newTopic],
      };

      const updatedSemester = {
        ...sem,
        courses: sem.courses.map((c) =>
          c.id === course.id ? updatedCourse : c
        ),
      };

      // ✅ Call the store's updateSemester function
      await updateSemester(kv, semesterId, updatedSemester);

      showToast("Topic added successfully", "success");
    } catch (err: any) {
      console.error("Failed to add topic", err);
      showToast("Failed to add topic", "error");
    }
  }

  // useEffect(() => {
  //   async function loadCourse() {
  //     try {
  //       setIsLoading(true);
  //       const key = `semester:${semesterId}`;
  //       if (!courseId || !semesterId) return;
  //       const currentSemesterString = await kv.get(key);
  //       if (!currentSemesterString) return;
  //       const currentSemester = JSON.parse(currentSemesterString) as Semester;
  //       const currentCourse = currentSemester.courses.find(
  //         (course) => course.id === courseId
  //       );
  //       if (!currentCourse) return;
  //       setCourse(currentCourse);
  //       setStatusText("Loaded courses successfully");
  //       if (!currentCourse.topics) return;
  //       setTopics(currentCourse.topics);
  //     } catch (err: any) {
  //       setIsLoading(false);
  //       setError("Failed to get course");
  //       setStatusText("Failed to get course");
  //       setStatus("error");
  //     } finally {
  //       setIsLoading(false);
  //       if (!status) return;
  //       showToast(statusText, status);
  //     }
  //   }
  //   loadCourse();
  // }, []);

  useEffect(() => {
    console.log("course has been updated");
  }, [course, topics]);

  // async function handleAddTopic(e: FormEvent<HTMLFormElement>) {
  //   try {
  //     setIsLoading(true);
  //     e.preventDefault();

  //     const key = `semester:${semesterId}`;
  //     const form = e.currentTarget.closest("form");
  //     if (!form) return;

  //     const formData = new FormData(form);
  //     const title = formData.get("course-topic") as string;
  //     if (!title) return;

  //     const newTopic: Topic = {
  //       id: crypto.randomUUID().split("-")[0],
  //       title,
  //       status: "not_started",
  //       progress: 0,
  //     };

  //     const existingValueString = await kv.get(key);
  //     if (!existingValueString) throw new Error("Semester not found");

  //     const existingValue = JSON.parse(existingValueString) as Semester;

  //     if (!course) return;

  //     const updatedCourse: Course = {
  //       ...course,
  //       topics: [...(course.topics ?? []), newTopic], // default to [] if undefined
  //     };

  //     const updatedCourses = existingValue.courses.map((c) =>
  //       c.id === course.id ? updatedCourse : c
  //     );

  //     const updatedValue: Semester = {
  //       ...existingValue,
  //       courses: updatedCourses,
  //     };

  //     // Persist the updated semester with the new course topic
  //     await kv.set(key, JSON.stringify(updatedValue));

  //     // Update local state
  //     setTopics((prev) => [...prev, newTopic]);
  //   } catch (err: any) {
  //     setStatus("error");
  //     setStatusText("Failed to add topic");
  //     console.error("Failed to add topic:", err.message);
  //   } finally {
  //     setIsLoading(false);
  //     if (!status) return;
  //     showToast(statusText, status);
  //   }
  // }
  // if (isLoading)
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="loader"></div>
  //     </div>
  //   );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="">Error:{error}</div>
      </div>
    );
  return (
    <div>
      {isLoading && <Loader />}
      {course && (
        <div className="p-6 space-y-8">
          {/* Header */}
          <motion.div
            className="bg-white shadow rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="uppercase">{course.code}</span> -{" "}
              <span className="capitalize">{course.name}</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Units: {course.units} | Grade: {course.grade}
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  key={course.progress} // Re-triggers animation on progress change
                  className="bg-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Progress: {course.progress ?? 0}%
              </p>
            </div>
          </motion.div>
          <div className="topics">
            <div className="flex mb-4 justify-between items-center">
              {topics.length > 0 && (
                <h2 className="text-xl font-semibold text-gray-800">Topics</h2>
              )}
              <AppDialog
                triggerLabel="Add Topic"
                title="Add a new topic"
                description="Fill in the topic below."
              >
                <form className="space-y-2" onSubmit={handleAddTopic}>
                  <label htmlFor="course-topic" className="w-full">
                    <input
                      type="text"
                      name="course-topic"
                      id="course-topic"
                      placeholder="Add Topic"
                      className="border rounded-md capitalize"
                    />
                  </label>

                  <Button
                    type="submit"
                    className="primary-button text-white w-fit ml-auto"
                  >
                    Save
                  </Button>
                </form>
              </AppDialog>
            </div>
            <TopicDeck topics={topics} />
          </div>
          {/* Tabs / Sections */}
          <div className="flex scrollbar p-2 overflow-x-auto gap-6">
            {/* Study Assistant */}
            <motion.div
              className="bg-white shadow rounded-2xl min-w-[300px] p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-lg font-semibold mb-3">Study Assistant</h2>
              <p className="text-gray-600 text-sm">
                AI-powered study helper coming soon.
              </p>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              className="bg-white shadow rounded-2xl min-w-[300px] p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-lg font-semibold mb-3">
                Personalized Recommendations
              </h2>
              <p className="text-gray-600 text-sm">
                Smart insights tailored to your study habits.
              </p>
            </motion.div>

            {/* Q&A */}
            <motion.div
              className="bg-white shadow rounded-2xl min-w-[300px] p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-lg font-semibold mb-3">Q&A Section</h2>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>❓ What’s the difference between limit and derivative?</li>
                <li>❓ How to approach integration by parts?</li>
              </ul>
              <button className="mt-3 text-sm text-blue-600 hover:underline">
                Add a Question
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
