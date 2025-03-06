import { color } from './colors';

export const gradient = {
  background: {
    note: {
      editing: `linear-gradient(90deg, ${color.background.note.editing} 0%, ${color.background.note.editing} calc(50% - 1px), ${color.background.note.stroke} calc(50% - 1px), ${color.background.note.stroke} calc(50% + 1px), ${color.background.note.editing} calc(50% + 1px))`,
    },
  },
};
