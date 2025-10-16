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
    // Markdown 配置
    build: {
      markdown: {
        // 代码高亮配置 - 使用 Shiki
        highlight: {
          // 主题配置
          theme: 'github-light',
          // 预加载的语言
          langs: [
            'javascript',
            'js', 
            'typescript',
            'ts',
            'python',
            'py',
            'java',
            'css',
            'html',
            'vue',
            'json',
            'bash',
            'shell'
          ]
        },
        // Remark 插件配置
        remarkPlugins: {
          'remark-math': {}
        },
        // Rehype 插件配置
        rehypePlugins: {
          'rehype-katex': {
            options: {
              strict: false,
              throwOnError: false
            }
          }
        }
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
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/网页图标.png'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
          integrity: 'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn',
          crossorigin: 'anonymous'
        }
      ],
      htmlAttrs: {
        lang: 'zh-CN'
      }
    }
  }
}