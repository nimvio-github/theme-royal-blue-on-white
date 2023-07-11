import { GraphQLClient } from "graphql-request";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { APICD_URL, projectId } = config.public;
  const endpoint = `${APICD_URL}/${projectId}`;
  const previewToken = process.env.NUXT_PREVIEW_TOKEN;

  const client = new GraphQLClient(endpoint, {
    headers: { Authorization: previewToken },
  });
  return {
    provide: {
      gqlClient: client,
    },
  };
});
