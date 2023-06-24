/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: "#122849",
				secondary: "#19355E",
				tertiary: "#27497A",

				background: "rgb(15 23 42)",
				gray: "rgb(214 211 209)",
			},
		},
		fontFamily: {
			sans: "Inter, sans-serif",
		},
	},
	plugins: [],
};
