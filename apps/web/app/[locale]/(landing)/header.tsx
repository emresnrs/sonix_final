"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AudioLines } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

export const HeroHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav className="fixed z-20 w-full px-2">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex items-center justify-between gap-6 py-3 lg:py-4">
            <Link
              href="/"
              aria-label="home"
              className="flex items-center gap-2"
            >
              <div className="bg-primary flex size-7 items-center justify-center rounded-lg">
                <AudioLines className="text-primary-foreground size-4" />
              </div>
              <span className="text-base font-semibold tracking-tight">Sonix</span>
            </Link>

            <div className="flex items-center gap-3">
              <Button asChild size="sm">
                <Link href="/home">
                  Giriş Yap
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
