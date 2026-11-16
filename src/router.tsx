import { useCallback, useEffect, useMemo, useState } from "react";

/** المسار الحالي من الهاش، لأن التطبيق يُخدَم كملفٍ ثابتٍ واحد */
function currentPath(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.length > 0 ? hash : "/";
}

export function navigate(path: string, options?: { replace?: boolean }): void {
  const next = `#${path.startsWith("/") ? path : `/${path}`}`;
  if (window.location.hash === next) return;
  if (options?.replace) window.history.replaceState(null, "", next);
  else window.location.hash = next;
}

export interface RouteState {
  path: string;
  query: URLSearchParams;
  fullPath: string;
}

export function useRoute(): RouteState {
  const [fullPath, setFullPath] = useState<string>(() => currentPath());

  useEffect(() => {
    const onChange = () => {
      setFullPath(currentPath());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const [path, search] = useMemo(() => {
    const idx = fullPath.indexOf("?");
    return idx >= 0 ? [fullPath.slice(0, idx), fullPath.slice(idx + 1)] : [fullPath, ""];
  }, [fullPath]);

  return useMemo(
    () => ({ path, query: new URLSearchParams(search), fullPath }),
    [path, search, fullPath],
  );
}

/** رابط داخلي يدعم RTL ويعمل بلا تمريرٍ أفقي */
export function useLinkHandler() {
  return useCallback((path: string) => navigate(path), []);
}
