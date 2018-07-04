import { GraphQLServer } from 'graphql-yoga'
import songs from "./data/songs"
import playlists from './data/playlists';
import users from './data/users';


const resolvers = {
  Query: {
    // query for list of songs
    songs(parent, args, ctx, info) {
      if(args.first) {
        return songs.slice(0, args.first)
      }
      if(args.last){
        return songs.slice(-args.last, songs.length);
      }
      if(args.id){
        var s = songs.find(s => s.id === args.id);
        return [s];
      }
      return songs;
    },
    // query for list of playlists
    playlists(parent, args, ctx, info){
      if(args.first){
        return playlists.slice(0,args.first)
      }
      return playlists;
    },
    // query for list of users
    users(parent, args, ctx, info){
      if(args.email){
        return [users.find(u => u.email === args.email)];
      }
      return users;      
    },
    // query for random song
    randomSong(parent, args, ctx, info){
      var rand = Math.floor(Math.random() * songs.length);
      return songs[rand];
    }

  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req
  }),
})
server.start(() => console.log('Server is running on http://localhost:4000'))
