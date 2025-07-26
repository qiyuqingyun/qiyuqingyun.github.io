import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-26',
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      // https://content.nuxtjs.org/api/configuration#markdown
    },
    highlight: {
      theme: 'github-dark'
    }
  },
  css: [
    // 在这里添加全局 CSS 文件
  ],
  devtools: {
    enabled: true
  },
  // GitHub Pages 配置 - 根据官方文档设置
  app: {
    baseURL: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/qiyuqingyun.github.io/' : '/',
    buildAssetsDir: '/_nuxt/'
  }
})