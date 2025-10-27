<script lang="ts">
	import { page } from '$app/state';
	import { z } from './zero.svelte';
	import { queries } from './zero/queries';

	let cartItems = z.createQuery(queries.getCartItems(page.data.user.id));
</script>

<a href="/cart">Cart{cartItems.data.length ? ` (${cartItems.data.length})` : ''}</a>
