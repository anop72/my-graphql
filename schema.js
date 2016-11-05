import fetch from 'node-fetch'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'awesome playlist',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (playlist) => playlist.name
    }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query my awesome playlist(s)',
  fields: () => ({
    playlist: {
      type: PlaylistType,
      resolve: (root) =>
        fetch('http://www.anop72.info/api/playlist_v2.json')
          .then(res => res.json())
    }
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
