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
  // 简化 GitHub Pages 配置
  app: {
    baseURL: '/', // GitHub Pages 仓库根目录通常只需 "/"
    buildAssetsDir: '/_nuxt/'
  }
})