import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import ThemeToggle from "./components/ThemeToggle";
import { ToastProvider } from "./components/ToastProvider";
import { usePuterStore } from "./lib/puter";
import { useEffect } from "react";
import { Breadcrumb } from "./components/ui/breadcrumb";
import Breadcrumbs from "./components/Breadcrumbs";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore(); //initialize puter
  useEffect(() => {
    init();
  }, [init]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script src="https://js.puter.com/v2/"></script>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <ToastProvider>
        {/* <div className="app-container flex lg:flex-row flex-col"> */}
        {/* <NavBar /> */}
        <AppSidebar />
        <main className="">
          <header className="flex flex-col gap-2 p-4">
            <div className="flex items-center sticky">
              <SidebarTrigger className="text-black" />
              <Link to="/dashboard">
                {/* <h2 className="!font-bold md:hidden">Studently</h2>{" "} */}
                <div className="h-10">
                  <img
                    src="/images/studently-logo-temppng.png"
                    alt=""
                    className="object-contain"
                  />
                </div>
              </Link>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
            <Breadcrumbs />
          </header>
          <Outlet />
        </main>

        {/* </div> */}
      </ToastProvider>
    </SidebarProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
