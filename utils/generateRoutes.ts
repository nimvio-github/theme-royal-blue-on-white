import { GraphQLClient } from "graphql-request";
import { getChildPages } from "./dataFetching";

export const generateRoutes = async (nitroConfig) => {
  // Get All runtimeConfig or env
  const projectId = process.env.NUXT_PUBLIC_PROJECT_ID;
  const APICD_URL = process.env.NUXT_PUBLIC_APICD_URL;
  const pageContentId = process.env.NUXT_PUBLIC_PAGE_CONTENT_ID;

  const endpoint = `${APICD_URL}/${projectId}`;

  const client = new GraphQLClient(endpoint, { headers: {} });
  // if (nitroConfig.dev) {
  //   return;
  // }
  // Set all possible routes to runtimeConfig
  nitroConfig.runtimeConfig.public.routes = [];

  const fetchPages = async (pages?: any[]) => {
    if (!pages || !pages.length) {
      return;
    }
    for (const page of pages) {
      const route = page.Data.urlPath;

      // Add to prerender routes if not dev
      if (route) {
        console.log("adding page: ", route);
        if (!nitroConfig.dev)
          nitroConfig.prerender.routes.push(route === "/home" ? "/" : route);
        nitroConfig.runtimeConfig.public.routes.push({
          route,
          ContentID: page.ContentID,
        });
      }

      const { data: childPages } = await getChildPages(client, page.ContentID);
      await fetchPages(childPages);
    }
  };
  // Fetch all root pages
  const { data: rootPages } = await getChildPages(client, pageContentId);
  // Fetch all child pages until no more pages to generate
  await fetchPages(rootPages);
};
