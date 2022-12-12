<script context="module">
	export async function load({ params }) {
		const blogsFetch = await fetch('http://localhost:5173/api/soccer.json');
		const blogs = await blogsFetch.json();
		const blog = blogs.data.articles.filter((e) => e.slug === params.slug);

		return {
			props: { blog }
		};
	}
</script>

<script>
	export const prerender = true;

	console.time('blogsFetch');
	export let blog;
	console.log(blog);
	console.timeEnd('blogsFetch');

	// import snarkdown from 'snarkdown';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { premiumUser } from '../../../stores/premiumPaywall';
	import NewsletterForm from '$lib/shared/NewsletterForm.svelte';
	import BlogLayout from '$lib/blog/layouts/blogTest.svelte';
	import VideoLayout from '$lib/blog/layouts/webinarTest.svelte';

	let initialized = false;

	blog = blog[0];
	
	let title = blog.title;
	let featured_image = blog['hero_image']['filename_disk'];
	let meta_description = blog['meta_description'];
	let author = '';
	if (blog['authors'].length < 1) {
		author = 'Blayze Newsletter';
	} else {
		author = blog['authors'][0]['author_id']['full_name'];
	}
	let date = blog['updated_at'];
	let sport = blog['sports'][0]['sport_id']['name'];
	let isPremium = blog['is_premium'];
	let category = blog['categories'];
	let excerpt = blog['excerpt'];
	let authorSlug = author.replace(/\s+/g, '-').toLowerCase();
	if (Array.isArray(category) && category.length > 1) {
		category = category[0];
	}
	let slug = blog['slug'];
	let isVideoType = false;

	if (blog['video_playlist_id'] != null && blog['video_playlist_id'].title.length > 0) {
		isVideoType = true;
	}

	onMount(() => {
		setVideoLinks();
		checkSccaTag();

		initialized = true;
	});

	onDestroy(() => {
		if (initialized) {
			document.getElementsByTagName('header')[0].classList.remove('scrolled');
		}
	});

	import Hls from 'hls.js';

	function setVideoLinks() {
		let instances = document.querySelectorAll('.mux-video');
		var hslSource = null;

		instances.forEach((instance) => {
			var source = instance.querySelector('source');

			if (source.src.indexOf('.m3u8') > -1) {
				hslSource = source.src;
			}

			if (hslSource !== null && Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource(hslSource);
				hls.attachMedia(instance);
				hls.on(Hls.Events.MANIFEST_PARSED, function () {
				});
			}
		});
	}

	function checkSccaTag() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		// if (isPremium && !$premiumUser && tag === 'scca' && params.wherefrom && params.wherefrom === 'sccasupertourmember') {
		// 	// comingFromSCCA = true;
		// 	plusDialogRevealed = false;
		// }
	}

	
	let newsletterID = 17;

	// let hasTwitterEmbed = blogData;
	// let hasTiktokEmbed = blogData;

	let blogContent;
	let plusDialogRevealed = false;

	// if (isPremium && !$premiumUser && !$page.url.search.includes('premium=true')) {
	// 	plusDialogRevealed = true;
	// }

	import '../../../css/blog.css';
</script>

<svelte:head>
	<title>{blog.title} | Blayze</title>
	<meta name="description" content={`${blog.meta_description}`} />
	<meta property="og:image" content={`https://blayze.io/assets${blog.featured_image}`} />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</svelte:head>

<section>
	<div class="container">
		{#if isVideoType}
		<VideoLayout blog={blog} />
		{:else}
		<BlogLayout blog={blog} newsletterID={newsletterID} />
		{/if}
	</div>
</section>

<NewsletterForm />

<style>
</style>