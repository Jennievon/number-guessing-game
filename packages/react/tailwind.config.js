module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', "sans-serif"],
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
      height: {
        "no-header": "calc(100vh - 70px)",
        "80vh": "80vh",
        modal: "634px",
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};