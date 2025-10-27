<script lang="ts">
	import { z } from '$lib/zero.svelte';
	import { queries } from '$lib/zero/queries';

	const limit = 20;
	let search = $state('');

	const artists = $derived(z.createQuery(queries.getHomepageArtists(search)));
</script>

<h3>Search 85,000 artists from the 1990s...</h3>

<div class="stack">
	<input type="text" bind:value={search} autofocus />

	<ul class="no-list">
		{#each artists.data as artist}
			<li>
				<a href={`/artist/${artist.id}`}>
					{artist.name}
				</a>
			</li>
		{/each}
		{#if artists.details.type === 'unknown' && artists.data.length < limit}
			<div>Loading...</div>
		{/if}
	</ul>
</div>
