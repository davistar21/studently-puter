import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/gpa", "routes/gpa-tracker.tsx"),
  route("/semesters", "routes/semesters.tsx"),
  route("/study", "routes/study.tsx"),
  route("/semesters/:semesterId", "routes/semesterPage.tsx"),
  route("/semesters/:id/courses/:id", "routes/courseDetailsPage.tsx"),
] satisfies RouteConfig;
