<script lang="ts">
	import * as queries from '$lib/zero/queries';
	import { page } from '$app/state';
	import CartButton from '$lib/CartButton.svelte';
	import { z } from '$lib/zero.svelte';

	const artist_id = $derived(page.params.id ?? '');
	const artist = $derived(z.createQuery(queries.get_artist(artist_id)));
</script>

{#if !artist?.data}
	<div>No artist found.</div>
{:else}
	<h1>{artist.data.name}</h1>
	<ul class="no-list stack">
		{#each artist.data.albums as album}
			<li class="item layout-split">
				<div class="details">{album.title} ({album.year})</div>
				<div class="action">
					<CartButton {album} />
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.stack {
		max-width: 800px;
	}
	.item {
		background: var(--tint-or-shade);
		padding: 1rem;
		border-radius: var(--br-s);
	}
	.details {
		display: flex;
		height: 100%;
		align-items: center;
	}
	.action {
		text-align: right;
	}
</style>
