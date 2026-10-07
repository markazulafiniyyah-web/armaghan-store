// Registers the "@/..." alias resolver, then runs the smoke test.
import { register } from 'node:module';

register('./alias-loader.mjs', import.meta.url);
await import('./smoke-test.mjs');
