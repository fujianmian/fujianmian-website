"use client";

import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { SocialLinks } from "./social-links";
import { profile } from "@/content/profile";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PortfolioShell({ children }) {
  const pathname = usePathname();
  const [isSidebarGuidanceVisible, setIsSidebarGuidanceVisible] = useState(false);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!desktopQuery.matches || reducedMotionQuery.matches) return undefined;

    if (hasMountedRef.current) {
      setIsSidebarGuidanceVisible(true);
      const hideTimer = window.setTimeout(() => setIsSidebarGuidanceVisible(false), 1500);

      return () => window.clearTimeout(hideTimer);
    }

    hasMountedRef.current = true;
    const revealTimer = window.setTimeout(() => setIsSidebarGuidanceVisible(true), 400);
    const hideTimer = window.setTimeout(() => setIsSidebarGuidanceVisible(false), 1900);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="min-h-dvh bg-slate-950 text-slate-100">
        <aside data-guidance-visible={isSidebarGuidanceVisible} className="desktop-sidebar fixed inset-y-0 left-0 z-50 hidden w-max max-w-none whitespace-nowrap border-r border-slate-800 bg-slate-950/95 px-7 py-8 shadow-2xl shadow-slate-950/40 backdrop-blur lg:block">
          <span aria-hidden="true" className="absolute inset-y-0 right-0 w-5 border-l border-slate-700/70 bg-slate-900/90" />
          <div className="relative h-full overflow-x-hidden overflow-y-auto pr-4">
            <div className="sticky top-8">
              <p className="text-[clamp(2rem,3vw,3rem)] font-bold leading-none tracking-[-0.06em] text-white uppercase">{profile.brand}</p>
              <p className="mt-5 text-lg font-medium leading-7 text-slate-300">{profile.name}</p>
              <DesktopNavigation />
              <p aria-hidden="true" className={`sidebar-guidance-hint mt-8 text-xs font-semibold tracking-[0.14em] text-cyan-200 uppercase ${isSidebarGuidanceVisible ? "sidebar-guidance-hint-visible" : ""}`}>Hover to explore</p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-dvh min-w-0 flex-col">
          <MobileNavigation brand={profile.brand} />
          <main id="main-content" className="flex-1 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
            {children}
          </main>
          <footer className="border-t border-slate-800 px-5 py-7 sm:px-8 lg:hidden">
            <p className="text-xs font-medium tracking-[0.16em] text-slate-400 uppercase">Connect</p>
            <div className="mt-3"><SocialLinks compact /></div>
          </footer>
        </div>

        <div className="fixed right-6 bottom-6 z-40 hidden lg:block">
          <SocialLinks iconOnly />
        </div>
      </div>
    </>
  );
}
