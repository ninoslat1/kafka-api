// esbuild.config.mjs
import { build } from 'esbuild';

build({
  entryPoints: ['src/index.js'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outfile: 'dist/index.js',
  external: ['node:*', 'dotenv'],
}).catch(() => process.exit(1));
