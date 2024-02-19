import type { PageReturnType } from "$src/model";

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }): Promise<PageReturnType> {
  console.log("slug/posts/id", { params });
  return {
    data: "ok",
  };
}
