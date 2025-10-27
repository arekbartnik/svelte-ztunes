<script lang="ts">
	import '@drop-in/graffiti';

	import { authClient } from '$lib/auth/client';
	import { refreshAll } from '$app/navigation';
	import Cart from '$lib/Cart.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
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
								refreshAll();
							}}
						>
							Sign Out
						</button>
					</div>
				{:else}
					<button
						onclick={async () => {
							const callbackURL = location.href;
							await authClient.signIn.social({
								provider: 'github',
								callbackURL
							});
						}}
					>
						Continue with GitHub
					</button>
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
