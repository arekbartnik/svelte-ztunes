import { Z } from 'zero-svelte';
import { schema, type Schema } from '../schema.gen';
import { PUBLIC_SERVER } from '$env/static/public';
import { page } from '$app/state';
import { createMutators } from './zero/mutators';

export function get_options() {
	const user = page.data.user;

	return {
		server: PUBLIC_SERVER,
		schema,
		userID: user ? user.id : 'anon',
		mutators: createMutators(user?.id)
	};
}

export const z = new Z<Schema, ReturnType<typeof createMutators>>(get_options());
