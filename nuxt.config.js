export default defineNuxtConfig({
  //compatibilityDate: '2025-07-26',
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
  // GitHub Pages 配置 - 使用适用于 Nuxt 3 的正确配置
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    // 添加 router 配置
    router: {
      base: '/'
    }
  }
})