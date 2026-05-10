import localFont from "next/font/local";

export const SnigletFont = localFont({
  src: [
    {
      path: "../public/fonts/Sniglet-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-sniglet",
});
