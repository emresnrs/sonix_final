"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fetchLatestGithubVersion } from "@workspace/ui/lib/utils";
import {
  AnimatedGroup,
  type AnimatedGroupProps,
} from "@workspace/ui/components/landing/animated-group";
import { Button } from "@workspace/ui/components/button";
import { TextEffect } from "@workspace/ui/components/landing/text-effect";
import { HeroHeader } from "./header";

const transitionVariants: AnimatedGroupProps["variants"] = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  const [latestTag, setLatestTag] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestGithubVersion().then((tag) => {
      if (tag) setLatestTag(tag);
    });
  }, []);

  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            backgroundImage: `
                  linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                  linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
                  repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
                `,
            WebkitMaskImage: `
                  repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
                `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="fixed inset-0 -z-20 hidden dark:block">
              <Image
                src="/night-background.webp"
                alt="background"
                className="size-full object-cover"
                fill
                priority
              />
            </div>




            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="https://github.com/emresnrs/sonix/releases/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Sonix v{latestTag} Released
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <AnimatedGroup variants={transitionVariants}>
                  <h1 className="mx-auto mt-8 max-w-4xl text-center text-5xl font-bold tracking-tight md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Ses dosyalarınızı
                    <br />
                    <span className="text-muted-foreground font-bold">metne çevirin</span>
                  </h1>
                </AnimatedGroup>

                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground"
                >
                  Gizliliğinizi koruyarak Whisper modelleriyle ses kayıtlarınızı hızlı ve doğru biçimde transkribe edin.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex items-center justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="cursor-pointer"
                  >
                    <Link href="/home">
                      <ArrowRight />
                      <span className="text-nowrap">Hemen Başla</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>


          </div>
        </section>
      </main>
    </>
  );
}
