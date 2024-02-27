import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";

import { auth } from "@/lib/firebase";

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    await auth.authStateReady();

    if (auth.currentUser === null && location.pathname !== "/login") {
      redirect({ to: "/login", throw: true });
    } else if (auth.currentUser !== null && location.pathname === "/login") {
      redirect({ to: "/", throw: true });
    }
  },

  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
