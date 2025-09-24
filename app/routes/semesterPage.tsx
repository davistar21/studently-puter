// src/pages/SemesterPage.tsx
import { motion } from "framer-motion";
import GPAGauge from "../components/gpaGauge";
import { Link } from "react-router";

const SemesterPage = () => {
  // Dummy semester data
  const gpa = 3.42;
  const courses = [
    { code: "MTH101", name: "Calculus I", units: 3, grade: "A", gp: 4 },
    { code: "PHY101", name: "Physics I", units: 3, grade: "B", gp: 3 },
    { code: "CHM101", name: "Chemistry I", units: 2, grade: "A", gp: 4 },
    { code: "ENG101", name: "English I", units: 2, grade: "C", gp: 2 },
  ];

  const totalUnits = courses.reduce((sum, c) => sum + c.units, 0);
  const randomCompletion = Math.floor(Math.random() * 100);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Semester 1 Overview</h1>

      {/* Overview Stats */}
      <div className="flex overflow-x-auto py-4 px-2 scrollbar gap-6">
        <motion.div
          className="bg-white min-w-[200px] flex-shrink-0 rounded-2xl shadow-lg p-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GPAGauge gpa={gpa} />
          <p className="mt-2 font-semibold text-gray-600">GPA</p>
        </motion.div>

        <motion.div
          className="bg-white min-w-[200px] flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
          <p className="text-gray-600">Courses</p>
        </motion.div>

        <motion.div
          className="bg-white min-w-[200px] flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-3xl font-bold text-green-600">{totalUnits}</p>
          <p className="text-gray-600">Units</p>
        </motion.div>

        <motion.div
          className="bg-white min-w-[200px] flex-shrink-0 rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-3xl font-bold text-coral-500">
            {randomCompletion}%
          </p>
          <p className="text-gray-600">Completion</p>
        </motion.div>
      </div>

      {/* Courses Deck */}
      <div>
        <div className="flex mb-4 justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          <button className="bg-blue-500 font-semibold p-2 rounded-full">
            + Add Course
          </button>
        </div>
        <div className="flex gap-6 scrollbar overflow-x-auto pb-4">
          {courses.map((course, idx) => {
            const id = crypto.randomUUID();

            return (
              <Link to={`courses/${id}`}>
                <motion.div
                  key={idx}
                  className="min-w-[200px] bg-white shadow rounded-2xl p-4 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="font-bold text-gray-800">{course.code}</h3>
                  <p className="text-gray-600">{course.name}</p>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>Units: {course.units}</p>
                    <p>Grade: {course.grade}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* GPA Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">GPA Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Units</th>
                <th className="p-3 text-left">Grade</th>
                <th className="p-3 text-left">Grade Point</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-none text-gray-800"
                >
                  <td className="p-3">{c.code}</td>
                  <td className="p-3">{c.units}</td>
                  <td className="p-3">{c.grade}</td>
                  <td className="p-3">{c.gp}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold text-gray-600">
                <td className="p-3">Total</td>
                <td className="p-3">{totalUnits}</td>
                <td className="p-3">—</td>
                <td className="p-3">{gpa.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SemesterPage;
