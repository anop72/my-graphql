import fetch from 'node-fetch'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'awesome playlist',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (playlist) => playlist.name
    },
    musics: {
      type: new GraphQLList(MusicType),
      resolve: (playlist) => playlist.musics
    }
  })
})

const MusicType = new GraphQLObjectType({
  name: 'Music',
  description: 'awesome music',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: (music) => music.title
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
    },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve: (root) =>
        fetch('http://www.anop72.info/api/playlists_v2.json')
          .then(res => res.json())
    }
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
