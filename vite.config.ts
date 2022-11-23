import { resolve } from "path"
import copy from 'rollup-plugin-copy'
import {createStyleImportPlugin, AndDesignVueResolve} from 'vite-plugin-style-import'
import Components from 'unplugin-vue-components/vite'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    plugins: [
        vue(),
        copy({
            targets: [
                { src: "src/manifest.json", dest: "dist" },
                { src: "src/assets", dest: "dist" },
            ],
            hook: "writeBundle",
        }),
        createStyleImportPlugin({
            resolves: [
                AndDesignVueResolve(),
            ],
            libs: [
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `ant-design-vue/es/${name}/style/index`
                    },
                },
            ],
        }),
    ],
    build: {
        rollupOptions: {
            input: ["index.html", "src/background.ts", "src/contentScript.ts"],
            output: {
                chunkFileNames: "[name].[hash].js",
                assetFileNames: "[name].[hash].[ext]",
                entryFileNames: "[name].js",
                dir: "dist",
            }
        },
    },
})
