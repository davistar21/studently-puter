import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TopicDeck = ({ topics }: { topics: string[] }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {topics.map((topic, idx) => (
        <motion.div
          key={idx}
          className="min-w-[180px] bg-white text-gray-800 rounded-xl shadow p-4 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          {/* Topic name */}
          <p className="font-semibold mb-2">{topic}</p>

          {/* Dropdown for completion state */}
          <Select defaultValue="not-started">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not started</SelectItem>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="almost-completed">Almost Completed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      ))}
    </div>
  );
};

export default TopicDeck;
