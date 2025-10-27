<script lang="ts">
	import { page } from '$app/state';
	import { z } from './zero.svelte';
	import * as queries from './zero/queries';

	let cart_items = z.createQuery(queries.get_cart_items(page.data.user.id));
</script>

<a href="/cart">Cart{cart_items.data.length ? ` (${cart_items.data.length})` : ''}</a>
