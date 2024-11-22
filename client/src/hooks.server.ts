import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
  const refresh_token = event.cookies.get("rt") as string;
  const pathname = event.url.pathname;

  if (!refresh_token) {
    deleteTokens(event);
    if (!(pathname.startsWith('/signin')) && !(pathname.startsWith('/signup'))) {
      return redirect(303, "/signin");
    }
  } else {
    if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
      return redirect(303, "/app");
    }
  }

  const response = await resolve(event);
  return response;
};

function deleteTokens(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
  const negTime = new Date((new Date()).getTime() - 1 * 1000);
  event.cookies.set("rt", "", { path: "/", expires: negTime, secure: false });
  event.cookies.set("at", "", { path: "/", expires: negTime, secure: false });
}