type ConfigRoute = {
  route: string;
  ContentID: string;
};

export default function () {
  const config = useRuntimeConfig();
  const configRoutes = config.public.routes as ConfigRoute[];

  const { path } = useRoute();
  const currentRoute = configRoutes.find((route) => route.route === path);
  if (!currentRoute)
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  return {
    fullSlug: currentRoute.route,
    contentId: currentRoute.ContentID,
  };
}
