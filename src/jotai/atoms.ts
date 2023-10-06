import { atom } from "jotai";

export const nextIdsAtom = atom<string[]>([]);
export const directionAtom = atom<"forward" | "backward" | null>(null);
