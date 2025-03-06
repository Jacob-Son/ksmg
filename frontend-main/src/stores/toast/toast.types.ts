export enum ToastPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface IToastStore {
  message: string;
  options: {
    position: ToastPosition;
    speed: number;
    duration: number;
  };
  toastOpen: boolean;
  showToast: (message: string, options?: { position: ToastPosition }) => void;
  closeToast: () => void;
}
