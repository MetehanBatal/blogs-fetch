// import { Directus } from '@directus/sdk';
// import { variables } from '$lib/variables';

// const url = 'https://staging-cms.blayze.cc/admin';
// let init = {
// 	auth: {
// 		'staticToken': variables.newsletterEndPoint
// 	}
// }

//export const directus = new Directus(url, init);
// let collectionList = directus
//console.log( directus );


// export let directusData;



// async function connectTable() {
// 	// But, we need to authenticate if data is private
// 	let authenticated = false;

// 	console.log( 'Started connection', variables.newsletterEndPoint );

// 	// Try to authenticate with token if exists
// 	await directus.auth.static(variables.newsletterEndPoint)
// 		.then(() => {
// 			console.log( 'authenticated' );
// 			authenticated = true;
// 		})
// 		.catch((err) => {console.log('Error', err)});

// 	// After authentication, we can fetch the private data in case the user has access to it
// 	const privateData = await directus.items('form_submissions').readMany();
// 	console.log( 'Data: ', privateData );
// 	directusData = privateData;
// }

// connectTable();