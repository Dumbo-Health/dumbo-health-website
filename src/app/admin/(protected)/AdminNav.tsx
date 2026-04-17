"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin/questions",   label: "Questions" },
  { href: "/admin/rules",       label: "Routing Rules" },
  { href: "/admin/results",     label: "Results" },
  { href: "/admin/steps",       label: "Next Steps" },
  { href: "/admin/signals",     label: "Signals" },
  { href: "/admin/cio",         label: "CIO Attributes" },
  { href: "/admin/submissions",    label: "Submissions" },
  { href: "/admin/launch-states", label: "Launch States" },
  { href: "/admin/waitlist",   label: "Waitlist" },
  { href: "/admin/analytics",  label: "Analytics" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-56 flex flex-col bg-[#031F3D] text-white shrink-0">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-0.5">Dumbo Health</p>
        <p className="text-sm font-semibold">Admin</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[#FF8361] text-white font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
