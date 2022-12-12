import path from 'path';
import { fileURLToPath } from 'url';
const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = {
	extensions: [".svelte.md", ".md", ".svx"],

	smartypants: {
		dashes: "oldschool",
	},

	remarkPlugins: [],
	rehypePlugins: [],

	layout: {
		blog: path.join(dirname, './src/lib/blog/layouts/_blog.svelte'),
		video: path.join(dirname, './src/lib/blog/layouts/_webinar.svelte')
	}
};

export default config;
