export function routeParam(value: string | string[] | undefined, fallback = "") {
  return Array.isArray(value) ? value[0] : value ?? fallback;
}

export function objectPayload(payload: unknown) {
  return typeof payload === "object" && payload !== null && !Array.isArray(payload) ? payload : {};
}
