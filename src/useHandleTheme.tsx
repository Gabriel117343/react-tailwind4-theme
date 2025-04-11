import { useState, useEffect, useRef } from "react";

type Theme = "light" | "dark";
type OriginTheme = "system" | "user-defined";

export const useHandleTheme = () => {

  const originRef = useRef<OriginTheme | "none">("none");
  const actualSystemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  // will only execute once when the component mounts
  const defaultValue = () => {
    // Attempt to get the theme from local storage
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    console.log(
      "🌒Búscando el tema del local storage...",
      `Tema: ${storedTheme ?? "No definido"}`
    );
    if (storedTheme === "dark" || storedTheme === "light") {
      originRef.current = "user-defined";
      return storedTheme;
    }
    const defaultTheme = actualSystemTheme.matches ? "dark" : "light";
    originRef.current = "system";
    return defaultTheme;
    // Note: it's better to handle a listener event for system theme changes, in case the user changes it while on the page
  };
  const [theme, setTheme] = useState<Theme | "none">(defaultValue);

  actualSystemTheme.addEventListener("change", (e) => {
    // only if the theme hasn't been defined by the user
    if (originRef.current === "user-defined") return;
    const sistemTheme: Theme = e.matches ? "dark" : "light";
    originRef.current = "system";
    setTheme(sistemTheme);
  });

  useEffect(() => {
    document.documentElement.setAttribute("origin-theme", originRef.current);
    document.documentElement.setAttribute("data-theme", theme);
    // once the user's theme is ensured, the system theme will no longer be used
    localStorage.setItem("theme", theme);
    // Clean up the listener event when the component unmounts
    return () => {
      actualSystemTheme.removeEventListener("change", () => {});
    };
  }, [theme, actualSystemTheme]);
  const handleChangeTheme = () => {
    originRef.current = "user-defined";
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, onChangeTheme: handleChangeTheme, origin: originRef.current };
};