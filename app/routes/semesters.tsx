// src/pages/Semesters.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import { PieChart, Pie, Cell } from "recharts";
import GPAGauge from "~/components/gpaGauge";

const semesters = [
  {
    id: 1,
    name: "Semester 1",
    gpa: 3.6,
    courses: 6,
    units: 18,
  },
  {
    id: 2,
    name: "Semester 2",
    gpa: 2.9,
    courses: 5,
    units: 15,
  },
  {
    id: 3,
    name: "Semester 3",
    gpa: 3.9,
    courses: 7,
    units: 21,
  },
  {
    id: 4,
    name: "Semester 4",
    gpa: 4.3,
    courses: 7,
    units: 21,
  },
  {
    id: 5,
    name: "Semester 5",
    gpa: 2.5,
    courses: 7,
    units: 21,
  },
];

// GPA Gauge helper
const IGPAGauge = ({ gpa }: { gpa: number }) => {
  const data = [
    { name: "GPA", value: gpa },
    { name: "Remaining", value: 4 - gpa },
  ];

  const COLORS = ["#3B82F6", "#E5E7EB"]; // primary blue + light gray

  return (
    <PieChart width={120} height={80}>
      <Pie
        data={data}
        cx="50%"
        cy="100%"
        startAngle={180}
        endAngle={0}
        innerRadius={40}
        outerRadius={60}
        dataKey="value"
        cornerRadius={10}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={18}
        fontWeight="bold"
        fill="#111827"
      >
        {gpa.toFixed(2)}
      </text>
    </PieChart>
  );
};

export default function Semesters() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Your Semesters</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {semesters.map((sem, idx) => (
          <Link to={`/semesters/${sem.id}`}>
            <motion.div
              key={sem.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-center  mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {sem.name}
                </h2>
                <div className="ml-auto">
                  <GPAGauge gpa={sem.gpa} />
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📚 Courses: {sem.courses}</p>
                <p>🔢 Units: {sem.units}</p>
              </div>

              <Link
                to={`/semesters/${sem.id}`}
                className="mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
              >
                View Courses
              </Link>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
