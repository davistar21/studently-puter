import { motion } from "framer-motion";
import { Progress } from "~/components/ui/progress"; // shadcn progress bar
import { Button } from "~/components/ui/button";

export default function StudyDashboard() {
  // Mock data
  const activeCourses = [
    { id: 1, name: "Calculus II", progress: 62 },
    { id: 2, name: "Physics II", progress: 48 },
    { id: 3, name: "Chemistry I", progress: 30 },
    { id: 4, name: "Linear Algebra", progress: 75 },
    { id: 5, name: "Thermodynamics", progress: 10 },
  ];

  const suggestions = [
    "Study Calculus for 30 min",
    "Revise Physics flashcards",
    "Review today's Chemistry notes",
  ];

  const didYouKnow =
    "Did you know? Newton invented calculus while in quarantine.";

  const recommendations = [
    "Hey Eyitayo, you’re still behind on Thermodynamics. Exam is in 2 weeks!",
    "Next time you’re reading Chemistry, remember the periodic table song 🎶",
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Section 1: Continue Studying */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Continue Studying</h2>
        <div className="flex gap-4 scrollbar overflow-x-auto pb-4">
          {activeCourses.slice(0, 3).map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[200px] bg-white rounded-xl shadow p-4"
            >
              <h3 className="font-bold text-gray-800">{course.name}</h3>
              <Progress value={course.progress} className="my-3" />
              <Button size="sm" className="w-full">
                Continue
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Study Suggestions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Study Suggestions</h2>
        <div className="flex scrollbar  gap-4 overflow-x-auto pb-4">
          {suggestions.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="min-w-[180px] bg-indigo-100 text-indigo-800 rounded-xl shadow p-4 text-center"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Did You Know */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Did You Know?</h2>
        <div className="bg-yellow-100 text-yellow-800 rounded-xl shadow p-6 text-center">
          {didYouKnow}
        </div>
      </section>

      {/* Section 4: Recommendations */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-pink-100 text-pink-800 rounded-xl shadow p-4"
            >
              {rec}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5: Active Courses */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Active Courses</h2>
        <div className="space-y-4">
          {activeCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{course.name}</span>
                <span className="text-sm text-gray-500">
                  {course.progress}%
                </span>
              </div>
              <Progress value={course.progress} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
