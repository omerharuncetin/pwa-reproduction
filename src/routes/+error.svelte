<script lang="ts">
	// Start: Sevelte Imports
	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	// End: Sevelte Imports

	// Start: Local Imports

	//  Components

	// Models
	import { onMount } from 'svelte';

	// End: Local Imports

	/**
	 * @type {IMetaTagProperties}
	 */
	let title = $page.status.toString() === '404' ? 'Page Not Found' : 'Something Went Wrong';
	onMount(() => {
		console.error($page.status);
		console.error($page.error);
	});
</script>

<!-- Start: Error View Layout -->
<div class="mt-2 md:container md:mx-auto">
	<div class="flex flex-col items-center justify-center">
		<!-- Start: Error Status Code -->
		<h2 class="text-3xl text-primary">
			{#if $page.status == 404}
				<div class="flex flex-col items-center justify-center">
					error
					<a
						class="mt-4 flex flex-row items-center justify-center space-x-1 rounded-md bg-primary px-6 py-2 text-base text-white"
						href="/"
					>
						<span>Back to Home</span>
					</a>
				</div>
			{:else if $page.status == 500}
				error
			{:else}
				{status}
			{/if}
		</h2>
		{#if dev}
			<!-- End: Error Status Code -->
			<p class="text-light-text-title dark:text-dark-text-title">
				{$page.status}
			</p>
		{/if}
		<!-- Start: Error Message container -->
		{#if dev && $page.error?.message}
			<pre class="text-light-text-title dark:text-dark-text-title"> {$page.error?.message} </pre>
		{/if}
		<!-- End: Error Message container -->
	</div>
</div>
<!-- End: Error View Layout -->
