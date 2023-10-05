import { atom } from "jotai";

export const history = atom<string[]>([]);
export const directionAtom = atom<"forward" | "backward" | null>(null);
