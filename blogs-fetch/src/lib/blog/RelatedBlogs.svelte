<script>
	import BlogCard from '$lib/blog/BlogCardTest.svelte';

	
	export let sport;
	export let category;
	export let length;
	export let title;
	let filteredBlogs = [];

	async function load() {
		const blogsFetch = await fetch(`http://localhost:5173/api/${sport.toLowerCase().replace(' ', '-')}.json`);
		const blogs = await blogsFetch.json();
		console.log('Blogs: ', blogs);
		const blog = blogs.data.articles.filter((e) => e.categories.filter((blogCategory) => blogCategory['article_category_id']['title'] === category));
		filteredBlogs = blog.slice(0, length);
		console.log('filtered: ', filteredBlogs);
	}

	load();
	//export let blogs;
</script>

<div class="related-blogs-box" class:limited={length}>
	<h3 class="headline md">{title}</h3>
	<div class="content">
		{#each filteredBlogs as metadata}
			<BlogCard blog={metadata} featured="true" sport={sport} />
		{/each}
	</div>
</div>

<style>
	.related-blogs-box {
		padding-top: 6rem;
		padding-bottom: 2rem;
		margin-top: 6rem;

		border-top: 0.1rem solid var(--light-gray-color);
	}

	.related-blogs-box .content {
		display: flex;
		flex-direction: column;
		grid-gap: 1.2rem;

		padding-bottom: 2rem;

		position: relative;

		overflow: auto;
	}

	.related-blogs-box.limited .content:after {
		display: none;
	}

	:global(.related-blogs-box.limited .blog-card) {
		min-width: auto;
	}

	.related-blogs-box .content:after {
		position: sticky;
		right: 0;
		top: 0;

		content: '';

		min-width: 9rem;
		min-height: 100%;

		background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));

		z-index: 9;
	}

	@media screen and (min-width: 768px) {
		.related-blogs-box .content {
			flex-direction: row;
		}

		:global(.related-blogs-box.limited .blog-card) {
			width: calc((100% - 3.6rem) / 4);
		}
	}
</style>
