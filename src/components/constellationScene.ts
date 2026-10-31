import patterns from '../data/constellationPatterns.json';

interface Point {
  x: number;
  y: number;
}

export interface Star extends Point {
  brightness: number;
  group: number;
}

interface Group {
  depth: number;
  phase: number;
  constellation?: string;
}

export interface Scene {
  stars: Star[];
  groups: Group[];
  links: { from: number; to: number; opacity: number }[];
}

// Actual J2000 star positions and catalog line figures from D3-Celestial.
// Figures use a local stereographic projection and uniform scaling.
// Attribution, pinned source revision and BSD license: /third-party-notices.txt.
export function createScene(width: number, height: number, seed: number): Scene {
  let state = seed >>> 0;
  const random = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  const scene: Scene = { stars: [], groups: [], links: [] };
  const area = width * height;
  const count = Math.min(3, Math.max(width > 650 || height > 350 ? 2 : 1, Math.round(area / 130000)));
  const rows = height > 280 && count > 1 ? 2 : 1;
  const columns = Math.ceil(count / rows);
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const choices = [...patterns];
  for (let index = choices.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [choices[index], choices[other]] = [choices[other], choices[index]];
  }
  let complexFigureUsed = false;
  const selected = choices.filter(pattern => {
    if (pattern.stars.length <= 14) return true;
    if (width < 600 || height < 260 || complexFigureUsed) return false;
    complexFigureUsed = true;
    return true;
  }).slice(0, count);

  selected.forEach((pattern, group) => {
    const centerX = ((group % columns) + 0.5 + (random() - 0.5) * 0.12) * cellWidth;
    const centerY = (Math.floor(group / columns) + 0.5 + (random() - 0.5) * 0.08) * cellHeight;
    const sourceWidth = Math.max(...pattern.stars.map(star => star[0])) - Math.min(...pattern.stars.map(star => star[0]));
    const sourceHeight = Math.max(...pattern.stars.map(star => star[1])) - Math.min(...pattern.stars.map(star => star[1]));
    const landscapeAngle = sourceHeight > sourceWidth && cellWidth > cellHeight * 1.4 ? Math.PI / 2 : 0;
    const angle = landscapeAngle + (random() - 0.5) * 0.32;
    const rotated = pattern.stars.map(([x, y, magnitude]) => ({
      x: x * Math.cos(angle) - y * Math.sin(angle),
      y: x * Math.sin(angle) + y * Math.cos(angle),
      brightness: Math.min(1, Math.max(0.25, Math.exp(-0.24 * (magnitude + 0.2)))),
    }));
    const minX = Math.min(...rotated.map(point => point.x));
    const maxX = Math.max(...rotated.map(point => point.x));
    const minY = Math.min(...rotated.map(point => point.y));
    const maxY = Math.max(...rotated.map(point => point.y));
    const maxWidth = Math.max(60, Math.min(290, cellWidth - 80));
    const maxHeight = Math.max(32, Math.min(150, cellHeight - 64));
    const scale = Math.min(maxWidth / (maxX - minX), maxHeight / (maxY - minY));
    const start = scene.stars.length;
    scene.stars.push(...rotated.map(point => ({
      x: centerX + (point.x - (minX + maxX) / 2) * scale,
      y: centerY + (point.y - (minY + maxY) / 2) * scale,
      brightness: point.brightness,
      group,
    })));
    scene.groups.push({ depth: 0.65 + random() * 0.5, phase: random() * Math.PI * 2, constellation: pattern.id });
    pattern.links.forEach(([from, to]) => {
      scene.links.push({ from: start + from, to: start + to, opacity: 0.09 + Math.min(rotated[from].brightness, rotated[to].brightness) * 0.065 });
    });
  });

  const isolatedCount = Math.min(20, Math.max(7, Math.round(area / 28000)));
  for (let index = 0; index < isolatedCount; index++) {
    const group = scene.groups.length;
    scene.groups.push({ depth: 0.4 + random() * 0.8, phase: random() * Math.PI * 2 });
    scene.stars.push({ x: 28 + random() * Math.max(0, width - 56), y: 28 + random() * Math.max(0, height - 56), brightness: 0.25 + random() * 0.4, group });
  }
  return scene;
}

export function projectStars(scene: Scene, camera: Point, elapsed: number): Point[] {
  const offsets = scene.groups.map(group => ({
    x: camera.x * group.depth + Math.sin(elapsed * 0.075 + group.phase) * 5,
    y: camera.y * group.depth + Math.cos(elapsed * 0.06 + group.phase) * 3,
  }));
  return scene.stars.map(star => ({ x: star.x + offsets[star.group].x, y: star.y + offsets[star.group].y }));
}

export function clearCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, width: number, height: number) {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
}
