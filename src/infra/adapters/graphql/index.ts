import Koa from 'koa';
import cors from 'kcors';
import Router from 'koa-router';
import { graphqlHTTP } from 'koa-graphql';

import schema from './schema';

import { PORT_API } from '@config/eviromentVars';

const app = new Koa();
const router = new Router();

app.use(cors());

const graphqlServer = graphqlHTTP({
  schema,
  graphiql: true
});

router.all('/', graphqlServer);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT_API, () => console.log(`API running on port: ${PORT_API}`));

export default app;