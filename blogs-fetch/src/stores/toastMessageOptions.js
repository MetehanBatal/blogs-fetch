import { toast } from '@zerodevx/svelte-toast';

export const success = m => toast.push(m, {
	theme: {
		'--toastBackground': '#008800',
		'--toastColor': '#ffffff',
		'--toastBarBackground': '#ffffff'
	},
	duration: 6000
})

export const warning = m => toast.push(m, {
	theme: {
		'--toastBackground': 'yellow',
		'--toastColor': 'white',
		'--toastBarBackground': 'olive'
	}
});

export const failure = m => toast.push(m, {
	theme: {
		'--toastBackground': '#E72208',
		'--toastColor': '#ffffff',
		'--toastBarBackground': '#ffffff'
	},
	duration: 6000
});