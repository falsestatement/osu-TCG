import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './app/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
	"idle-wobble": {
	  "0%, 100%": {transform: "perspective(500px) rotateZ(-1deg) rotateX(2deg) rotateY(-2deg) translateY(0px)"},
	  "50%": {transform: "perspective(500px) rotateZ(1deg) rotateX(-2deg) rotateY(2deg) translateY(-5px)"},
	},
	"holo-idle-before": {
	  "0%, 100%": {backgroundPosition: "0% -140px, 0% -10px"},
	  "50%": {backgroundPosition: "0% -260px, 0% -50px"},
	},
	"holo-idle-after": {
	  "0%, 100%": {backgroundPosition: "0% -140px, 0% -90px"},
	  "50%": {backgroundPosition: "0% -260px, 0% -50px"},
	},
	"poly-idle": {
	  "0%, 100%": {backgroundPosition: "0%, -120px -98px"},
	  "50%": {backgroundPosition: "0%, -130px -112px"},
	},
      },
      animation: {
	"idle-wobble": "idle-wobble 3s ease-in-out infinite",
	"holo-idle-before": "holo-idle-before 3s ease-in-out infinite",
	"holo-idle-after": "holo-idle-after 3s ease-in-out infinite",
	"poly-idle": "poly-idle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
