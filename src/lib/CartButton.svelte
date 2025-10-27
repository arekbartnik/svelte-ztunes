<script lang="ts">
	import { page } from '$app/state';
	import { z } from './zero.svelte';
	import { get_options } from './zero.svelte';

	let { album } = $props();
	let cartItems = $derived(album.cartItems);

	let message = $derived.by(() => (cartItems.length > 0 ? 'Remove from Cart' : 'Add to Cart'));

	const handle_cart = () => {
		z.build(get_options());
		if (cartItems.length > 0) {
			z.mutate.cart.remove(album.id);
		} else {
			z.mutate.cart.add({ albumID: album.id, addedAt: Date.now() });
		}
	};
</script>

{#if page.data.user}
	<button onclick={handle_cart} type="button">{message}</button>
{:else}
	<button disabled>Login to shop</button>
{/if}
