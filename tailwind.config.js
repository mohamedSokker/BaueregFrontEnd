module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      colors: {
        logoColor: "rgb(0,74,128)",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
        "logo-color": "rgb(0,74,128)",
        "background-logoColor": "#022D4E",
        // "background-logoColor": "rgba(0, 0, 0, 0.5)",
        "logo-secColor": "#FD8813",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
        logoColor: "rgb(0,74,128)",
      },
      width: {
        370: "370px",
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
        "50%": "50%",
        "90%": "90%",
        "100%": "100%",
      },
      height: {
        80: "80px",
        200: "200px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
        "5%": "5%",
        "10%": "10%",
        "20%": "20%",
        "70%": "70%",
        "100%": "100%",
      },
      flex: {
        0.7: "0.7 1 0%",
      },
      minHeight: {
        30: "30px",
        40: "40px",
        50: "50px",
        590: "590px",
      },
      minWidth: {
        370: "370px",
      },
      keyframes: {
        "slide-in-tr": {
          "0%": {
            marginLeft: "0",
            // "-webkit-transform": "translateX(-288px)",
            // transform: "translateX(-288px)",
          },
          "100%": {
            marginLeft: "288px",
            // "-webkit-transform": "translateX(0px)",
            // transform: "translateX(0px)",
          },
        },

        // "slide-in": {
        //   "0%": {
        //     width: "0",
        //     // "-webkit-transform": "translateX(-288px)",
        //     // transform: "translateX(-288px)",
        //   },
        //   "100%": {
        //     width: "288px",
        //     // "-webkit-transform": "translateX(0px)",
        //     // transform: "translateX(0px)",
        //   },
        // },
        "slide-in": {
          "0%": {
            // width: "0",
            "-webkit-transform": "translateX(50%)",
            transform: "translateX(50%)",
          },
          "100%": {
            // width: "288px",
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },

        "slide-out-tr": {
          "0%": {
            marginLeft: "0",
            // "-webkit-transform": "translateX(0px)",
            // transform: "translateX(0px)",
          },
          "100%": {
            marginLeft: "-288px",
            // "-webkit-transform": "translateX(-288px)",
            // transform: "translateX(-288px)",
          },
        },

        "slide-out": {
          "0%": {
            width: "288px",
            // "-webkit-transform": "translateX(0px)",
            // transform: "translateX(0px)",
          },
          "100%": {
            width: "0",
            // "-webkit-transform": "translateX(-288px)",
            // transform: "translateX(-288px)",
          },
        },

        "slide-fwd": {
          "0%": {
            "-webkit-transform": "translateZ(0px)",
            transform: "translateZ(0px)",
          },
          "100%": {
            "-webkit-transform": "translateZ(160px)",
            transform: "translateZ(160px)",
          },
        },
        "toggle-right": {
          "0%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
          "100%": {
            "-webkit-transform": "translateX(12px)",
            transform: "translateX(12px)",
          },
        },

        "in-out": {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
      },
      animation: {
        "in-out": "in-out 5s ease-in-out",
        "slide-in-tr": "slide-in-tr 0.5 ease-in-out",
        "slide-in": "slide-in 0.5s ease-in-out",
        "slide-out": "slide-out 0.5s ease-in-out",
        "slide-out-tr": "slide-out-tr 0.5s ease-in-out",
        "slide-fwd":
          " slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "toggle-right": "toggle-right 0.5s ease-in-out",
      },
      transitionProperty: {
        height: "height",
      },
      backgroundImage: {
        // "hero-pattern": "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
        "hero-pattern":
          "url('https://static.vecteezy.com/system/resources/previews/014/433/221/original/online-income-happy-businessman-earning-money-confident-businessman-showing-how-work-online-holding-money-and-laptop-illustration-png.png')",
      },
    },
  },
  plugins: [],
};
