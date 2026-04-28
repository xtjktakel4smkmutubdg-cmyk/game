import { create } from 'zustand';

interface PlayerState {
  id: string;
  name: string;
  position: [number, number, number];
  health: number;
  mana: number;
  setHealth: (health: number) => void;
  setPosition: (position: [number, number, number]) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  id: 'local-player',
  name: 'Hero',
  position: [0, 0, 0],
  health: 100,
  mana: 100,
  setHealth: (health) => set({ health }),
  setPosition: (position) => set({ position }),
}));

interface ChatState {
    messages: {sender: string, text: string}[];
    addMessage: (sender: string, text: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    addMessage: (sender, text) => set((state) => ({ messages: [...state.messages, {sender, text}] })),
}));
