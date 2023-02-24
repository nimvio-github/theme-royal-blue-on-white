export type ConfigRoute = {
  route: string;
  ContentID: string;
};

export default function () {
  const config = useRuntimeConfig();
  const configRoutes = config.public.routes as ConfigRoute[];

  const { path } = useRoute();
  const formattedPath =
    path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const currentRoute = configRoutes.find(
    (route) => route.route === formattedPath
  );
  if (!currentRoute)
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  return {
    fullSlug: currentRoute.route,
    contentId: currentRoute.ContentID,
  };
}
