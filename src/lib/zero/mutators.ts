import { type Transaction } from '@rocicorp/zero';
import { type CustomMutatorDefs } from '@rocicorp/zero';
import type { Schema } from '../../schema';

export function createMutators(userId: string | undefined) {
	return {
		cart: {
			add: async (
				tx: Transaction<Schema>,
				{ albumID, addedAt }: { albumID: string; addedAt: number }
			) => {
				if (!userId) {
					throw new Error('Not authenticated');
				}
				try {
					await tx.mutate.cartItem.insert({
						userId,
						albumId: albumID,
						addedAt: tx.location === 'client' ? addedAt : Date.now()
					});
				} catch (err) {
					console.error('error adding cart item', err);
					throw err;
				}
			},

			remove: async (tx: Transaction<Schema>, albumId: string) => {
				if (!userId) {
					throw new Error('Not authenticated');
				}
				const cartItem = await tx.query.cartItem
					.where('userId', userId)
					.where('albumId', albumId)
					.one()
					.run();
				if (!cartItem) {
					return;
				}
				await tx.mutate.cartItem.delete({
					userId: cartItem.userId,
					albumId: cartItem.albumId
				});
			}
		}
	} as const satisfies CustomMutatorDefs;
}

export type Mutators = ReturnType<typeof createMutators>;
