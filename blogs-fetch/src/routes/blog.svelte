<script context="module">
	const allPosts = import.meta.glob('./blog/*/*.md');
	let body = [];
	for (let path in allPosts) {
		body.push(
			allPosts[path]().then(({ metadata }) => {
				return metadata;
			})
		);
	}

	export const load = async () => {
		const blogs = await Promise.all(body);

		return {
			props: { blogs }
		};
	};
</script>

<script>
	import { initLogRocket } from '$lib/shared/LogRocket.svelte';
	initLogRocket();

	import HeroSection from '$lib/blog/Hero.svelte';
	import SportSelection from '$lib/blog/SportSelection.svelte';
	import BlogGrid from '$lib/blog/BlogGrid.svelte';

	import { sportSelection } from '../stores/sports';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	

	onMount(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		console.log( params.lp )

		if ($sportSelection && params.lp && params.lp.length > 1) {
			goto(`blog/${$sportSelection.toLowerCase().replace(' ', '-')}`);
		}
		// logImportantCookies();
	});

	export let blogs;

	let notInitialized = true;

	let searchTerm = '';
</script>

<svelte:head>
	<title>Blayze Blog: Learn From The Best Coaches In Sports</title>
	<meta
		name="description"
		content="The Blayze blog is the leading source of information on how to dramatically improve as an athlete. Learn to improve your techniques and game play through detailed science backed articles from Blayze coaches."
	/>
	<meta property="og:image" content="https://blayze.io/assets/images/meta-image.jpg" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
	/>
</svelte:head>

<!-- <HeroSection /> -->

<SportSelection bind:value={searchTerm} />

<BlogGrid {blogs} {searchTerm} />
