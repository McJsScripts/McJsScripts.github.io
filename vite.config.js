import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 3000,
	},
	esbuild: {
		supported: {
			"top-level-await": true
		}
	}
});
