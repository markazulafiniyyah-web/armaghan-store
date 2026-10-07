// Lets plain Node understand the "@/..." import alias used in the app,
// so the smoke test can exercise the real modules.
import { fileURLToPath } from 'node:url';

const ROOT = new URL('../', import.meta.url);

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@/')) {
    let target = new URL(specifier.slice(2), ROOT);
    if (!/\.[a-z]+$/i.test(target.pathname)) target = new URL(`${target.href}.js`);
    return next(fileURLToPath(target), context);
  }
  return next(specifier, context);
}
