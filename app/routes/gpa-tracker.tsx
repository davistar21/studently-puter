// src/pages/GpaTracker.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const gpaData = [
  { semester: "Sem 1", gpa: 3.2 },
  { semester: "Sem 2", gpa: 3.5 },
  { semester: "Sem 3", gpa: 3.7 },
  { semester: "Sem 4", gpa: 3.8 },
];

const courseData = [
  { course: "Math", grade: 85 },
  { course: "Physics", grade: 78 },
  { course: "CS", grade: 92 },
  { course: "History", grade: 74 },
];

export default function GpaTracker() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-600 mb-6">GPA Tracker</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Current GPA" value="3.72" highlight="blue" />
        <StatCard title="Target GPA" value="3.90" highlight="green" />
        <StatCard title="Courses Taken" value="24" highlight="coral" />
        <StatCard title="Units Total" value="24" highlight="teal" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GPA Progress Over Semesters */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">GPA Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={gpaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="gpa"
                stroke="#2563eb"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Grades */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Course Grades</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="grade" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight: "blue" | "green" | "coral" | "teal";
}) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    coral: "text-yellow-600 bg-pink-50",
    teal: "text-green-400 bg-pink-50",
  };

  return (
    <div className={`p-6 rounded-2xl shadow bg-white`}>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className={`text-3xl font-bold ${colors[highlight].split(" ")[0]}`}>
        {value}
      </p>
    </div>
  );
}
