import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { queries } from '$lib/zero/queries';
import { type ReadonlyJSONValue, withValidation } from '@rocicorp/zero';
import { auth } from '$lib/auth/server';
import { handleGetQueriesRequest } from '@rocicorp/zero/server';
import { schema } from '../../../../schema';

export const POST: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession(request);
	const userID = session?.user.id;

	return json(
		await handleGetQueriesRequest((name, args) => getQuery(userID, name, args), schema, request)
	);
};

const validated = Object.fromEntries(
	Object.values(queries).map((q) => [q.queryName, withValidation(q)])
);

function getQuery(userID: string | undefined, name: string, args: readonly ReadonlyJSONValue[]) {
	const q = validated[name];
	if (!q) {
		throw new Error('Unknown query: ' + name);
	}
	return { query: q(userID, ...args) };
}
