export type DifficultyLevel = "unrated" | "easy" | "medium" | "hard";

export function getDifficultyTag(average: number | null | undefined) {
  if (average == null || Number.isNaN(Number(average))) {
    return { level: "unrated" as DifficultyLevel, label: "Unrated" };
  }

  const value = Number(average);
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1);

  if (value <= 2.25) {
    return { level: "easy" as DifficultyLevel, label: `Easy · ${rounded}` };
  }
  if (value <= 3.5) {
    return { level: "medium" as DifficultyLevel, label: `Medium · ${rounded}` };
  }
  return { level: "hard" as DifficultyLevel, label: `Hard · ${rounded}` };
}
