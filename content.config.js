export default {
  // 文档驱动模式
  documentDriven: true,
  
  // 内容目录路径
  base: '/content',
  
  // API端点
  apiBase: '/api/_content',
  
  // Markdown配置
  markdown: {
    // 使用默认解析器
    remarkPlugins: [],
    rehypePlugins: [],
    
    // 启用MDC语法支持
    mdc: true
  },
  
  // 内容来源
  sources: {
    // 从本地文件系统读取内容
    local: {
      prefix: '/',
      driver: 'fs',
      base: 'content'
    }
  }
}
