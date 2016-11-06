import fetch from 'node-fetch'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

const BASE_URL = 'http://www.anop72.info/api';

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'awesome playlist',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (playlist) => playlist.id
    },
    name: {
      type: GraphQLString,
      resolve: (playlist) => playlist.name
    },
    description: {
      type: GraphQLString,
      resolve: (playlist) => playlist.description
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
    id: {
      type: GraphQLString,
      resolve: (music) => music.id
    },
    title: {
      type: GraphQLString,
      resolve: (music) => music.title
    },
    duration: {
      type: GraphQLString,
      resolve: (music) => music.duration
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
        fetch(`${BASE_URL}/playlists/1.json`)
          .then(res => res.json())
    },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve: (root) =>
        fetch(`${BASE_URL}/playlists.json`)
          .then(res => res.json())
    }
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
