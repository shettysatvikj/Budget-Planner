export const applyTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
    return true;
  }
  document.documentElement.classList.remove("dark");
  return false;
};

export const toggleTheme = (isDark) => {
  const newState = !isDark;

  if (newState) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  return newState;
};
