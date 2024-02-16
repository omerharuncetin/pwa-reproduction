<script lang="ts">
	import { onNavigate } from '$app/navigation';

	import { browser } from '$app/environment';

	import { pwaInfo } from 'virtual:pwa-info';

	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/stores';

	let pwaRegistered = false;

	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});

	onNavigate((navigation) => {
		const svelteDocument = document as any;
		if (!svelteDocument.startViewTransition) return;

		return new Promise((resolve) => {
			svelteDocument.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	async function registerPWA() {
		if (!browser) return;
		if (pwaRegistered) return;

		const { registerSW } = await import('virtual:pwa-register');

		// register the service worker
		registerSW({
			immediate: true,
			onRegisterError(error: any) {
				console.error('SW registration error', error);
			},
		});
	}

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	$: if (pwaInfo && !pwaRegistered) {
		(async () => {
			registerPWA();
			pwaRegistered = true;
		})();
	}
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<div class="bg-layer1 dark:bg-layer1-dark" id="main_layout" style="min-width: 373px; min-height: 100vh;">
	<slot />
</div>
