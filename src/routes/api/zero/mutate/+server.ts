import { env } from '$env/dynamic/private';
import { PushProcessor } from '@rocicorp/zero/server';
import { zeroPostgresJS } from '@rocicorp/zero/server/adapters/postgresjs';
import postgres from 'postgres';
import { schema } from '../../../../schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { mutators } from '$lib/zero/mutators';
import { auth } from '$lib/auth/server';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const processor = new PushProcessor(zeroPostgresJS(schema, postgres(env.DATABASE_URL)));

export const POST: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession(request);
	const userID = session?.user.id;

	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const result = await processor.process(mutators(userID), request);
		return json(result);
	} catch (err) {
		return json({ error: 'Invalid token' }, { status: 401 });
	}
};
