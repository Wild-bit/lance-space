export function interpolatePath(
  path: string,
  params: Record<string, any>
): string {
  return path.replace(/:(\w+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined) throw new Error(`Missing path param: ${key}`);
    return encodeURIComponent(value);
  });
}
