import type { PageReturnType } from "$src/model";

export const ssr = true;
export const csr = true;
export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }): Promise<PageReturnType> {
  return {
    data: "ok",
  };
}
