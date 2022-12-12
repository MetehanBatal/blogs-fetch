// import { writable } from "svelte/store";
// // import { variables } from '$lib/variables';

// // export const sports = writable([]);
// // //const url = import.meta.env.VITE_SPORTS_ENDPOINT;

// // const fetchSports = async() => {
// // 	const url = "https://staging-cms.blayze.cc/items/sports";
// // 	//const url = "https://pokeapi.co/api/v2/pokemon?limit=50";
// // 	const settings = {
// // 		"method": "GET",
// // 		"headers": {
// // 			"Authorization": "Bearer suA2k$VS@muzvYt92DkFg7WE8pjB5VE$T8LHeYd&kqTR*73N6T$xmYP4VLmqz^6@"
// // 		}
// // 	}
// // 	const res = await fetch(url, settings);
// // 	const data = await res.json();

// // 	const loadedRes = data.data.map((data, index) => {
// // 		return {
// // 			name: data.name,
// // 			id: index++,
// // 			image: data.icon,
// // 			url: data.name.toLowerCase()
// // 		}
// // 	});
// // 	sports.set(loadedRes);
// // };
// // fetchSports();
// // 

// export const sportSelection = writable('');
// 


import { writable } from 'svelte/store';

export let sportSelection = writable('');