import { create } from 'zustand';

type AudioQuality = 'Low' | 'Medium' | 'High';

interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
  audioQuality: AudioQuality;

  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  setAudioQuality: (quality: AudioQuality) => void;
  logout: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  darkMode: false,
  notifications: true,
  audioQuality: 'High',

  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),

  toggleNotifications: () =>
    set((state) => ({ notifications: !state.notifications })),

  setAudioQuality: (quality) =>
    set({ audioQuality: quality }),

  logout: () => {
    console.log('Logged out');
  },
}));
