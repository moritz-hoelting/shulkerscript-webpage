import { createTheme } from "@mui/material/styles";

export function customTheme(mode: "light" | "dark") {
    return createTheme({
        palette: {
            mode,
            primary: {
                light: "#a700c3",
                main: "#a700c3",
                dark: "#a700c3",
                contrastText: "#fff",
            },
            secondary: {
                light: "#ff7961",
                main: "#f44336",
                dark: "#ba000d",
                contrastText: "#000",
            },
        },
        typography: {
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
        },
    });
}
