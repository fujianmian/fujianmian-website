"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation-items";

export function MobileNavigation({ brand }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = "mobile-primary-navigation";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 px-5 py-4 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-[0.16em] text-white uppercase">{brand}</Link>
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-md p-2 text-slate-200 hover:bg-slate-800"
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>
      {isOpen && (
        <nav id={menuId} aria-label="Primary navigation" className="mx-auto mt-4 max-w-5xl border-t border-slate-800 pt-3">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-slate-800 text-cyan-200" : "text-slate-200 hover:bg-slate-900"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
