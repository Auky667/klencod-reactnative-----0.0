import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeMode } from "@/types";

const THEME_KEY = "tarmim:theme";
const FAVORITES_KEY = "tarmim:favorites";

export interface ToastMessage {
  id: number;
  text: string;
  tone: "success" | "error" | "info";
}

interface AppContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (id: string, title: string) => void;
  isFavorite: (id: string) => boolean;
  favoritesCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toasts: ToastMessage[];
  notify: (text: string, tone?: ToastMessage["tone"]) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function readTheme(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : "dark";
  } catch {
    return "dark";
  }
}

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => readTheme());
  const [favorites, setFavorites] = useState<string[]>(() => readFavorites());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // تطبيق الثيم على الجذر
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* تجاهل عند تعطيل التخزين */
    }
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      /* تجاهل */
    }
  }, [favorites]);

  const notify = useCallback((text: string, tone: ToastMessage["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, text, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    (id: string, title: string) => {
      setFavorites((prev) => {
        const exists = prev.includes(id);
        notify(
          exists ? `أُزيل «${title}» من المفضلة` : `أُضيف «${title}» إلى المفضلة`,
          exists ? "info" : "success",
        );
        return exists ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [notify],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme,
      favorites,
      toggleFavorite,
      isFavorite,
      favoritesCount: favorites.length,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      toasts,
      notify,
    }),
    [theme, toggleTheme, favorites, toggleFavorite, isFavorite, drawerOpen, toasts, notify],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
