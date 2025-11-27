/**
 * This file converts importmap.json into vite build compatible path aliases.
 */
import importMap from './importmap.json';
import path from 'path';

const paths = importMap.imports;

Object.keys(paths).forEach(key => {
    paths[key] = paths[key]
        // Replace './' with absolute path
        .replace('./', path.resolve(__dirname, '.') + '/')
        // Replace '\' with '/'
        .replaceAll('\\', '/');
});

export {paths};
export default paths;
