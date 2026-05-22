import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar/navbar";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-100 py-10 mb-20 lg:mb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-sm font-light tracking-[0.2em] text-zinc-900 uppercase">
              Arco
            </span>
            <p className="text-xs text-zinc-400">
              © {new Date().getFullYear()} Arco. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors">
                Privacy
              </span>
              <span className="text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors">
                Terms
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
