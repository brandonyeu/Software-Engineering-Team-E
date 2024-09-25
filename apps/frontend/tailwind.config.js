/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    darkMode: ["class"],
    content: [
        "./index.html",
        "./routes/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                kiosk: "var(--kiosk)",
                primary: {
                    DEFAULT: "var(--primary)",
                    element: "var(--primary-element)",
                    foreground: "var(--primary-foreground)",
                },
                button: {
                    DEFAULT: "var(--button)",
                    hover: "var(--button-hover)",
                    secondary: "var(--button-secondary)",
                    secondaryHover: "var(--button-secondary-hover)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    element: "var(--secondary-element)",
                    foreground: "var(--secondary-foreground)",
                },
                tertiary: {
                    DEFAULT: "var(--tertiary)",
                    element: "var(--tertiary-element)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    highlight: "var(--destructive-hover)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            maxHeight: {
              'custom': '425px', // Define your custom max height value
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("tailwind-scrollbar")({ nocompatible: true }),
    ],
};


