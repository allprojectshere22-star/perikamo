import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Home, CalendarDays, LineChart, Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { SplashScreen } from "@/components/splash-screen";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0D0D0D" },
      { title: "Perikoma — Understand your cycle" },
      {
        name: "description",
        content:
          "An educational period tracker for students. Understand what's happening in your body, and why — with science-backed phase insights and gentle tracking.",
      },
      { name: "author", content: "Perikoma" },
      { property: "og:title", content: "Perikoma — Understand your cycle" },
      {
        property: "og:description",
        content:
          "An educational period tracker for students. Understand what's happening in your body, and why — with science-backed phase insights and gentle tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Perikoma — Understand your cycle" },
      { name: "twitter:description", content: "An educational period tracker for students. Understand what's happening in your body, and why — with science-backed phase insights and gentle tracking." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/23744f78-d467-4411-a542-9f314a79e275/id-preview-45a7cb9d--d120b767-702e-4b26-a44f-12b8f54c4163.lovable.app-1784535850617.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/23744f78-d467-4411-a542-9f314a79e275/id-preview-45a7cb9d--d120b767-702e-4b26-a44f-12b8f54c4163.lovable.app-1784535850617.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Today", icon: Home },
  { to: "/cycle", label: "Cycle", icon: Sparkles },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/dashboard", label: "Progress", icon: LineChart },
] as const;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreen />
      <div className="min-h-screen hero-bg pb-28 md:pb-0 md:pt-20">
        {/* Desktop top nav */}
        <header className="hidden md:block fixed top-0 inset-x-0 z-40 glass">
          <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PerikomaMark />
              <span className="font-display font-semibold tracking-tight">Perikoma</span>
            </Link>
            <div className="flex items-center gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{
                    className:
                      "text-foreground bg-primary/15 border-primary/30",
                  }}
                  inactiveProps={{
                    className: "text-muted-foreground border-transparent hover:text-foreground",
                  }}
                  className="px-4 py-1.5 rounded-full text-sm border transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <Outlet />

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t">
          <ul className="grid grid-cols-4">
            {NAV.map((n) => {
              const Icon = n.icon;
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{
                      className: "text-primary",
                    }}
                    inactiveProps={{
                      className: "text-muted-foreground",
                    }}
                    className="flex flex-col items-center gap-1 py-3 text-xs"
                  >
                    <Icon className="size-5" />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

function PerikomaMark() {
  return (
    <div className="relative size-8 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-royal)" }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "var(--gradient-gold)", mixBlendMode: "overlay" }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white font-display font-bold">
        L
      </div>
    </div>
  );
}
