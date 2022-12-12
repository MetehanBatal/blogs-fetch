<script context="module">
	export async function load() {
		const blogsFetch = await fetch('http://localhost:5173/api/car-racing.json');
		const blogs = await blogsFetch.json();

		return {
			props: { blogs }
		};
	}
</script>

<script>
	export const prerender = true;

	export let blogs;

	import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	Swiper.use([Navigation, Pagination, Autoplay]);

	import { sportSelection } from '../../../stores/sports';
	import { onMount } from 'svelte';

	import BlogCard from '$lib/blog/BlogCardTest.svelte';
	import SearchedBlogCard from '$lib/blog/SearchedBlogCard.svelte';
	import BlogSliderCard from '$lib/blog/BlogSliderCard.svelte';
	
	import NewsletterForm from '$lib/shared/NewsletterForm.svelte';
	import SportSelection from '$lib/blog/SportSelectionTest.svelte';
	import { initLogRocket } from '$lib/shared/LogRocket.svelte';
	
	let currentContentType = 'Articles';

	onMount(() => {
		initSlider();
		initializeCategories();
		// initLogRocket();
		// logImportantCookies();
	});
	
	let searchTerm = '';

	const dateFormattingOptions = { year: 'numeric', month: 'long', day: 'numeric' };
	let selectedCategories = [];

	let sortedBlogs = [
		{
			type: 'Articles',
			featuredBlogs: [],
			categories: [
				{
					category: 'Driving Techniques',
					blogs: []	
				},
				{
					category: 'Skills in 60',
					blogs: []	
				},
				{
					category: 'Newsletter',
					blogs: []	
				},
				{
					category: 'Racecraft',
					blogs: []	
				},
				{
					category: 'Data',
					blogs: []	
				},
				{
					category: 'Setup',
					blogs: []	
				},
				{
					category: 'Mental Training',
					blogs: []	
				},
				{
					category: 'Miscellaneous',
					blogs: []
				},
			]
		},
		{
			type: 'Guides',
			featuredBlogs: [],
			categories: [
				{
					category: 'Track Guides',
					blogs: []	
				},
				{
					category: 'Onboard Videos',
					blogs: []	
				},
				{
					category: 'North America',
					blogs: []	
				},
				{
					category: 'Europe',
					blogs: []	
				},
			]
		},
		{
			type: 'Lessons',
			featuredBlogs: [],
			categories: [
				{
					category: 'Courses',
					blogs: []
				},
				{
					category: 'Blayze+ Calls',
					blogs: []
				},
				{
					category: 'Webinars',
					blogs: []
				},
				{
					category: 'Driving Techniques',
					blogs: []
				},
				{
					category: 'Racecraft',
					blogs: []
				},
				{
					category: 'Setup',
					blogs: []
				},
				{
					category: 'Data',
					blogs: []
				},
				{
					category: 'Mental Training',
					blogs: []
				},
				{
					category: 'Miscellaneous',
					blogs: []
				}
			]
		}
	];

	let initialLoad = true;
	let allCategoriesSelected = true;
	blogs = blogs.data.articles;

	var sortedByDate = blogs.sort((blogOne, blogTwo) => new Date(blogTwo['updated_at']) - new Date(blogOne['updated_at']));
	console.log(sortedByDate);
	console.log(blogs);
	sortedByDate.forEach((blog) => {
		let contentType = blog['types'][0]['article_type_id']['title'];
		let categories = blog.categories;
		
		let matchingTypes = sortedBlogs.filter(
			(types) => types.type.toLowerCase() === contentType.toLowerCase()
		);
		if (blog['is_featured']) {
			console.log(blog);
			matchingTypes[0].featuredBlogs.push(blog);
		}
		categories.forEach((category) => {
			let categoryName = category['article_category_id'].title;
			let matchingCategory = matchingTypes[0].categories.filter(
				(section) => section.category.toLowerCase() === categoryName.toLowerCase()
			);

			if (matchingCategory[0]) {
				matchingCategory[0].blogs.push(blog);
			}
		});
	});

	function initializeCategories(button) {
		if (button === 'all') {
			initialLoad = true;
		}
		selectedCategories = [];
		sortedBlogs.forEach((type) => {
			if (type.type === currentContentType) {
				type.categories.forEach((category) => {
					if (category.blogs.length > 0) {
						selectedCategories.push(category.category.toLowerCase());
					}
				})
			}
		});
		allCategoriesSelected = true;
		selectedCategories = selectedCategories;

		document.querySelectorAll('.category.selectable').forEach(category => category.classList.remove('active'))
	}

	function selectSport(e) {
		let sportName = e.target.getAttribute('data-sport');
		$sportSelection = sportName;
	}

	function handleCategorySelection(e) {
		let selectedCategory = e.target;
		selectedCategory.classList.toggle('active');

		if (initialLoad) {
			selectedCategories = [];
			initialLoad = false;
		}
		const selectedIndex = selectedCategories.indexOf(selectedCategory.getAttribute('data-category'));
		if (selectedIndex > -1) {
			selectedCategories.splice(selectedIndex, 1);
		} else {
			selectedCategories.push(selectedCategory.getAttribute('data-category'));	
		}

		allCategoriesSelected = false;
		if (selectedCategories.length === 0 || selectedCategories.length === document.querySelectorAll('.category').length - 1) {
			initializeCategories();
			allCategoriesSelected = true;
		}

		selectedCategories = selectedCategories;
	}

	function handleTypeSelection(e) {
		currentContentType = e.target.getAttribute('data-type');
		currentContentType = currentContentType;

		allCategoriesSelected = false;
		initialLoad = true;
		initializeCategories();
		allCategoriesSelected = true;

		setTimeout(() => {
			// featuredSlider.update();
			featuredSlider.destroy();
			initSlider();
		}, 200)
	}

	var featuredSlider;

	function initSlider() {
		let options = {
			loop: true,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: true
			},
			navigation: {
				nextEl: '.slider-pagination-next',
				prevEl: '.slider-pagination-prev'
			}
		};

		featuredSlider = new Swiper('.hero-swiper', options);
	}

	function handleViewAll(e) {
		e.target.closest('.blogs-box').classList.toggle('view-all');
	}

	$: searchedBlogs = blogs.filter((blog) => {
		return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
	});
