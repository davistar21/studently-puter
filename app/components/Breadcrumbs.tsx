import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Link, useLocation } from "react-router";
import { Fragment, useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

export default function Breadcrumbs() {
  const location = useLocation();
  const { kv } = usePuterStore();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { label: string; to?: string }[]
  >([]);

  useEffect(() => {
    const buildBreadcrumbs = async () => {
      const segments = location.pathname.split("/").filter(Boolean);
      const crumbs: { label: string; to?: string }[] = [
        { label: "Dashboard", to: "/dashboard" },
      ];

      if (segments[0] === "semesters") {
        // Add static "Semesters" link
        crumbs.push({ label: "Semesters", to: "/semesters" });

        // Check for semesterId
        if (segments[1]) {
          const semesterId = segments[1];
          try {
            const semRaw = await kv.get(`semester:${semesterId}`);
            const semester = semRaw ? JSON.parse(semRaw) : null;

            if (semester) {
              crumbs.push({
                label: semester.name,
                to: `/semesters/${semesterId}`,
              });

              if (segments[2] === "courses" && segments[3]) {
                const courseId = segments[3];
                const course = semester.courses.find(
                  (c: any) => c.id === courseId
                );
                if (course) {
                  crumbs.push({
                    label: course.name,
                    to: undefined, // current page
                  });
                }
              }
            } else {
              crumbs.push({ label: semesterId }); // fallback
            }
          } catch (err) {
            console.error("Failed to load breadcrumb names", err);
          }
        }
      }

      setBreadcrumbs(crumbs);
    };

    buildBreadcrumbs();
  }, [location.pathname]);

  return (
    <div className="overflow-x-auto whitespace-nowrap scrollbar border-2 border-gray-500 rounded-full p-1 px-2">
      <Breadcrumb className="min-w-max">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const isFirst = idx === 0;

            return (
              <Fragment key={idx}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.to!}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {/* Only add separator if not the last crumb */}
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
