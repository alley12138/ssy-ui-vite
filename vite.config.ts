import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
/// <reference types="vitest/config" />
import type { BuildOptions } from 'vite'
import { defineConfig } from 'vite'

// import { presetUno, presetAttributify, presetIcons } from "unocss";
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'

// const rollupOptions = {
//   external: ['vue', 'vue-router'],
//   output: {
//     globals: {
//       vue: 'Vue',
//     },
//   },
// }

const rollupOptions: BuildOptions['rollupOptions'] = {
  external: ['vue'], // 将这些模块保留在 bundle 之外
  output: {
    globals: {
      vue: 'Vue',
    },
    exports: 'named',
  },
}

export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler',
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
  ],
  // build: {
  //   rollupOptions,
  //   minify: false,
  //   cssCodeSplit: true,
  //   // 添加库模式配置
  //   lib: {
  //     entry: './src/entry.ts',
  //     name: 'SSYUI',
  //     fileName: 'ssy-ui',
  //     // 导出模块格式
  //     formats: ['es', 'umd', 'iife'],
  //   },
  // },

  // build: {
  //   rollupOptions: {
  //     output: {
  //       exports: 'named',
  //     },
  //   },
  //   minify: 'terser', // boolean | 'terser' | 'esbuild'
  //   sourcemap: true, // 输出单独 source文件
  //   reportCompressedSize: true, // 生成压缩大小报告
  //   cssCodeSplit: true,
  //   lib: {
  //     entry: './src/entry.ts',
  //     name: 'SSYUI',
  //     fileName: 'ssy-ui',
  //     formats: ['es', 'umd', 'iife'], // 导出模块类型
  //   },
  // },
  build: {
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    sourcemap: false, // 输出单独 source文件
    reportCompressedSize: true, // 生成压缩大小报告
    cssCodeSplit: true,
    // 添加库模式配置
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      name: 'SSYUI',
      fileName: 'ssy-ui',
      // 导出模块格式
      formats: ['es', 'umd'],
    },
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul', // 'istanbul' or 'v8',
      reporter: ['text', 'json', 'html'],
      // include: ['src/**/*.ts', 'src/**/*.tsx'], // 指定你要测试的文件路径
      // exclude: ['src/*.ts', 'src/utils/**'],// 指定你要忽略的文件路径
    },
  },
})
