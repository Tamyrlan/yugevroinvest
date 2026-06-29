(() => {
  "use strict";

  const SVG_URL = "../assets/logo.svg";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = {
    stage: document.getElementById("stage"),
    logo: document.getElementById("logo"),
    glow: document.getElementById("glow"),
    emblem: document.getElementById("emblem"),
    cut: document.getElementById("cut"),
    draw: document.getElementById("draw"),
    particles: document.getElementById("particles"),
    shines: Array.from(document.querySelectorAll(".metal .shine")),
    metalWolf: document.querySelector(".metal--wolf"),
    metalName: document.querySelector(".metal--name"),
    metalSub: document.querySelector(".metal--sub"),
  };

  init();

  async function init() {
    const markup = await loadSvg(SVG_URL);
    els.cut.innerHTML = markup;
    buildStrokeLayer(markup);
    buildParticles(24);

    if (reduced) return; // CSS already shows the final composition
    requestAnimationFrame(() => requestAnimationFrame(playIntro));
  }

  async function loadSvg(url) {
    const res = await fetch(url);
    return res.text();
  }

  /* Clone the original artwork, strip the fill and overlay a gold stroke
     so the contour can be "drawn" without touching the source SVG. */
  function buildStrokeLayer(markup) {
    els.draw.innerHTML = markup;
    const paths = els.draw.querySelectorAll("path");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
  }

  function buildParticles(count) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "particle";
      // cluster around the wolf head (upper-centre of the emblem)
      const x = 50 + (Math.random() - 0.5) * 56; // 22% – 78%
      const y = 36 + (Math.random() - 0.5) * 44; // 14% – 58%
      const s = 1 + Math.random() * 2; // 1–3 px
      dot.style.left = x + "%";
      dot.style.top = y + "%";
      dot.style.width = s + "px";
      dot.style.height = s + "px";
      frag.appendChild(dot);
    }
    els.particles.appendChild(frag);
  }

  function playIntro() {
    const dots = els.particles.querySelectorAll(".particle");
    const drawPaths = els.draw.querySelectorAll("path");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: startAmbient,
    });

    /* Этап 1 — фон */
    tl.to(els.stage, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);

    /* Этап 2 — масштаб + проявление логотипа */
    tl.to(
      els.logo,
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      0.35
    );
    tl.to(els.glow, { opacity: 1, duration: 1.0, ease: "power2.out" }, 0.5);

    /* Этап 3 — прорисовка контура + проявление металла волка */
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
      els.metalWolf,
      {
        clipPath: "inset(0% 0% 36% 0%)",
        duration: 1.0,
        ease: "power3.out",
      },
      0.7
    );
    // particles twinkle in around the head
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

    /* Этап 4 — металлический блик слева направо */
    tl.add(() => sweep(0.8, 0.7), 1.75);
    tl.to(
      els.logo,
      {
        filter: "drop-shadow(0 0 18px rgba(255, 220, 120, 0.4))",
        duration: 0.35,
        ease: "power2.out",
      },
      1.75
    );
    tl.to(
      els.logo,
      {
        filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.2))",
        duration: 0.6,
        ease: "power2.inOut",
      },
      2.2
    );
    // contour fades into the solid gold fill
    tl.to(
      drawPaths,
      { opacity: 0, duration: 0.6, ease: "power2.out" },
      1.95
    );

    /* Этап 5 — название проявляется слева направо */
    tl.to(
      els.metalName,
      {
        clipPath: "inset(62% 0% 26% 0%)",
        duration: 0.55,
        ease: "power2.out",
      },
      2.45
    );

    /* Этап 6 — подзаголовок появляется снизу */
    tl.fromTo(
      els.metalSub,
      { clipPath: "inset(86% 0% 14% 0%)", opacity: 0 },
      {
        clipPath: "inset(74% 0% 14% 0%)",
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      },
      2.95
    );

    return tl;
  }

  /* Металлический проход света по логотипу */
  function sweep(maxOpacity, duration) {
    els.shines.forEach((shine) => {
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

  /* Этап 7 (дыхание) + Этап 8 (перелив раз в 10 секунд) */
  function startAmbient() {
    gsap.to(els.logo, {
      scale: 1.01,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const shimmer = () => {
      sweep(0.32, 1.6);
      gsap.to(els.logo, {
        filter: "drop-shadow(0 0 14px rgba(255, 220, 120, 0.32))",
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
        onComplete: () =>
          gsap.set(els.logo, {
            filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.2))",
          }),
      });
    };

    gsap.delayedCall(10, function loop() {
      shimmer();
      gsap.delayedCall(10, loop);
    });
  }
})();
