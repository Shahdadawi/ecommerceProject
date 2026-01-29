import { createTheme } from "@mui/material";

const getTheme = (mode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        main: "#445b8f",
        dark: "#364a78",
        light: "#6c7ae0",
      },

      secondary: {
        main: "#ff8a00",
      },

      background: {
        default: isDark ? "#0f172a" : "#f5f7fb",
        paper: isDark ? "#020617" : "#ffffff",
      },

      text: {
        primary: isDark ? "#e5e7eb" : "#1f2d5e",
        secondary: isDark ? "#94a3b8" : "#6b7280",
      },

      divider: isDark ? "#1e293b" : "#e5e7eb",

      success: {
        main: "#22c55e",
      },

      error: {
        main: "#ef4444",
      },

      warning: {
        main: "#f59e0b",
      },
    },

    shape: {
      borderRadius: 8,
    },

    typography: {
      fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,

      h4: {
        fontWeight: 800,
      },

      h5: {
        fontWeight: 700,
      },

      button: {
        fontWeight: 700,
        textTransform: "none",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            paddingInline: 20,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${isDark ? "#1e293b" : "#e5e7eb"}`,
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#1e293b" : "#e5e7eb",
          },
        },
      },
    },
  });
};

export default getTheme;
