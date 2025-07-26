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
  // 添加 router 配置以支持 GitHub Pages
  router: {
    options: {
      strict: false
    }
  },
  // GitHub Pages 配置
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/qiyuqingyun.github.io/' : '/',
    buildAssetsDir: '/_nuxt/'
  }
})