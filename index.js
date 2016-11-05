import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './schema';

const app = express()

app.set('port', process.env.PORT || 3000);

app.use(graphQLHTTP({
  schema,
  graphiql: true
}))

app.listen(app.get('port'), () => console.log("App is running", app.get('port')))
