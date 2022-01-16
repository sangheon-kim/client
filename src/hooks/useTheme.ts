import React from "react";

export function useTheme() {
  const [isDark, setDark] = React.useState(false);

  React.useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", theme);
    setDark(theme === "dark");
  }, []);

  const config = React.useMemo(() => ({ attributes: true }), []);

  const callback: MutationCallback = React.useCallback(function (
    mutations,
    observer
  ) {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        setDark(document.documentElement.getAttribute("data-theme") === "dark");
      }
    }
  },
  []);

  React.useEffect(() => {
    const observer = new MutationObserver(callback);

    observer.observe(document.documentElement, config);

    return () => {
      observer.disconnect();
    };
  }, [callback, config]);
  const ThemeChange = React.useCallback(() => {
    const theme = isDark ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return {
    isDark,
    ThemeChange,
  };
}
