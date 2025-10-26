<script lang="ts">
	import { z } from '$lib/zero.svelte';
	import { queries } from '$lib/zero/queries';
	import { page } from '$app/state';

	const artistId = $derived(page.params.id ?? '');
	const artist = $derived(z.createQuery(queries.getArtist(artistId)));
</script>

{#if !artist.data}
	<div class="alert alert-warning">No artist found.</div>
{:else}
	<h1>{artist.data.name}</h1>
	<ul>
		{#each artist.data.albums as album}
			<li>
				{album.title} ({album.year})
			</li>
		{/each}
	</ul>
{/if}
