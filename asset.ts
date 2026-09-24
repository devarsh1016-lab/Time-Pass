// GitHub Pages serves a project site from /<repo-name>/, so every file in /public
// needs that prefix. The deploy workflow sets NEXT_PUBLIC_BASE_PATH automatically;
// locally it is empty and paths stay as written.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (path: string) => `${basePath}${path}`;
