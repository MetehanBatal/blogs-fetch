import { writable } from 'svelte/store';
import { browser } from '$app/env';
import Cookies from 'js-cookie';

export let isLoggedIn = writable(false, (set) => {
	if ( browser ) {
		let cookie = Cookies.get('blayze_user_logged_in');
	
		if (cookie) {
			set(true);
		}
	}
});