import localFont from "next/font/local";

export const Avenir = localFont({
  src: [
    {
      path: "./AvenirLTStd-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AvenirLTStd-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./AvenirLTStd-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./AvenirLTStd-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});
