import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      // https://content.nuxtjs.org/api/configuration#markdown
    }
  },
  css: [
    // 在这里添加全局 CSS 文件
  ],
  devtools: {
    enabled: true
  }
})