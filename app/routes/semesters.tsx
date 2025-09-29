import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import GPAGauge from "~/components/gpaGauge";
import Loader from "~/components/Loader";
import { type ToastType } from "~/components/toast";
import { useToast } from "~/components/ToastProvider";
import { Button } from "~/components/ui/button";
import { usePuterStore } from "~/lib/puter";
import { useAppStore } from "~/lib/store";

export default function Semesters() {
  const { semesters, isLoading, loadSemestersFromKV, addSemesterToKV } =
    useAppStore();
  const { kv, auth } = usePuterStore();
  const [statusText, setStatusText] = useState("");
  const [status, setStatus] = useState<ToastType | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/semesters");
    }
  }, [auth.isAuthenticated]);
  useEffect(() => {
    if (kv) {
      loadSemestersFromKV(kv);
    }
  }, [kv]);

  return (
    <div className="p-6 min-h-screen bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center flex flex-col gap-16  relative">
      {isLoading && <Loader />}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">
          Your Semesters
        </h1>
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            addSemesterToKV(kv);
          }}
          className="primary-gradient text-white font-semibold rounded-full py-4 px-6 w-fit "
        >
          + Add Semester
        </motion.button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {semesters.map((sem, idx) => (
          <Link to={`/semesters/${sem.id}`} key={idx}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-glass shadow-md rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-center  mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {sem.name}
                </h2>
                <div className="ml-auto">
                  <GPAGauge gpa={0} />
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📚 Courses: {sem.courses.length}</p>
                <p>🔢 Units: {sem.units}</p>
              </div>

              <Button className="mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                View Courses
              </Button>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
