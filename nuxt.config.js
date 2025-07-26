export default {
  // 模块配置
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  
  // 内容模块配置 - 使用独立配置文件content.config.js
  content: {},
  
  // 渲染模式
  ssr: false,
  
  // 组件自动导入
  components: true,

  // Nitro配置
  nitro: {
    compatibilityDate: '2025-07-04',
    prerender: {
      routes: ['/markdown', '/about']
    }
  }
}
