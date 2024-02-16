import type { Handle, HandleServerError } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ resolve, event }) => {
  // Apply CORS header for API routes
  if (event.url.pathname.startsWith("/api")) {
    // Required for CORS to work
    if (event.request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }
  }

  const response = await resolve(event);
  if (event.url.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", `*`);
  }
  return response;
};

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError: HandleServerError = ({ error, event }) => {
  console.error({ event, error });

  return {
    message: "An error occurred. Please contact the team!.",
    code: (error as any)?.code ?? "UNKNOWN",
  };
};
