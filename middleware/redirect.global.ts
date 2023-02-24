export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path !== "/" && to.path.endsWith("/")) {
    const nextPath = to.path.replace(/\/+$/, "") || "/";
    return navigateTo(nextPath, {
      redirectCode: 301,
    });
  }
});
