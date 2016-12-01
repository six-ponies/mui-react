import path from 'path';

export const repoRoot = path.resolve(__dirname, '../');

export const srcRoot = path.join(repoRoot, 'src/');
export const srcRootStyle = path.join(repoRoot, 'src/styles');
export const distRoot = path.join(repoRoot, 'dist/');
export const libRoot = path.resolve(repoRoot, 'lib/');
export const libRootStyle = path.resolve(repoRoot, 'lib/styles');
export const esRoot = path.resolve(repoRoot, 'es/');
export const esRootStyle = path.resolve(repoRoot, 'es/styles');
export const bowerRoot = path.join(repoRoot, 'amd/');
export const amdRoot = path.resolve(repoRoot, 'amd/');
export const docsRoot = path.join(repoRoot, 'docs-built/');