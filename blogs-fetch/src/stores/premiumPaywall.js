import { readable } from 'svelte/store';
import { browser } from '$app/env';
import Cookies from 'js-cookie';

export let premiumUser = readable(false, (set) => {
	if ( browser ) {
		let cookie = Cookies.get('blayze_subscriber');
	
		if (cookie && cookie === 'true') {
			set(true);
		}
	}
});