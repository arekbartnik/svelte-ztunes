import { syncedQuery, syncedQueryWithContext } from '@rocicorp/zero';
import z from 'zod';
import { builder } from '../../schema';

export const queries = {
	getHomepageArtists: syncedQuery('getHomepageArtists', z.tuple([z.string()]), (q: string) =>
		builder.artist.where('name', 'ILIKE', `%${q}%`).orderBy('popularity', 'desc').limit(20)
	),

	getArtist: syncedQuery('getArtist', z.tuple([z.string()]), (artistID: string) =>
		builder.artist
			.where('id', artistID)
			.related('albums', (album) => album.related('cartItems'))
			.one()
	),

	getCartItems: syncedQueryWithContext('getCartItems', z.tuple([]), (userID: string | undefined) =>
		builder.cartItem
			.related('album', (album) => album.one().related('artist', (artist) => artist.one()))
			.where('userId', userID ?? '')
	)
};
