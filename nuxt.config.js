export default defineNuxtConfig({
  //compatibilityDate: '2025-07-26',
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      // 代码高亮主题
      highlight: {
        theme: 'github-dark'
      }
    }
  },
  css: [
    // 添加 KaTeX 的 CSS 样式
    'katex/dist/katex.min.css'
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
