import { GraphQLClient } from "graphql-request";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { APICD_URL, projectId } = config.public;
  const endpoint = `${APICD_URL}/${projectId}`;
  const client = new GraphQLClient(endpoint, { headers: {} });
  return {
    provide: {
      gqlClient: client,
    },
  };
});
