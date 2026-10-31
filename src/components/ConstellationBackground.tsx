import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  opacity: number;
  linkable: boolean;
}

const EDGE_PADDING = 32;
const LINK_DISTANCE = 135;

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !scene || !context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frameId = 0;
    let previousTime = 0;
    let visible = true;
    let reducedMotion = motionPreference.matches;
    const camera = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function draw(delta: number) {
      if (!context) return;
      const easing = 1 - Math.exp(-delta * 4);
      camera.x += (target.x - camera.x) * easing;
      camera.y += (target.y - camera.y) * easing;
      context.clearRect(0, 0, width, height);

      const projected = stars.map(star => {
        star.x += star.vx * delta;
        star.y += star.vy * delta;
        if (star.x < -EDGE_PADDING) star.x = width + EDGE_PADDING;
        if (star.x > width + EDGE_PADDING) star.x = -EDGE_PADDING;
        if (star.y < -EDGE_PADDING) star.y = height + EDGE_PADDING;
        if (star.y > height + EDGE_PADDING) star.y = -EDGE_PADDING;
        return { x: star.x + camera.x * star.depth, y: star.y + camera.y * star.depth };
      });

      const links: { from: number; to: number; distance: number }[] = [];
      for (let from = 0; from < stars.length; from++) {
        if (!stars[from].linkable) continue;
        for (let to = from + 1; to < stars.length; to++) {
          if (!stars[to].linkable) continue;
          const distance = Math.hypot(projected[from].x - projected[to].x, projected[from].y - projected[to].y);
          if (distance < LINK_DISTANCE) links.push({ from, to, distance });
        }
      }

      // Short links and a low connection count keep the field in small constellations.
      links.sort((a, b) => a.distance - b.distance);
      const connections = new Uint8Array(stars.length);
      let remainingLinks = Math.floor(stars.length * 0.55);
      context.lineWidth = 0.7;
      for (const link of links) {
        if (!remainingLinks) break;
        if (connections[link.from] >= 2 || connections[link.to] >= 2) continue;
        const alpha = 0.24 * (1 - link.distance / LINK_DISTANCE);
        context.strokeStyle = `rgba(45, 55, 72, ${alpha})`;
        context.beginPath();
        context.moveTo(projected[link.from].x, projected[link.from].y);
        context.lineTo(projected[link.to].x, projected[link.to].y);
        context.stroke();
        connections[link.from]++;
        connections[link.to]++;
        remainingLinks--;
      }

      stars.forEach((star, index) => {
        context.fillStyle = `rgba(45, 55, 72, ${star.opacity})`;
        context.beginPath();
        context.arc(projected[index].x, projected[index].y, star.radius, 0, Math.PI * 2);
        context.fill();
      });
    }

    function animate(time: number) {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      draw(delta);
      frameId = window.requestAnimationFrame(animate);
    }

    function syncAnimation() {
      if (visible && !document.hidden && !reducedMotion) {
        if (!frameId) {
          previousTime = 0;
          frameId = window.requestAnimationFrame(animate);
        }
      } else {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        previousTime = 0;
        if (reducedMotion) {
          camera.x = camera.y = target.x = target.y = 0;
          draw(0);
        }
      }
    }

    function resize() {
      if (!canvas || !scene || !context) return;
      width = scene.clientWidth;
      height = scene.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(64, Math.max(12, Math.round(width * height / 11500)));
      stars = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1 + Math.random() * 0.8,
          depth: 0.6 + Math.random() * 0.8,
          opacity: 0.45 + Math.random() * 0.22,
          linkable: Math.random() > 0.2,
        };
      });
      draw(0);
      syncAnimation();
    }

    function onPointerMove(event: PointerEvent) {
      if (reducedMotion || event.pointerType !== 'mouse' || !scene) return;
      const rect = scene.getBoundingClientRect();
      target.x = -((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 28;
      target.y = -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 20;
    }

    function onPointerLeave() {
      target.x = target.y = 0;
    }

    function onMotionChange() {
      reducedMotion = motionPreference.matches;
      syncAnimation();
    }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { rootMargin: '100px' });

    resize();
    resizeObserver.observe(scene);
    visibilityObserver.observe(scene);
    scene.addEventListener('pointermove', onPointerMove, { passive: true });
    scene.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', syncAnimation);
    motionPreference.addEventListener('change', onMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      scene.removeEventListener('pointermove', onPointerMove);
      scene.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionPreference.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-canvas" aria-hidden="true" />;
}
