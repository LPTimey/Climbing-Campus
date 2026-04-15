import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default {
    appType: 'spa',
    build: {
        license: true,
        sourcemap: true,
    },
    css:{
        devSourcemap: true,
    },
    plugins: [
        { enforce: 'pre', ...mdx() },
        react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],
    // ...
} satisfies UserConfig