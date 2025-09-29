import {
  Home,
  Inbox,
  Search,
  Settings,
  User2Icon,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  Book,
  Notebook,
  PenLine,
  Pencil,
  Library,
  User,
  School,
  FileText,
  Brain,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { usePuterStore } from "~/lib/puter";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "GPA Tracker",
    url: "/gpa",
    icon: GraduationCap,
  },
  {
    title: "Planner",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Semesters",
    url: "/semesters",
    icon: Library,
  },
  {
    title: "Study",
    url: "/study",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isLoading);
    console.log(auth.user?.username);
    console.log(auth.isAuthenticated);
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, navigate, next]);
  return (
    <Sidebar className=" rounded-full">
      <SidebarContent className="bg-gray-50 dark:bg-gradient-dark shadow-xl text-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black text-2xl font-semibold text-gradient mb-2">
            Studently
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-1">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="group rounded-md px-2 py-1 bg-gray-100 hover:text-black hover:bg-gray-200 transition-colors duration-300 "
                >
                  <SidebarMenuButton
                    asChild
                    className="bg-gray-100 hover:text-black hover:bg-gray-200 transition-colors duration-300 "
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex items-start gap-2 mt-auto">
          <Link
            to="#"
            className="flex gap-2 w-full p-2 rounded-md text-sm bg-gray-100 items-center"
          >
            <User2Icon />
            <div>
              {auth.isAuthenticated ? "@" + auth.user?.username : "Profile"}
            </div>
          </Link>

          <Link
            to="#"
            className="flex gap-2 w-full p-2 rounded-md text-sm bg-gray-100 items-center"
          >
            <Settings />
            <div>Settings</div>
          </Link>

          <Link
            to="#"
            className="flex gap-2 text-red-600 bg-red-100 w-full p-2 rounded-md text-sm items-center"
            onClick={auth.signOut}
          >
            <LogOut className="text-red-700" />
            <div>Logout</div>
          </Link>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
