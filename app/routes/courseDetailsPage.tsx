// src/pages/CourseDetailPage.tsx
import { motion } from "framer-motion";
import TopicDeck from "~/components/TopicDeck";

const CourseDetailPage = () => {
  // Dummy data
  const course = {
    code: "MTH101",
    name: "Calculus I",
    units: 3,
    grade: "A",
    progress: Math.floor(Math.random() * 100),
    topics: ["Limits", "Derivatives", "Integrals"],
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="bg-white shadow rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {course.code} - {course.name}
        </h1>
        <p className="text-gray-600 mt-1">
          Units: {course.units} | Grade: {course.grade}
        </p>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Progress: {course.progress}%
          </p>
        </div>
      </motion.div>

      {/* Tabs / Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Study Assistant */}
        <motion.div
          className="bg-white shadow rounded-2xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold mb-3">Study Assistant</h2>
          <p className="text-gray-600 text-sm">
            AI-powered study helper coming soon.
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="bg-white shadow rounded-2xl p-6"
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
          className="bg-white shadow rounded-2xl p-6"
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

      {/* Topics */}
      {/* <div>
        <h2 className="text-xl font-semibold mb-3">Topics</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {course.topics.map((topic, idx) => (
            <motion.div
              key={idx}
              className="min-w-[150px] bg-white text-gray-800 rounded-xl shadow p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              {topic}
            </motion.div>
          ))}
        </div>
      </div> */}
      <TopicDeck topics={course.topics} />
      {/* Actions */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Topic
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Analyze with AI
        </button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
