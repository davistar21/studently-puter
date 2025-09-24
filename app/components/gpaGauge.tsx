import { motion } from "framer-motion";

const GPAGauge = ({ gpa }: { gpa: number }) => {
  const radius = 40; // circle radius
  const stroke = 8; // stroke width
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const maxGPA = 5.0;
  const percentage = (gpa / maxGPA) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={100} height={100} className="mx-auto">
      {/* Background circle */}
      <circle
        stroke="#E5E7EB"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={50}
        cy={50}
      />
      {/* Animated Progress Circle */}
      <motion.circle
        stroke="#3B82F6"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={50}
        cy={50}
        strokeDasharray={circumference}
        strokeDashoffset={circumference} // start hidden
        transform="rotate(-90 50 50)"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* GPA Text */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="16"
        fontWeight="bold"
        fill="#111827"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {gpa.toFixed(2)}
      </motion.text>
    </svg>
  );
};

export default GPAGauge;
