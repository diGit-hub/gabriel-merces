import { useEffect, useRef } from 'react';
import { clearCanvas, createScene, projectStars } from './constellationScene';
import type { Scene } from './constellationScene';

export default function ConstellationBackground({ seed = 17 }: { seed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !scene || !context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let field: Scene = { stars: [], groups: [], links: [] };
    let elapsed = 0;
    let frameId = 0;
    let previousTime = 0;
    let visible = true;
    let reducedMotion = motionPreference.matches;
    const camera = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function draw(delta: number) {
      if (!canvas || !context || !width || !height) return;
      elapsed += delta;
      const easing = 1 - Math.exp(-delta * 4);
      camera.x += (target.x - camera.x) * easing;
      camera.y += (target.y - camera.y) * easing;
      clearCanvas(context, canvas, width, height);
      const projected = projectStars(field, camera, elapsed);
      const edgeOpacity = projected.map(point => Math.max(0, Math.min(1, point.x / 24, (width - point.x) / 24, point.y / 24, (height - point.y) / 24)));
      context.lineWidth = 0.7;
      for (const link of field.links) {
        const alpha = link.opacity * Math.min(edgeOpacity[link.from], edgeOpacity[link.to]);
        context.strokeStyle = `rgba(45, 55, 72, ${alpha})`;
        context.beginPath();
        context.moveTo(projected[link.from].x, projected[link.from].y);
        context.lineTo(projected[link.to].x, projected[link.to].y);
        context.stroke();
      }

      field.stars.forEach((star, index) => {
        context.fillStyle = `rgba(45, 55, 72, ${(0.25 + star.brightness * 0.43) * edgeOpacity[index]})`;
        context.beginPath();
        context.arc(projected[index].x, projected[index].y, 0.8 + star.brightness, 0, Math.PI * 2);
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
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height || (width === bounds.width && height === bounds.height)) return;
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      field = createScene(width, height, seed);
      draw(0);
      syncAnimation();
    }

    function onPointerMove(event: PointerEvent) {
      if (reducedMotion || event.pointerType !== 'mouse' || !scene) return;
      const rect = scene.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 28;
      target.y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 20;
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
  }, [seed]);

  return <canvas ref={canvasRef} className="constellation-canvas" aria-hidden="true" />;
}
