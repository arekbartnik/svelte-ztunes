import { definePermissions, type Schema as ZeroSchema, createBuilder } from '@rocicorp/zero';
import { schema as genSchema } from './schema.gen';

export const schema = {
	...genSchema,
	enableLegacyMutators: true,
	enableLegacyQueries: true
} as const satisfies ZeroSchema;

export const builder = createBuilder(schema);

export type Schema = typeof schema;

export const permissions = definePermissions<{}, Schema>(schema, () => ({}));
