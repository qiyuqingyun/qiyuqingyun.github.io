export default {
  // 模块配置
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  
  // Content模块配置
  content: {
    // 指定内容目录
    sources: {
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    // Markdown配置
    markdown: {
      // 代码高亮主题
      highlight: {
        theme: 'github-dark'
      }
    }
  },
  
  // Nitro配置 - 静态资源目录配置
  nitro: {
    compatibilityDate: '2025-07-04',
    prerender: {
      routes: ['/markdown', '/about']
    }
  },
  
  // 静态目录配置
  dir: {
    static: 'public'
  },
  
  // 渲染模式
  ssr: false,
  
  // 组件自动导入
  components: true,

  // 应用配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '我的博客',
      meta: [
        { name: 'description', content: '一个带有粒子效果的博客网站' }
      ],
      htmlAttrs: {
        lang: 'zh-CN'
      }
    }
  }
}