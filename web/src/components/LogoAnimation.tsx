import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LogoAnimation.css";

const SVG_URL = "/logo.svg";

export default function LogoAnimation({ className }: { className?: string }) {
  const wrapperRef = useRef(null);
  const didPlay = useRef(false);

  useEffect(() => {
    if (didPlay.current) return;
    didPlay.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = wrapperRef.current;
    const stage = root;
    const logo = root.querySelector(".logo");
    const glow = root.querySelector(".glow");
    const cut = root.querySelector(".cut");
    const draw = root.querySelector(".draw");
    const particles = root.querySelector(".particles");
    const metalWolf = root.querySelector(".metal--wolf");
    const metalName = root.querySelector(".metal--name");
    const metalSub = root.querySelector(".metal--sub");
    const shines = Array.from(root.querySelectorAll(".metal .shine"));

    let cleanup = null;

    async function init() {
      const markup = await fetch(SVG_URL).then((r) => r.text());
      cut.innerHTML = markup;
      draw.innerHTML = markup;
      draw.querySelectorAll("path").forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      });
      buildParticles(24);
      if (reduced) return;
      requestAnimationFrame(() => requestAnimationFrame(() => play()));
    }

    function buildParticles(count) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("span");
        dot.className = "particle";
        dot.style.left = 50 + (Math.random() - 0.5) * 56 + "%";
        dot.style.top = 36 + (Math.random() - 0.5) * 44 + "%";
        const s = 1 + Math.random() * 2;
        dot.style.width = s + "px";
        dot.style.height = s + "px";
        frag.appendChild(dot);
      }
      particles.appendChild(frag);
    }

    function play() {
      const dots = particles.querySelectorAll(".particle");
      const drawPaths = draw.querySelectorAll("path");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: startAmbient,
      });

      tl.to(stage, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      tl.to(
        logo,
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0.35
      );
      tl.to(glow, { opacity: 1, duration: 1.0, ease: "power2.out" }, 0.5);

      tl.to(
        drawPaths,
        { opacity: 0.9, duration: 0.2, ease: "power1.out" },
        0.6
      );
      tl.to(
        drawPaths,
        { strokeDashoffset: 0, duration: 1.25, ease: "power2.inOut" },
        0.6
      );
      tl.to(
        metalWolf,
        {
          clipPath: "inset(0% 0% 36% 0%)",
          duration: 1.0,
          ease: "power3.out",
        },
        0.7
      );
      tl.to(
        dots,
        {
          opacity: 0.85,
          duration: 0.6,
          stagger: { each: 0.03, from: "random" },
          ease: "sine.out",
        },
        0.8
      );
      tl.to(
        dots,
        {
          opacity: 0,
          y: -10,
          duration: 1.4,
          stagger: { each: 0.03, from: "random" },
          ease: "sine.inOut",
        },
        1.4
      );

      tl.add(() => sweep(0.8, 0.7), 1.75);
      tl.to(
        logo,
        {
          filter: "drop-shadow(0 0 18px rgba(255, 220, 120, 0.4))",
          duration: 0.35,
          ease: "power2.out",
        },
        1.75
      );
      tl.to(
        logo,
        {
          filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.2))",
          duration: 0.6,
          ease: "power2.inOut",
        },
        2.2
      );
      tl.to(
        drawPaths,
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        1.95
      );

      tl.to(
        metalName,
        {
          clipPath: "inset(62% 0% 26% 0%)",
          duration: 0.55,
          ease: "power2.out",
        },
        2.45
      );

      tl.fromTo(
        metalSub,
        { clipPath: "inset(86% 0% 14% 0%)", opacity: 0 },
        {
          clipPath: "inset(74% 0% 14% 0%)",
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        2.95
      );

      cleanup = () => {
        tl.kill();
      };
    }

    function sweep(maxOpacity: number, duration: number) {
      shines.forEach((shine: HTMLElement) => {
        gsap.fromTo(
          shine,
          { xPercent: -160, opacity: 0 },
          {
            keyframes: [
              { opacity: maxOpacity, duration: duration * 0.25 },
              { opacity: 0, duration: duration * 0.75 },
            ],
            xPercent: 230,
            duration,
            ease: "power1.inOut",
            overwrite: "auto",
          }
        );
      });
    }

    function startAmbient() {
      gsap.to(logo, {
        scale: 1.01,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const shimmer = () => {
        sweep(0.32, 1.6);
        gsap.to(logo, {
          filter: "drop-shadow(0 0 14px rgba(255, 220, 120, 0.32))",
          duration: 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          onComplete: () =>
            gsap.set(logo, {
              filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.2))",
            }),
        });
      };

      gsap.delayedCall(10, function loop() {
        shimmer();
        gsap.delayedCall(10, loop);
      });
    }

    init();
    return () => {
      if (cleanup) cleanup();
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <div className={`stage ${className || ""}`} ref={wrapperRef} aria-label="ЮГ ЕвроИнвест — Торговая компания">
      <div className="logo">
        <div className="glow"></div>
        <div className="emblem">
          <div className="metal metal--wolf"><span className="shine"></span></div>
          <div className="metal metal--name"><span className="shine"></span></div>
          <div className="metal metal--sub"><span className="shine"></span></div>
          <div className="cut"></div>
          <div className="draw"></div>
          <div className="particles"></div>
        </div>
      </div>
    </div>
  );
}
