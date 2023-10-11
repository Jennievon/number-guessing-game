module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(359deg)",
          },
        },
      },
      animation: {
        rotate: "rotate 2s linear infinite",
      },
      fontFamily: {
        moon: ['"Moon Dance"', "sans-serif"],
        display: ['"DM Sans"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      screens: {
        xs: "350px",
      },
      inset: {
        70: "70px",
      },
      width: {
        375: "375px",
      },
      maxWidth: {
        240: "240px",
        350: "300px",
        modal: "375px",
      },
      minWidth: {
        240: "240px",
        350: "300px",
        modal: "375px",
      },
      fontSize: {
        8: "8px",
        10: "10px",
        12: "12px",
        13: "13px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        30: "30px",
        40: "40px",
      },
      borderRadius: {
        20: "20px",
      },
      colors: {
        brand:
          "linear-gradient(90deg, rgba(133,255,196,1) 0%, rgba(0,212,255,1) 100%)",
        dark: "#131118",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
