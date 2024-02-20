import type { PageReturnType } from "$src/model";

export const prerender = false;
export const ssr = true;
export const csr = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }): Promise<PageReturnType> {
  console.log("slug", { params, url });
  return {
    data: "okay",
  };
}
