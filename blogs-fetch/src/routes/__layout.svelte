<script>
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	$: if($navigating) checkGiftPage();

	// Importing global CSS files
	// 
	import '../css/reset.css';
	import '../css/global.css';

	export const prerender = true;
</script>


<main>
	<slot />
</main>


<SvelteToast />

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>