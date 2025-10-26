<script lang="ts">
	import { z } from '$lib/zero.svelte';
	import { queries } from '$lib/zero/queries';
	import { page } from '$app/state';
	import CartButton from '$lib/CartButton.svelte';

	const artistId = $derived(page.params.id ?? '');
	const artist = $derived(z.createQuery(queries.getArtist(artistId)));
</script>

{#if !artist.data}
	<div>No artist found.</div>
{:else}
	<h1>{artist.data.name}</h1>
	<ul>
		{#each artist.data.albums as album}
			<li>
				{album.title} ({album.year})
				<CartButton {album} />
			</li>
		{/each}
	</ul>
{/if}
