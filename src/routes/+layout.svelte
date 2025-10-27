<script lang="ts">
	import '@drop-in/graffiti';

	import { authClient } from '$lib/auth/client';
	import { goto, refreshAll } from '$app/navigation';
	import Cart from '$lib/Cart.svelte';
	import Github from '$lib/icons/Github.svelte';
	import Google from '$lib/icons/Google.svelte';
	import { z, get_options } from '$lib/zero.svelte.js';

	z.build(get_options());

	let { children, data } = $props();
</script>

<svelte:head>
	<title>Ztunes</title>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="wrapper">
	<div class="header">
		<div class="layout-split" data-style="center">
			<div>
				<a href="/" style="display: inline-block">
					<img src="/logo.png" alt="logo" height="200" width="200" />
				</a>
			</div>
			<div class="user">
				{#if data.user}
					<div class="layout-cluster" data-style="center">
						<div class="layout-cluster">
							<div><Cart /></div>
							<div>{data.user.email}</div>
						</div>

						<button
							onclick={async () => {
								await authClient.signOut();
								await refreshAll();
								await goto('/');
							}}
						>
							Sign Out
						</button>
					</div>
				{:else}
					<div class="layout-cluster">
						<button
							onclick={async () => {
								const callbackURL = location.href;
								await authClient.signIn.social({
									provider: 'google',
									callbackURL
								});
							}}
						>
							<Google />
						</button>

						<button
							onclick={async () => {
								const callbackURL = location.href;
								await authClient.signIn.social({
									provider: 'github',
									callbackURL
								});
							}}
						>
							<Github />
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{@render children?.()}
</div>

<style>
	.wrapper {
		padding: var(--pad-m);
	}

	.header {
		padding-block-end: var(--pad-m);
	}

	img {
		height: 100px;
		width: auto;
	}
	[data-style='center'] {
		align-items: center;
	}

	.user {
		display: flex;
		justify-content: end;
	}
</style>
