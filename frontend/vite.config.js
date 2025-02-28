import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	build: {
		outDir: 'dist', // Ensure the build output is in the 'dist' folder
		emptyOutDir: true, // Clear the output directory before building
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
})
