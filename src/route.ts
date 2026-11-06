export type EnemyKind = "drone" | "dart" | "turret" | "lancer";

export interface EnemyStats {
  hp: number;
  score: number;
  radius: number;
  dropChance: number;
  canShoot: boolean;
}

export const ENEMIES: Record<EnemyKind, EnemyStats> = {
  drone: { hp: 2, score: 100, radius: 13, dropChance: 0.015, canShoot: true },
  dart: { hp: 1, score: 150, radius: 12, dropChance: 0.015, canShoot: false },
  turret: { hp: 12, score: 400, radius: 19, dropChance: 0.3, canShoot: true },
  lancer: { hp: 4, score: 250, radius: 15, dropChance: 0.06, canShoot: true },
};

export type Formation = "line" | "vee" | "column" | "pincer";

export interface Wave {
  at: number;
  kind: EnemyKind;
  count: number;
  formation: Formation;
  x?: number;
}

export interface Sector {
  name: string;
  subtitle: string;
  length: number;
  waves: Wave[];
}

export interface SpawnPoint {
  at: number;
  x: number;
  y: number;
  side: number;
}

export function spawnPoint(wave: Wave, i: number): SpawnPoint {
  const center = wave.x ?? 240;
  const offset = i - (wave.count - 1) / 2;
  const row = Math.floor(i / 2);
  const side = i % 2 === 0 ? 1 : -1;
  switch (wave.formation) {
    case "line":
      return { at: wave.at, x: center + offset * 64, y: -30, side };
    case "vee":
      return {
        at: wave.at + Math.abs(offset) * 10,
        x: center + offset * 44,
        y: -30,
        side,
      };
    case "column":
      return { at: wave.at + i * 24, x: center, y: -30, side };
    case "pincer":
      return {
        at: wave.at + row * 30,
        x: side === 1 ? -30 : 510,
        y: 70 + row * 50,
        side,
      };
  }
}

export const ROUTE: Sector[] = [
  {
    name: "Outer Drift",
    subtitle: "Scouts ahead",
    length: 1560,
    waves: [
      { at: 60, kind: "drone", count: 4, formation: "line" },
      { at: 360, kind: "drone", count: 5, formation: "vee", x: 168 },
      { at: 660, kind: "drone", count: 5, formation: "vee", x: 312 },
      { at: 960, kind: "drone", count: 6, formation: "line" },
      { at: 1200, kind: "drone", count: 4, formation: "column", x: 120 },
      { at: 1260, kind: "drone", count: 4, formation: "column", x: 360 },
    ],
  },
  {
    name: "Shatter Belt",
    subtitle: "Divers incoming",
    length: 1800,
    waves: [
      { at: 60, kind: "drone", count: 6, formation: "vee" },
      { at: 300, kind: "dart", count: 4, formation: "line" },
      { at: 600, kind: "dart", count: 5, formation: "column", x: 144 },
      { at: 720, kind: "dart", count: 5, formation: "column", x: 336 },
      { at: 1020, kind: "drone", count: 7, formation: "line" },
      { at: 1140, kind: "dart", count: 5, formation: "vee" },
      { at: 1440, kind: "dart", count: 6, formation: "line" },
    ],
  },
  {
    name: "Gun Lanes",
    subtitle: "Turrets online",
    length: 1920,
    waves: [
      { at: 60, kind: "turret", count: 1, formation: "line" },
      { at: 240, kind: "drone", count: 6, formation: "vee" },
      { at: 540, kind: "turret", count: 2, formation: "line" },
      { at: 840, kind: "dart", count: 6, formation: "column" },
      { at: 1080, kind: "turret", count: 2, formation: "line" },
      { at: 1140, kind: "drone", count: 6, formation: "line" },
      { at: 1500, kind: "turret", count: 3, formation: "line" },
    ],
  },
  {
    name: "Lancer Gate",
    subtitle: "Crossfire",
    length: 1920,
    waves: [
      { at: 60, kind: "lancer", count: 4, formation: "pincer" },
      { at: 360, kind: "dart", count: 6, formation: "vee" },
      { at: 600, kind: "lancer", count: 6, formation: "pincer" },
      { at: 780, kind: "turret", count: 2, formation: "line" },
      { at: 1140, kind: "lancer", count: 6, formation: "pincer" },
      { at: 1260, kind: "drone", count: 8, formation: "vee" },
      { at: 1560, kind: "dart", count: 8, formation: "line" },
    ],
  },
  {
    name: "Last Approach",
    subtitle: "Everything they have",
    length: 2040,
    waves: [
      { at: 60, kind: "turret", count: 3, formation: "line" },
      { at: 180, kind: "lancer", count: 6, formation: "pincer" },
      { at: 540, kind: "dart", count: 6, formation: "column", x: 120 },
      { at: 540, kind: "dart", count: 6, formation: "column", x: 360 },
      { at: 900, kind: "drone", count: 9, formation: "vee" },
      { at: 1020, kind: "turret", count: 2, formation: "line" },
      { at: 1320, kind: "lancer", count: 8, formation: "pincer" },
      { at: 1560, kind: "dart", count: 8, formation: "vee" },
    ],
  },
];
