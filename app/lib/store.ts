// src/lib/store.ts
import { create } from "zustand";
import type { Semester, Course } from "types";
import type { PuterStore } from "./puter";
// import type { KV } from "puter-js"; // adjust import if needed

type AppState = {
  semesters: Semester[];
  isLoading: boolean;
  selectedSemesterId: string | null;

  setSemesters: (semesters: Semester[]) => void;
  setSelectedSemesterId: (id: string | null) => void;

  loadSemestersFromKV: (kv: PuterStore["kv"]) => Promise<void>;
  addSemesterToKV: (kv: PuterStore["kv"]) => Promise<void>;
  addCourseToSemester: (
    kv: PuterStore["kv"],
    semesterId: string,
    newCourse: Course
  ) => Promise<void>;
  updateSemester: (
    kv: PuterStore["kv"],
    semesterId: string,
    updatedSemester: Semester
  ) => void;
  getSemesterById: (semesterId: string) => Semester | null;
};

export const useAppStore = create<AppState>((set, get) => ({
  semesters: [],
  isLoading: false,
  selectedSemesterId: null,

  setSemesters: (semesters) => set({ semesters }),
  setSelectedSemesterId: (id) => set({ selectedSemesterId: id }),

  loadSemestersFromKV: async (kv) => {
    try {
      set({ isLoading: true });

      const raw = (await kv.list("semester:*", true)) as KVItem[];
      const semesters = raw.map((item) => JSON.parse(item.value)) as Semester[];

      set({ semesters });
    } catch (err) {
      console.error("Failed to load semesters from KV", err);
    } finally {
      set({ isLoading: false });
    }
  },

  addSemesterToKV: async (kv) => {
    try {
      set({ isLoading: true });

      const { semesters } = get();
      const newSem: Semester = {
        id: crypto.randomUUID().split("-")[0],
        name: `Semester ${semesters.length + 1}`,
        courses: [],
        units: 0,
      };

      await kv.set(`semester:${newSem.id}`, JSON.stringify(newSem));
      set({ semesters: [...semesters, newSem] });
    } catch (err) {
      console.error("Failed to add semester", err);
    } finally {
      set({ isLoading: false });
    }
  },
  updateSemester: async (kv, semesterId, updatedSemester) => {
    try {
      set({ isLoading: true });
      const { semesters } = get();
      await kv.set(`semester:${semesterId}`, JSON.stringify(updatedSemester));
      const updatedSemesters = semesters.map((s) =>
        s.id === semesterId ? updatedSemester : s
      );
      set({ semesters: updatedSemesters });
    } catch (err) {
      console.error("Failed to update semester", err);
    } finally {
      set({ isLoading: false });
    }
  },
  addCourseToSemester: async (kv, semesterId, newCourse) => {
    const { semesters } = get();

    const key = `semester:${semesterId}`;
    const semester = semesters.find((s) => s.id === semesterId);
    if (!semester) throw new Error("Semester not found in store");

    const updatedCourses = [...semester.courses, newCourse];
    const updatedSemester: Semester = {
      ...semester,
      units: semester.units + newCourse.units,
      courses: updatedCourses,
    };

    await kv.set(key, JSON.stringify(updatedSemester));

    const updatedSemesters = semesters.map((s) =>
      s.id === semesterId ? updatedSemester : s
    );

    set({ semesters: updatedSemesters });
  },

  getSemesterById: (id: string) => {
    const { semesters } = get();
    return semesters.find((s) => s.id === id) || null;
  },
}));
