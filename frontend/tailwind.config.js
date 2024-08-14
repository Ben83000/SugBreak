/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    boxShadow: {
      "custom-light": "0 5px 10px rgba(0, 0, 0, 0.12)",
      "custom-dark": "0px 8px 15px rgba(0, 0, 0, 0.25)",
      "custom-inner": "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
      "custom-admin": "4px -6px 10px rgba(0, 0, 0, 0.12)",
      "custom-lg":
        "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
      "deep-shadow":
        "0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.2)",
      "hard-edge":
        "0 2px 4px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    gridTemplateColumns: {
      sheet: "1fr 3fr",
      cartContent: "1fr 2fr 1fr",
      orderContent: "4fr 9fr 1fr"
    },
    fontFamily: {
      carter: "Carter One",
      lato: "Lato",
      indie: "Indie Flower",
      rancho: "Rancho",
    },
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
      xxl: "3rem",
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
    screens: {
        xs: '380px',  // Ajoute un point de rupture `xs` pour les écrans de 380px et plus
      },
  },
};

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindcssAnimate from "tailwindcss-animate";
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  plugins: [tailwindcss, autoprefixer, tailwindcssAnimate, scrollbarHide],
};
