import { useEffect, useRef } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MESTAAS — Under Construction" },
    {
      name: "description",
      content: "MESTAAS is under construction. Coming soon.",
    },
    { name: "theme-color", content: "#0c0d0e" },
  ];
}

export default function Home() {
  const stage = useRef<HTMLDivElement>(null);

  // Light travelling across brushed steel: the sheen origin trails the
  // pointer, damped so it reads as a reflection rather than a spotlight.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetX = 62;
    let targetY = 28;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * 0.055;
      y += (targetY - y) * 0.055;
      el.style.setProperty("--mx", `${x.toFixed(2)}%`);
      el.style.setProperty("--my", `${y.toFixed(2)}%`);
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
    };

    const onEnter = () => el.setAttribute("data-lit", "true");
    const onLeave = () => el.removeAttribute("data-lit");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("pointerleave", onLeave);
    el.setAttribute("data-lit", "true");
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <main ref={stage} className="stage">
      {/* fabricated stainless sheets */}
      <div className="wall" aria-hidden="true">
        <div className="panel panel--a" data-sheet="a" />
        <div className="panel panel--b" data-sheet="b" />
        <div className="panel panel--c" data-sheet="c" />
        <div className="panel panel--d" data-sheet="d" />
        <div className="panel panel--e" data-sheet="e" />
      </div>

      <div className="blemish blemish--1" aria-hidden="true" />
      <div className="blemish blemish--2" aria-hidden="true" />
      <div className="blemish blemish--3" aria-hidden="true" />
      <div className="room-light" aria-hidden="true" />
      <div className="sheen" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="crosshair" aria-hidden="true" />
      <div className="rivets" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <span className="label label--faint vert" aria-hidden="true">
        System / 001
      </span>

      <div className="content">
        <header className="rail">
          <div className="rail__group">
            <span className="label mark">
              MESTAAS<sup>®</sup>
            </span>
            <span className="label label--faint rail__group--drop">
              Est. 2026
            </span>
          </div>
          <span className="label label--faint">Stainless / 304</span>
        </header>

        <div className="headline">
          <h1 className="wordmark">Mestaas</h1>
          <div className="hairline" aria-hidden="true" />
          <div className="statement">
            <div className="statement__meta">
              <span className="label label--faint">File — 001 / 001</span>
              <span className="label label--faint rail__group--drop">
                No signal · Fabrication in progress
              </span>
            </div>
            <p className="status">
              <span>Is Under</span>
              <span>Construction</span>
            </p>
          </div>
        </div>

        <footer className="foot">
          <span className="label">
            <span className="dot" aria-hidden="true" />
            Status — Under Construction
          </span>
          <span className="label label--faint">Coming Soon</span>
        </footer>
      </div>
    </main>
  );
}
