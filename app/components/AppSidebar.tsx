import { Home, Inbox, Search, Settings } from "lucide-react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  Book,
  Notebook,
  PenLine,
  Pencil,
  Library,
  School,
  FileText,
  Brain,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router";
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
  return (
    <Sidebar className=" rounded-full">
      <SidebarContent className="bg-gray-100 shadow-xl text-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black text-2xl font-semibold text-gradient mb-2">
            Studently
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex items-start px-4 mt-auto">
          <button>Log out</button>
          <button>Log out</button>
          <button>Log out</button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
