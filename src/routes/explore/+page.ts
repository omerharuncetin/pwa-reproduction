import type { PageReturnType } from "$src/model";

export const prerender = true;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }): Promise<PageReturnType> {
  return {
    data: "ok",
  };
}