</script>

<svelte:head>
	<title>Blayze Car Racing | Articles</title>
	<meta name="description" content="Car racing coaching articles from the team at Blayze.  Find racing and driving tips perfect for HPDE, club racing, autocross, sim racing, or any type of racing." />
	<meta property="og:image" content="https://blayze.io/assets/images/meta-image.jpg" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
</svelte:head>

<SportSelection bind:value={searchTerm} selectedSport='Car Racing' />

{#if searchTerm.length > 0}
	<section class="container searched">
		<h2 class="headline text-center">Search Results: <span>“{searchTerm}”</span></h2>

		<div class="searched-blogs-grid">
			{#each searchedBlogs as metadata}
				<SearchedBlogCard blog={metadata} featured="false" sport='car racing' />
			{/each}
		</div>
	</section>
	{:else}
	<section class="container no-pt">
		<ul class="content-types">
		{#each sortedBlogs as types}
			<li class="content-type" class:active={currentContentType.toLowerCase() === types.type.toLowerCase()} data-type={types.type} on:click|self={e => handleTypeSelection(e)}>
				{types.type}
			</li>
		{/each}
		</ul>

		<div class="hero-swiper swiper">
			<div class="swiper-wrapper">
				{#each sortedBlogs as blogs}
				{#if blogs.type === currentContentType}
					{#each blogs.featuredBlogs as featuredBlog}

						<div class="featured-item swiper-slide">
							<img class="featured-img" src={`https://cms.blayze-cdn.io/${featuredBlog['hero_image']['filename_disk']}`} />

							<div class="featured-content">
								<p class="muted">
									{new Date(featuredBlog.updated_at).toLocaleDateString(undefined, dateFormattingOptions)}
								</p>

								<h2 class="featured-title">{featuredBlog.title}</h2>

								<div class="author-details">
									<img src={`/assets/images/coaches/${featuredBlog.authors[0]['author_id']['full_name'].replace(/\s+/g, '-').toLowerCase()}.png`} alt="Coach Thumbnail" class="coach-thumbnail"
									/>
									<div>
										<p><strong>{featuredBlog.authors[0]['author_id']['full_name']}</strong></p>
										
										<p class="muted capitalize">Car Racing</p>
									</div>
								</div>

								<div class="featured-bottom">
									<a href={`/blog/car-racing/${featuredBlog.slug}`}>
										<div class="cta-button">Read Article</div>
									</a>

									<div class="social-media-icons">
										<a target="_blank" href={`https://facebook.com/sharer/sharer.php?u=https://blayze.io/blog/car-racing/${featuredBlog.slug}/&quote=${featuredBlog.meta_description}`}>
											<img src="/assets/icons/facebook.svg" alt="Share on Facebook" />
										</a>
										<a target="_blank" href={`https://twitter.com/intent/tweet?url=https://blayze.io/blog/car-racing/${featuredBlog.slug}&text=${featuredBlog.meta_description}`}>
											<img src="/assets/icons/twitter.svg" alt="Share on Twitter" />
										</a>
										<a target="_blank" href={`https://www.pinterest.com/pin/create/button/?url=https://blayze.io/blog/car-racing/${featuredBlog.slug}/&media=https://blayze.io/assets${featuredBlog.featured_image}&description=${featuredBlog.meta_description}`}>
											<img src="/assets/icons/pinterest.svg" alt="Share on Pinteres" />
										</a>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
				{/each}
			</div>
			<div class="slider-navigation-holder">
				<div class="slider-pagination-buttons">
					<button data-role="prev" class="slider-pagination-prev">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17.67 3.8701L15.9 2.1001L6 12.0001L15.9 21.9001L17.67 20.1301L9.54 12.0001L17.67 3.8701Z" />
						</svg>
					</button>
					<button data-role="next" class="slider-pagination-next">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.22998 20.23L7.99998 22L18 12L7.99998 2L6.22998 3.77L14.46 12L6.22998 20.23Z" />
						</svg>
					</button>
				</div>

				<div class="swiper-pagination" />
			</div>
		</div>
	</section>

	<NewsletterForm />

	<section class="container pb">
		<div class="position-selection">
			<h2 class="headline">Car Racing {currentContentType.slice(0, -1).toLowerCase()} categories</h2>

			<ul class="categories">
				<li class="category" class:active={allCategoriesSelected} on:click={e => initializeCategories('all')}>All</li>
				{#each sortedBlogs as blogs}
				{#if blogs.type === currentContentType}
					{#each blogs.categories as category}
					<li class="category selectable" data-category={category.category.toLowerCase()} on:click={e => handleCategorySelection(e)}>
						{category.category}
					</li>
					{/each}
				{/if}
				{/each}
			</ul>
		</div>
	</section>

	<section class="section-blogs">
		{#each sortedBlogs as contentType}
			{#if contentType.type === currentContentType}
				{#each contentType.categories as {category, blogs}}
				{#if selectedCategories.includes(category.toLowerCase())}
				<div class="blogs-box container">
					<div class="headline-box">
						<h2 class="headline">{category}</h2>

						{#if blogs.length > 3}
						<div class="button-sm all" data-sport={category.toLowerCase()} on:click|self={(event) => handleViewAll(event)}>
							View All
						</div>
						<div class="button-sm less" data-sport={category.toLowerCase()} on:click|self={(event) => handleViewAll(event)}>
							View Less
						</div>
						{/if}
					</div>

					<div class="blog-grid">
						<div class="blogs filtered">
							{#each blogs as blog}
								<BlogCard blog={blog} featured="false" sport='car racing' />
							{/each}
						</div>

						<div class="view-all-blogs blogs">
							{#each blogs as blog}
								<BlogCard blog={blog} featured="false" sport='car racing' />
							{/each}
						</div>
					</div>
				</div>
				{/if}
				{/each}
			{/if}
		{/each}

		
	</section>
{/if}

	

<style>
	.section-blogs {
		display: flex;
		flex-direction: column;

		padding-bottom: 4rem;
	}

	:global(.section-blogs .banner) {
		order: 4;

		margin: 4rem 0;
	}

	.headline span {
		color: var(--gray-color);
	}

	.blogs-box {
		display: flex;
		flex-direction: column;
	}

	.blog-grid {
		display: grid;
		grid-template-columns: 1fr;

		grid-gap: 2.4rem;
	}

	.blogs-box div:first-child .headline-box {
		margin-top: 0;
	}

	.category {
		margin-bottom: 8rem;
	}

	.category:last-child {
		margin-bottom: 0;
	}

	:global(.category.selected .headline-box) {
		justify-content: center;
	}

	div[data-category='general articles'] {
		order: -1;
	}

	div[data-category='free articles'] {
		order: 0;
	}

	div[data-category='newsletter'] {
		order: 1;
	}

	div[data-category='track guides'] {
		order: 2;
	}

	div[data-category='blayze+ calls'] {
		order: 3;
	}

	div[data-category='webinars'] {
		order: 4;
	}

	div[data-category='courses'] {
		order: 5;
	}

	div[data-category='approved onboard videos'] {
		order: 6;
	}

	div[data-category='driving techniques'] {
		order: 7;
	}

	div[data-category='data'] {
		order: 8;
	}

	div[data-category='racecraft'] {
		order: 9;
	}

	div[data-category='skills in 60 seconds'] {
		order: 11;
	}

	div[data-category='general articles'] .swiper-slide {
		margin-bottom: 16px;
	}

	div[data-category='general articles'] .slider-pagination-buttons {
		display: none;
	}

	div[data-category='general articles'] .blog-grid {
		display: block;
	}

	div[data-category='general articles'] .swiper-wrapper {
		flex-wrap: wrap;
		grid-gap: 1.6rem 4rem;
	}

	.button-sm.less {
		display: none;
	}

	:global(.view-all .button-sm.less) {
		display: block!important;
	}

	:global(.view-all .button-sm.all) {
		display: none;
	}

	.blogs {
		display: flex;
		flex-direction: column;
		grid-gap: 3.2rem;
	}

	.cta-button {
		margin-top: 2.4rem;
	}

	.searched-blogs-grid,
	.all-blogs {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 3.6rem 2.4rem;
	}

	.blogs-box:nth-child(1) {
		order: 1;
	}

	.blogs-box:nth-child(2) {
		order: 2;
	}

	.blogs-box:nth-child(3) {
		order: 3;
	}

	.blogs-box:nth-child(4) {
		order: 5;
	}

	.blogs-box:nth-child(5) {
		order: 6;
	}

	.blogs-box:nth-child(6) {
		order: 7;
	}

	.blogs-box:nth-child(7) {
		order: 8;
	}

	.blogs-box:nth-child(8) {
		order: 9;
	}

	.blogs-box:nth-child(9) {
		order: 10;
	}

	.blogs-box:nth-child(10) {
		order: 11;
	}

	.blogs-box:nth-child(11) {
		order: 12;
	}

	.banner {
		order: 4;
	}

	/* <Featured Slider> */
	.blog-slider {
		margin-bottom: 4rem;
	}

	.featured-item {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 2.4rem;
	}

	.featured-img {
		border-radius: 0.8rem;
	}

	.featured-title {
		margin-top: 1.6rem;
	}

	.author-details {
		display: flex;

		margin: 2.4rem 0;
	}

	.coach-thumbnail {
		width: 4.8rem;
		height: 4.8rem;

		margin-right: 0.8rem;
	}

	.featured-title {
		font-weight: 500;
		font-size: 22px;

		letter-spacing: -0.04rem;
	}

	.slider-navigation-holder {
		display: flex;
		justify-content: center;

		margin-top: 2.4rem;
	}

	.slider-pagination-buttons {
		grid-gap: 8rem;
	}

	.back-to {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		padding-top: 4.8rem;

		width: 100%;

		cursor: pointer;
	}

	.featured-bottom {
		display: flex;
		align-items: center;

		margin-top: 2.4rem;
	}

	.featured-bottom .cta-button {
		margin-top: 0;
	}

	.social-media-icons {
		display: flex;

		margin-left: 2.4rem;
	}

	.social-media-icons a:nth-child(2) {
		margin: 0 1.6rem;
	}

	:global(.sport-selected .swiper-wrapper) {
		height: 100% !important;
	}

	/* </Featured Slider> */

	.searched-blogs-grid {
		padding-bottom: 8rem;
	}

	.container {
		width: 100%;
	}

	:global(.blog-grid.swiper) {
		padding-bottom: 1rem;
	}

	:global(.selected .slider-pagination-buttons) {
		display: none;
	}

	.swiper-pagination {
		width: 80px !important;
	}

	div[data-category='blayze+'] {
		display: none!important;
	}

	.content-types {
		display: flex;

		width: fit-content;

		background-color: #EEEEEE;
		border-radius: 8rem;

		padding: .4rem;

		margin: 5.6rem auto;
	}

	.content-type {
		font-size: 1.4rem;
		text-transform: uppercase;

		padding: .6rem 1.6rem;

		background-color: transparent;
		border-radius: 8rem;

		transition: background-color .24s ease-in-out;

		cursor: pointer;
	}

	.container.no-pt {
		padding-top: 14rem;
		padding-bottom: 5.6rem;
	}

	:global(.content-type.active) {
		background-color: #000!important;
		color: #fff!important;
	}
/*
	.section-blogs .blogs-box:first-child {
		padding-top: 0;
	}*/

	@media screen and (min-width: 768px) {
		.blog-grid {
			grid-gap: 3.6rem;
		}

		.blog-grid:not(.swiper-initialized) .swiper-wrapper {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}

		div[data-category='general articles'] .blog-card {
			margin-bottom: 0;
			margin-right: 40px;
		}

		.blogs-box.container {
			padding: 4rem 6.4rem;
		}

		.searched-blogs-grid,
		.all-blogs {
			grid-template-columns: repeat(3, 1fr);
		}

		.all-blogs {
			grid-area: 2/1/2/3;
		}

		.blogs {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 1.6rem;
		}

		.cta-button-holder {
			display: flex;
			justify-content: center;

			grid-area: 2/1/2/3;
		}

		.featured-item {
			grid-template-columns: 1fr 1fr;
		}

		.featured-bottom .cta-button {
			width: fit-content;
		}

		.featured-title {
			font-size: 26px;
		}

		.categories {
			grid-gap: 0.6rem;
			flex-wrap: wrap;
		
			overflow-x: initial;
			overflow-y: initial;
		}
	}

	.categories {
		display: flex;
		width: 100%;

		overflow-x: auto;
		overflow-y: hidden;
		
		padding-bottom: 0.2rem;
		grid-gap: 1.6rem 0.8rem;
	}

	.categories .category {
		margin-bottom: 0;
	}

	.category {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		
		min-width: 6rem;

		padding: 1.2rem 1rem;

		background-color: #EEEEEE;
		border-radius: 6rem;

		font-size: 1.3rem;
		text-align: center;

		transform: translate3d(0, .1rem, 0);

		cursor: pointer;

		transition: all .3s ease-in-out;
	}

	:global(.category.active) {
		background-color: #000!important;
		color: #fff;
	}

	.view-all-blogs {
		display: none;
	}

	:global(.blogs-box.view-all .view-all-blogs) {
		display: grid;
	}

	:global(.blogs-box.view-all .blogs.filtered) {
		display: none;
	}

	.container.searched {
		padding-top: 20rem;
	}
</style>