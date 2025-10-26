import { Z } from 'zero-svelte';
import { schema, type Schema } from '../schema.gen';
import { PUBLIC_SERVER } from '$env/static/public';
import { page } from '$app/state';

function get_options() {
	const user = page.data.user;

	return {
		server: PUBLIC_SERVER,
		schema,
		userID: user ? user.id : 'anon'
	};
}

export const z = new Z<Schema>(get_options());
