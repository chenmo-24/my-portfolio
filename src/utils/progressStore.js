const STORAGE_KEY = "chenmo-portfolio-progress-v1";
const PROGRESS_EVENT = "chenmo-progress-change";

const DEFAULT_PROGRESS = {
  version: 1,
  achievements: [],
  quests: [],
  viewedCases: [],
  arena: {},
  debugCases: [],
  interactions: {},
  recent: [],
};

let memoryProgress = { ...DEFAULT_PROGRESS };

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function normalizeProgress(value) {
  if (!value || value.version !== 1) return { ...DEFAULT_PROGRESS };

  return {
    ...DEFAULT_PROGRESS,
    ...value,
    achievements: Array.isArray(value.achievements) ? value.achievements : [],
    quests: Array.isArray(value.quests) ? value.quests : [],
    viewedCases: Array.isArray(value.viewedCases) ? value.viewedCases : [],
    arena: value.arena && typeof value.arena === "object" ? value.arena : {},
    debugCases: Array.isArray(value.debugCases) ? value.debugCases : [],
    interactions: value.interactions && typeof value.interactions === "object" ? value.interactions : {},
    recent: Array.isArray(value.recent) ? value.recent.slice(0, 8) : [],
  };
}

export function getProgress() {
  if (!canUseStorage()) return normalizeProgress(memoryProgress);

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeProgress(memoryProgress);

    const parsed = JSON.parse(raw);
    memoryProgress = normalizeProgress(parsed);
    return memoryProgress;
  } catch {
    return normalizeProgress(memoryProgress);
  }
}

function emitProgressChange(progress) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: progress }));
}

export function saveProgress(updater) {
  const current = getProgress();
  const next = normalizeProgress(typeof updater === "function" ? updater(current) : updater);
  memoryProgress = next;

  if (canUseStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep memory fallback; UI should not crash when storage is blocked.
    }
  }

  emitProgressChange(next);
  return next;
}

function uniqueAppend(list, id) {
  return list.includes(id) ? list : [...list, id];
}

function recentEntry(type, id) {
  return { type, id, at: new Date().toISOString() };
}

export function unlockAchievement(id) {
  return saveProgress((progress) => {
    if (progress.achievements.includes(id)) return progress;
    return {
      ...progress,
      achievements: [...progress.achievements, id],
      recent: [recentEntry("achievement", id), ...progress.recent].slice(0, 8),
    };
  });
}

export function completeQuest(id) {
  return saveProgress((progress) => ({
    ...progress,
    quests: uniqueAppend(progress.quests, id),
    recent: progress.quests.includes(id)
      ? progress.recent
      : [recentEntry("quest", id), ...progress.recent].slice(0, 8),
  }));
}

export function viewCase(id) {
  return saveProgress((progress) => ({
    ...progress,
    viewedCases: uniqueAppend(progress.viewedCases, id),
  }));
}

export function completeDebugCase(id) {
  return saveProgress((progress) => ({
    ...progress,
    debugCases: uniqueAppend(progress.debugCases, id),
    recent: progress.debugCases.includes(id)
      ? progress.recent
      : [recentEntry("debug", id), ...progress.recent].slice(0, 8),
  }));
}

export function recordArenaResult(id, result) {
  return saveProgress((progress) => {
    const previous = progress.arena[id];
    const bestScore = Math.max(previous?.bestScore ?? 0, result.score ?? 0);
    return {
      ...progress,
      arena: {
        ...progress.arena,
        [id]: {
          attempts: (previous?.attempts ?? 0) + 1,
          bestScore,
          last: result,
        },
      },
      recent: [recentEntry("arena", id), ...progress.recent].slice(0, 8),
    };
  });
}

export function recordInteraction(id) {
  return saveProgress((progress) => ({
    ...progress,
    interactions: {
      ...progress.interactions,
      [id]: (progress.interactions[id] ?? 0) + 1,
    },
  }));
}

export function resetProgress() {
  return saveProgress({ ...DEFAULT_PROGRESS });
}

export function subscribeProgress(listener) {
  if (typeof window === "undefined") return () => {};

  const handler = (event) => listener(event.detail ?? getProgress());
  window.addEventListener(PROGRESS_EVENT, handler);
  return () => window.removeEventListener(PROGRESS_EVENT, handler);
}
