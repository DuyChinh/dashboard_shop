function isAuthenticated(): boolean {
  if (typeof localStorage !== 'undefined') {
    const email: string | null = localStorage.getItem('email');
    return email !== null;
  } else {
    return true;
  }
}
// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/auth/login')
  }
})
