import { atom } from "jotai";

export const storyAtom = atom<string[]>([]);
export const directionAtom = atom<"forward" | "backward" | null>(null);
