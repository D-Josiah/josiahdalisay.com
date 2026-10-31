"use client";

import { useCallback, type MouseEvent } from "react";
import { tools, toolIconUrl } from "@/content/tools";
import { IdleBug } from "./IdleBug";

/**
 * Back-to-top control that bursts tool logos and emoji from the cursor
 * before scrolling. Client-only: it needs pointer coordinates and the
 * Web Animations API.
 */

const EMOJI = ["💻", "📊", "📧", "🎯", "⚡", "🔗", "⚙️"];
const PARTICLE_COUNT = 20;
const SCROLL_DELAY_MS = 600;
const LIFETIME_MS = 1200;

const logos = tools.map(toolIconUrl);
const random = (min: number, max: number) => min + Math.random() * (max - min);

function burst(originX: number, originY: number) {
  const particles = Array.from({ length: PARTICLE_COUNT }, () => {
    const node = document.createElement("div");

    if (Math.random() > 0.4) {
      const img = document.createElement("img");
      img.src = logos[Math.floor(Math.random() * logos.length)];
      img.alt = "";
      img.width = 24;
      img.height = 24;
      node.append(img);
    } else {
      node.textContent = EMOJI[Math.floor(Math.random() * EMOJI.length)];
      node.style.fontSize = "20px";
    }

    node.style.cssText += `position:fixed;z-index:99999;pointer-events:none;left:${originX}px;top:${originY}px;`;

    const angle = random(0, Math.PI * 2);
    const velocity = random(80, 200);
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 80;
    const spin = random(-360, 360);

    node.animate(
      [
        { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 },
        {
          transform: `translate(${dx}px,${dy}px) rotate(${spin}deg) scale(.3)`,
          opacity: 0,
        },
      ],
      { duration: random(800, 1200), easing: "cubic-bezier(.25,.46,.45,.94)" },
    );

    return node;
  });

  document.body.append(...particles);
  window.setTimeout(() => particles.forEach((node) => node.remove()), LIFETIME_MS);
}

export function BackToTop() {
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      window.scrollTo({ top: 0 });
      return;
    }

    burst(event.clientX, event.clientY);
    window.setTimeout(
      () => window.scrollTo({ top: 0, behavior: "smooth" }),
      SCROLL_DELAY_MS,
    );
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="flex cursor-pointer flex-col items-center gap-0.5 rounded-lg p-1"
    >
      <IdleBug className="w-[50px] animate-[bob_2s_ease-in-out_infinite]" />
      <span className="text-[11px] font-bold text-[#999]">Back to top? ↑</span>
    </button>
  );
}
