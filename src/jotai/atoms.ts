import { atom } from "jotai";

export const historyAtom = atom<string[]>([]);
export const directionAtom = atom<"forward" | "backward" | null>(null);
