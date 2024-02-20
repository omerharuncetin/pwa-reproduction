import type { PageReturnType } from "$src/model";

export const ssr = true;
export const csr = false;
export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }): Promise<PageReturnType> {
  console.log("home", { params, url });

  return {
    data: "ok",
  };
}
