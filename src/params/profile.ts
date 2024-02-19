import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => {
  // prettier-ignore
  return /^\/[^\/]+\/?$$/.test(param); /* eslint-disable-line */
};
