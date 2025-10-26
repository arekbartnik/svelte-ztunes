<script lang="ts">
	import '@drop-in/graffiti';

	import favicon from '$lib/assets/favicon.ico';
	import { authClient } from '$lib/auth/client.js';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="wrapper">
	<div>
		<div class="layout-split" data-style="center">
			<a href="/">
				<img src="/logo.png" alt="logo" height="200" width="200" />
			</a>
			<div class="user">
				{#if data.user}
					<div class="layout-cluster" data-style="center">
						<div>
							{data.user.email}
						</div>

						<button
							onclick={async () => {
								await authClient.signOut();
							}}
						>
							Sign Out
						</button>
					</div>
				{:else}
					<button
						onclick={async () => {
							await authClient.signIn.social({
								provider: 'github'
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
		padding: 2rem;
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
