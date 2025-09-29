import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Topic } from "types";
import { useState } from "react";

const STATUS_PROGRESS_MAP: Record<Topic["status"], number> = {
  not_started: 0,
  in_progress: 50,
  not_completed: 75,
  completed: 100,
};

const TopicDeck = ({ topics }: { topics: Topic[] }) => {
  // Local state to track status changes per topic
  const [topicStatuses, setTopicStatuses] = useState<
    Record<string, Topic["status"]>
  >(() => Object.fromEntries(topics.map((t) => [t.id, t.status])));

  // Handler when status changes
  const handleStatusChange = (id: string, newStatus: Topic["status"]) => {
    setTopicStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  return (
    <div className="flex scrollbar gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {topics.map((topic) => {
        const currentStatus = topicStatuses[topic.id];
        const progress = STATUS_PROGRESS_MAP[currentStatus];
        topic.progress = progress;

        return (
          <motion.div
            key={topic.id}
            className="min-w-[250px] bg-white text-gray-800 rounded-xl shadow p-4 flex flex-col justify-between min-h-[150px] snap-start"
            whileHover={{ scale: 1.05 }}
          >
            {/* Topic name */}
            <p className="font-semibold mb-2 text-clamp text-center capitalize">
              {topic.title}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={false}
                animate={{ width: `${progress ?? 0}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Dropdown for completion state */}
            <Select
              value={currentStatus}
              onValueChange={(val) =>
                handleStatusChange(topic.id, val as Topic["status"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not started</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="not_completed">Almost Completed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TopicDeck;
