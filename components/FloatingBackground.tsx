"use client";

import { useEffect, useRef } from "react";
import { techIcons } from "@/data/techIcons";

const SHOW_SHAPES = true;
const MAX_ALPHA = 0.55;
type Vec = [number, number, number];
type Shape = { verts: Vec[]; edges: [number, number][] };

const PHI = (1 + Math.sqrt(5)) / 2;

function makeShape(raw: Vec[], edgeLen: number): Shape {
  const maxR = Math.max(...raw.map(([x, y, z]) => Math.hypot(x, y, z)));
  const verts = raw.map(([x, y, z]) => [x / maxR, y / maxR, z / maxR] as Vec);
  const edges: [number, number][] = [];
  for (let i = 0; i < raw.length; i++) {
    for (let j = i + 1; j < raw.length; j++) {
      const d = Math.hypot(
        raw[i][0] - raw[j][0],
        raw[i][1] - raw[j][1],
        raw[i][2] - raw[j][2]
      );
      if (Math.abs(d - edgeLen) < 1e-3) edges.push([i, j]);
    }
  }
  return { verts, edges };
}

const SHAPES: Shape[] = [
  makeShape(
    [
      [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
      [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
      [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
    ],
    2
  ),
  makeShape(
    [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
    Math.SQRT2
  ),
  makeShape(
    [
      [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
      [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
    ],
    2
  ),
  makeShape(
    [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
    2 * Math.SQRT2
  ),
];

type Floater = {
  shape: Shape;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  rx: number;
  ry: number;
};

type Star = { x: number; y: number; r: number; vy: number; phase: number };

type Burst = {
  img: HTMLImageElement;
  angle: number;
  dist: number;
  speed: number;
  rot: number;
  spin: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function FloatingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spritesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sprites = spritesRef.current;
    if (!canvas || !sprites) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cancelled = false;
    let w = 0;
    let h = 0;
    let maxDist = 0;
    let raf = 0;
    let isMobile = false;
    let floaters: Floater[] = [];
    let stars: Star[] = [];
    let bursts: Burst[] = [];
    let images: HTMLImageElement[] = [];

    const loadImage = (svg: SVGSVGElement) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const clone = svg.cloneNode(true) as SVGSVGElement;
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const xml = new XMLSerializer().serializeToString(clone);
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
      });

    const spawnBurst = (b: Burst, fresh: boolean) => {
      b.img = images[Math.floor(Math.random() * images.length)];
      b.angle = rand(0, Math.PI * 2);
      b.dist = fresh ? rand(0, maxDist) : rand(0, 20);
      b.speed = rand(0.35, 0.7);
      b.rot = rand(-0.4, 0.4);
      b.spin = rand(-0.003, 0.003);
    };

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      isMobile = w < 768;
      maxDist = (Math.hypot(w, h) / 2) * 1.05;

      const shapeCount = SHOW_SHAPES ? (isMobile ? 2 : 3) : 0;
      floaters = Array.from({ length: shapeCount }, (_, i) => ({
        shape: SHAPES[i % SHAPES.length],
        x: rand(0, w),
        y: rand(0, h),
        size: isMobile ? rand(30, 50) : rand(40, 80),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.12, 0.12),
        ax: rand(0, Math.PI * 2),
        ay: rand(0, Math.PI * 2),
        rx: rand(-0.004, 0.004),
        ry: rand(0.002, 0.006),
      }));

      stars = Array.from({ length: isMobile ? 60 : 140 }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.4, 1.4),
        vy: rand(0.02, 0.12),
        phase: rand(0, Math.PI * 2),
      }));

      if (images.length > 0) {
        const count = isMobile ? 10 : 18;
        bursts = Array.from({ length: count }, (_, i) => {
          const b = {} as Burst;
          spawnBurst(b, true);
          b.angle = (i / count) * Math.PI * 2 + rand(-0.2, 0.2); // spread evenly
          return b;
        });
      }
    };

    const drawFloater = (f: Floater) => {
      const cx = Math.cos(f.ax), sx = Math.sin(f.ax);
      const cy = Math.cos(f.ay), sy = Math.sin(f.ay);

      const pts = f.shape.verts.map(([vx, vy, vz]) => {
        const y1 = vy * cx - vz * sx;
        const z1 = vy * sx + vz * cx;
        const x2 = vx * cy + z1 * sy;
        const z2 = -vx * sy + z1 * cy;
        const persp = 1 + z2 * 0.25;
        return { x: f.x + x2 * f.size * persp, y: f.y + y1 * f.size * persp };
      });

      ctx.strokeStyle = "rgba(192, 132, 252, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const [a, b] of f.shape.edges) {
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
      }
      ctx.stroke();

      ctx.fillStyle = "rgba(216, 180, 254, 0.6)";
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBurst = (b: Burst) => {
      const p = b.dist / maxDist; 
      const scale = isMobile ? 0.7 : 1;
      const size = (14 + 74 * Math.pow(p, 1.4)) * scale;
      
      const alpha =
        MAX_ALPHA * Math.min(1, p / 0.12) * (p > 0.8 ? (1 - p) / 0.2 : 1);
      if (alpha <= 0.01) return;

      const x = w / 2 + Math.cos(b.angle) * b.dist;
      const y = h / 2 + Math.sin(b.angle) * b.dist;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(b.rot);
      ctx.drawImage(b.img, -size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const frame = (t: number) => {
      if (cancelled) return;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        if (!reduceMotion) {
          s.y += s.vy;
          if (s.y > h) s.y = 0;
        }
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.0015 + s.phase));
        ctx.fillStyle = `rgba(233, 213, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const f of floaters) {
        if (!reduceMotion) {
          f.ax += f.rx;
          f.ay += f.ry;
          f.x += f.vx;
          f.y += f.vy;
          const m = f.size * 2;
          if (f.x < -m) f.x = w + m;
          if (f.x > w + m) f.x = -m;
          if (f.y < -m) f.y = h + m;
          if (f.y > h + m) f.y = -m;
        }
        drawFloater(f);
      }

      for (const b of bursts) {
        if (!reduceMotion) {
          const p = b.dist / maxDist;
          b.dist += b.speed * (0.6 + p * 3.2); 
          b.rot += b.spin;
          if (b.dist > maxDist) spawnBurst(b, false);
        }
        drawBurst(b);
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };

    const onResize = () => init();

    const svgs = Array.from(sprites.querySelectorAll("svg"));
    Promise.all(svgs.map(loadImage)).then((loaded) => {
      if (cancelled) return;
      images = loaded.filter((i): i is HTMLImageElement => i !== null);
      init();
      raf = requestAnimationFrame(frame);
      window.addEventListener("resize", onResize);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
            <div ref={spritesRef} aria-hidden="true" className="hidden">
        {Object.entries(techIcons).map(([name, { icon: Icon, color }]) => (
          <Icon key={name} size={64} color={color} />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      />
    </>
  );
}