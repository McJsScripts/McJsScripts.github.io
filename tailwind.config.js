/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: "#81E6C6",
				secondary: "#C681E6",
				tertiary: "#E6C681",

				background: "#0E1A16",
				background_lighter: "#171f1c",
				card: "#1c2623",
			},
		},
	},
	plugins: [],
};
