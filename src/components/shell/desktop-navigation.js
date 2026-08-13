"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation-items";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="mt-12">
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onPointerUp={(event) => {
                  if (event.pointerType === "mouse" || event.pointerType === "pen") event.currentTarget.blur();
                }}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-slate-800 text-cyan-200" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
