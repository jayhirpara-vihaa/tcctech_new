module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["hover:text-[#dbb961]"],
  // darkMode: false,
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1500px",
      "3xl": "1780px",
    },
    extend: {
      colors: {
        headerBackgroundColor: "white", // Change This for Header background Color
        footerColor: "#202E4A", // Change This for Footer background Color
        megaMenuColor: "white", // Change This for Mega Color
        headerTextColor: "black", // Change This for Header Primary text Color
        headerSecondaryTextColor: "#DBB961", // Change This for Header Secondary text Color
        secondaryColor: "#DBB961",
        mobileNavigationIconColor: "black", // Change This for Mobile Navigation Icon
        primary: "#FBF1E9",
        TCCprimary: "#E58A1F",
        body: "#5A5A5A",
        heading: "#ffac38",
        input: "#1D1E1F",
        textColor: "#1D1E1F",
        black: "#000",
        white: "#fff",
        linen: "#FBF1E9",
        linenSecondary: "#ECE7E3",
        olive: "#3D9970",
        maroon: "#B03060",
        brown: "#C7844B",
        placeholder: "#707070",
        borderBottom: "#ffac38",
        facebook: "#4267B2",
        facebookHover: "#395fad",
        google: "#4285F4",
        googleHover: "#307bf9",
        buttonColor: "#ffac38",
        buttonHoverColor: "#DB901F",
        PinkProduct: "#CA0F58",
        BlackProduct: "#000000",
        // webSecondaryColor: "#080808",

        gray: {
          50: "#FBFBFB",
          100: "#F1F1F1",
          150: "#F4F4F4",
          200: "#F9F9F9",
          300: "#E6E6E6",
          350: "#E9ECEF",
          400: "#999999",
          500: "#D8D8D8",
          600: "#3A3A3A",
          700: "#292929",
          800: "#707070",
          900: "#343D48",
        },
      },
      fontSize: {
        "10px": ".625rem",
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      spacing: {
        "430px": "430px",
        "450px": "450px",
        "500px": "500px",
        "64vh": "64vh",
      },
      minHeight: {
        "50px": "50px",
      },
      scale: {
        80: "0.8",
        85: "0.85",
        300: "3",
        400: "4",
      },
      animation: {
        shine: "shine 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
      backgroundImage: {
        "app-pattern": "url('/assets/images/app-pattern.png')",
        "hero-pattern": "url('/assets/TCCimage/About_BG.png')",
      },
    },
    boxShadow: {
      cart: "0 3px 6px rgba(0,0,0,0.12)",
      product: "0 6px 12px rgba(0,0,0,.08)",
      listProduct: "0 2px 4px rgba(0,0,0,.08)",
      navigation: "0 3px 6px rgba(0, 0, 0, 0.16)",
      navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
      header: "0 2px 3px rgba(0, 0, 0, 0.08)",
      vendorCard: "1px 1px 4px rgba(0, 0, 0, 0.12)",
      vendorCardHover: "0 6px 18px rgba(0, 0, 0, 0.12)",
      subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
      bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
      cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
      avatar: "0px 15px 30px rgba(0, 0, 0, 0.16)",
    },
    fontFamily: {
      feijoa: ['feijoa'],
      body: ["'Open Sans', sans-serif"],
      satisfy: ["'Satisfy', cursive"],
      segoe: ["'Segoe UI', sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwindcss-rtl"),
  ],
};
