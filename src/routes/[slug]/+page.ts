import type { PageReturnType } from "$src/model";

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }): Promise<PageReturnType> {
  return {
    data: "okay",
  };
}
