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
}

export interface Scene {
  stars: Star[];
  groups: Group[];
  links: { from: number; to: number; opacity: number }[];
}

export function createScene(width: number, height: number, seed: number): Scene {
  let state = seed >>> 0;
  const random = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  const scene: Scene = { stars: [], groups: [], links: [] };
  const area = width * height;
  const count = Math.min(4, Math.max(height > 350 ? 2 : 1, Math.round(area / 100000)));
  const rows = height > 280 && count > 1 ? 2 : 1;
  const columns = Math.ceil(count / rows);
  const cellWidth = width / columns;
  const cellHeight = height / rows;

  for (let group = 0; group < count; group++) {
    const centerX = ((group % columns) + 0.5 + (random() - 0.5) * 0.16) * cellWidth;
    const centerY = (Math.floor(group / columns) + 0.5 + (random() - 0.5) * 0.12) * cellHeight;
    const stemLength = 5 + Math.floor(random() * 2);
    const phase = random() * Math.PI * 2;
    const points: Point[] = [];
    let x = 0;
    for (let index = 0; index < stemLength; index++) {
      x += 0.65 + random() * 0.7;
      points.push({ x, y: Math.sin(index * 0.85 + phase) * 0.9 + (random() - 0.5) * 0.5 });
    }
    const branch = points[2];
    points.push({ x: branch.x + (random() - 0.5) * 1.3, y: branch.y + (random() > 0.5 ? 1 : -1) * (1.1 + random() * 0.5) });

    const angle = (random() - 0.5) * 1.1;
    const rotated = points.map(point => ({ x: point.x * Math.cos(angle) - point.y * Math.sin(angle), y: point.x * Math.sin(angle) + point.y * Math.cos(angle) }));
    const minX = Math.min(...rotated.map(point => point.x));
    const maxX = Math.max(...rotated.map(point => point.x));
    const minY = Math.min(...rotated.map(point => point.y));
    const maxY = Math.max(...rotated.map(point => point.y));
    const scale = Math.min(Math.min(250, cellWidth * 0.62) / (maxX - minX), Math.min(115, cellHeight * 0.5) / (maxY - minY));
    const start = scene.stars.length;
    const members = rotated.map(point => ({
      x: centerX + (point.x - (minX + maxX) / 2) * scale,
      y: centerY + (point.y - (minY + maxY) / 2) * scale,
      brightness: 0.55 + random() * 0.45,
      group,
    }));
    scene.stars.push(...members);
    scene.groups.push({ depth: 0.65 + random() * 0.5, phase });

    // A brightness-weighted spanning tree favors open chains and branches.
    // Its topology is chosen once, independently of camera movement.
    const candidates: { from: number; to: number; weight: number }[] = [];
    for (let from = 0; from < members.length; from++) {
      for (let to = from + 1; to < members.length; to++) {
        const distance = Math.hypot(members[from].x - members[to].x, members[from].y - members[to].y);
        candidates.push({ from, to, weight: distance / Math.sqrt(members[from].brightness * members[to].brightness) });
      }
    }
    candidates.sort((a, b) => a.weight - b.weight);
    const roots = members.map((_, index) => index);
    const degrees = new Uint8Array(members.length);
    const selected = new Set<string>();
    const root = (index: number): number => roots[index] === index ? index : root(roots[index]);
    const connect = (from: number, to: number) => {
      scene.links.push({ from: start + from, to: start + to, opacity: 0.09 + Math.min(members[from].brightness, members[to].brightness) * 0.065 });
      degrees[from]++;
      degrees[to]++;
      selected.add(`${from}:${to}`);
    };
    for (const edge of candidates) {
      const fromRoot = root(edge.from);
      const toRoot = root(edge.to);
      if (fromRoot === toRoot || degrees[edge.from] >= 3 || degrees[edge.to] >= 3) continue;
      roots[fromRoot] = toRoot;
      connect(edge.from, edge.to);
    }
    // Occasionally close one figure within a larger constellation.
    if (random() < 0.2) {
      const extra = candidates.find(edge => !selected.has(`${edge.from}:${edge.to}`) && degrees[edge.from] < 3 && degrees[edge.to] < 3);
      if (extra) connect(extra.from, extra.to);
    }
  }

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
  // Clear physical pixels, including the last row at fractional pixel ratios.
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
}
