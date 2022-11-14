import { GraphQLClient } from "graphql-request";
// import config from "../helpers/config";
import { getChildPages } from "./dataFetching";

const endpoint = `${process.env.NUXT_PUBLIC_APICD_URL}/${process.env.NUXT_PUBLIC_PROJECT_ID}`;

const client = new GraphQLClient(endpoint, { headers: {} });

// https://github.com/nuxt/framework/issues/4919#issuecomment-1124349857
export const generateRoutes = async (nitroConfig) => {
  // if (nitroConfig.dev) {
  //   return;
  // }
  // Set all possible routes to runtimeConfig
  nitroConfig.runtimeConfig.public.routes = [];

  const fetchPages = async (pages?: any[], parentRoute: string = "") => {
    if (!pages || !pages.length) {
      return;
    }
    for (const page of pages) {
      const route =
        parentRoute +
        "/" +
        // Rename route for pageSlug === 'home'
        (page.Data.pageSlug === "home" ? "" : page.Data.pageSlug);

      // Add to prerender routes if not dev
      if (!nitroConfig.dev) nitroConfig.prerender.routes.push(route);

      // Save generated routes into runtimeConfig
      nitroConfig.runtimeConfig.public.routes.push({
        route,
        ContentID: page.ContentID,
      });
      console.log("adding page: ", route);

      const { data: childPages } = await getChildPages(client, page.ContentID);
      await fetchPages(childPages, route);
    }
  };
  // Fetch all root pages
  const { data: rootPages } = await getChildPages(
    client,
    process.env.NUXT_PUBLIC_PAGE_CONTENT_ID
  );
  // Fetch all child pages until no more pages to generate
  await fetchPages(rootPages, "");
};
