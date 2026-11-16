import { useApp } from "@/context/AppContext";

/** خطاف مختصر للثيم، يُستخدم في المكونات البسيطة */
export function useTheme() {
  const { theme, toggleTheme } = useApp();
  return { theme, toggleTheme, isDark: theme === "dark" };
}
