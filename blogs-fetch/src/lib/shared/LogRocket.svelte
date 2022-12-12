<script context="module">
	import LogRocket from 'logrocket';
	import Cookies from 'js-cookie';

	// Global Variables
	let userID;
	let userFullName;
	let userEmail;
	let userRole;
	let userSubscriberStatus;

	export function initLogRocket() {
		// Check if LogRocket has been initialized.
		let initialized = LogRocket._isInitialized;

		// If already initialize, just log a message and log user info.
		// If not, then initialize it and log user info.
		// 
		if (initialized) {
			LogRocket.log('LogRocket already initialized');
			logImportantCookies();
		} else {
			LogRocket.init('usw15e/blayzeio', { mergeIframes: true, childDomains: ['*'] });
			LogRocket.log('Initializing LogRocket');
			logImportantCookies();
		}
	}

	function logImportantCookies() {
		fetchImportantCookies();
		
		console.log( userID, userFullName, userEmail );

		LogRocket.info(new Date().toISOString());
		LogRocket.info(`ID: ${userID}`);
		LogRocket.info(`Name: ${userFullName}`);
		LogRocket.info(`Email: ${userEmail}`);
		LogRocket.info(`Role: ${userRole}`);
		LogRocket.info(`Subscriber?: ${userSubscriberStatus}`);

		identifyLogRocketUser();
	}

	function identifyLogRocketUser() {
		// // Required to get the user info.
		// fetchImportantCookies();

		if (userID) {
			LogRocket.identify(userID, {
				name: userFullName,
				email: userEmail
			});
		}
	}

	function fetchImportantCookies() {
		//// Fetch Cookie Data
		userID = Cookies.get('blayze_user_id');
		userFullName = Cookies.get('blayze_user_full_name');
		userEmail = Cookies.get('blayze_user_email');
		userRole = Cookies.get('blayze_user_role');
		userSubscriberStatus = Cookies.get('blayze_subscriber');
	}
</script>
