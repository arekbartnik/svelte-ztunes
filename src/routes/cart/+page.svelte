<script lang="ts">
	import { page } from '$app/state';
	import { get_options, z } from '$lib/zero.svelte';
	import { queries } from '$lib/zero/queries';

	let cart_items = z.createQuery(queries.get_cart_items(page.data?.user?.id));
</script>

{#if !page.data.user}
	<div>Login to view cart</div>
{:else}
	<h3>Cart</h3>

	{#if cart_items.data.length}
		<table style="width: 500px">
			<tbody>
				{#each cart_items.data as item}
					<tr>
						<td>{item.album?.title}</td>
						<td style="padding-left: 1rem"
							><button
								type="button"
								onclick={() => {
									if (!item.album) return;
									z.mutate.cart.remove(item.album.id);
								}}>Remove</button
							></td
						>
					</tr>
				{/each}</tbody
			>
		</table>
	{:else}
		<div>No items in cart 😢</div>
	{/if}
{/if}
