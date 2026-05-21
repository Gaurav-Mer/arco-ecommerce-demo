import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-light tracking-[0.2em] text-zinc-900 uppercase select-none"
        >
          Arco
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={cn(
              "text-sm transition-colors",
              pathname === "/"
                ? "text-zinc-900"
                : "text-zinc-500 hover:text-zinc-900"
            )}
          >
            Shop
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link to="/cart" aria-label={`Cart, ${totalItems} items`}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="size-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-medium text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-6">
                <nav className="mt-8 flex flex-col gap-6">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className={cn(
                        "text-base transition-colors",
                        pathname === "/"
                          ? "font-medium text-zinc-900"
                          : "text-zinc-500 hover:text-zinc-900"
                      )}
                    >
                      Shop
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/cart"
                      className="flex items-center gap-2 text-base text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      <ShoppingBag className="size-4" />
                      Cart
                      {totalItems > 0 && (
                        <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] text-white">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
