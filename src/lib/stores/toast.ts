import { writable } from "svelte/store";

export interface ToastData {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export const toasts = writable<ToastData[]>([]);

export function addToast(toast: Omit<ToastData, "id">) {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast: ToastData = {
    id,
    duration: 3000,
    ...toast,
  };

  toasts.update((all) => [newToast, ...all]);

  setTimeout(() => {
    removeToast(id);
  }, newToast.duration);

  return id;
}

export function removeToast(id: string) {
  toasts.update((all) => all.filter((toast) => toast.id !== id));
}

export function clearToasts() {
  toasts.set([]);
}
