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
  // GitHub Pages 配置
  app: {
    // 根据环境设置基础URL，GitHub Pages需要使用仓库名称作为路径
    baseURL: process.env.NODE_ENV === 'production' ? '/qiyuqingyun.github.io/' : '/',
    buildAssetsDir: '/_nuxt/',
    // 路由配置
    router: {
      options: {
        strict: false
      }
    }
  }
})