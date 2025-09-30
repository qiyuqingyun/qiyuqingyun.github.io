<template>
  <div class="post-container">
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">
      <h1>错误</h1>
      <p>{{ error.message }}</p>
      <pre>{{ error.stack }}</pre>
    </div>
    <div v-else-if="post">
      <article>
        <div class="post-header">
          <h1>{{ post.title }}</h1>
          <p class="meta">
            发布日期: {{ formatDate(post.meta?.date) }}
          </p>
        </div>
        <div class="post-content">
          <MarkdownRenderer :value="post" />
        </div>
        <div class="post-footer">
          <NuxtLink to="/blog" class="back-link">← 返回博客列表</NuxtLink>
        </div>
      </article>
    </div>
    <div v-else>
      <h1>未找到文章</h1>
      <p>抱歉，您请求的文章不存在。</p>
      <p>请求的路径: {{ Array.isArray(slug) ? slug.join('/') : slug }}</p>
    </div>
  </div>
</template>

<script setup>
import { queryCollection } from '#imports'

const route = useRoute()
const slug = route.params.slug

const { data: post, pending, error } = await useAsyncData(
  `post-${Array.isArray(slug) ? slug.join('/') : slug}`,
  async () => {
    try {
      // 使用 queryCollection 查询 content 集合并查找特定路径的文章
      const path = Array.isArray(slug) ? slug.join('/') : slug
      console.log('Querying path:', path) // 调试信息
      
      // 获取所有文章然后手动筛选
      const allPosts = await queryCollection('content').all()
      console.log('All posts:', allPosts) // 调试信息
      
      // 手动查找匹配的文章
      const result = allPosts.find(p => {
        // 确保 p.stem 和 path 都存在且为字符串
        if (!p.stem || typeof p.stem !== 'string') return false
        if (!path || typeof path !== 'string') return false
        return p.stem === path
      })
      
      console.log('Manual search result:', result) // 调试信息
      
      if (!result) {
        // 使用 createError 创建正确的错误对象，避免 TypeError
        throw createError({
          statusCode: 404,
          message: `页面未找到: Post not found for path: ${path || 'undefined'}`
        })
      }
      
      console.log('Final post data:', result) // 调试信息
      return result
    } catch (err) {
      // 确保错误是通过 createError 创建的标准化错误对象
      if (err instanceof Error && !err.statusCode) {
        throw createError({
          statusCode: 500,
          message: err.message || '内部服务器错误'
        })
      }
      throw err
    }
  }
)

function formatDate(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
.post-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.error-container {
  text-align: center;
  padding: 2rem;
}

.error-container h1 {
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #233554;
}

.back-link {
  color: #64ffda;
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
}

.post-header h1 {
  color: #ccd6f6;
  font-size: 2rem;
  margin: 1rem 0 0.5rem;
}

.post-date {
  color: #8892b0;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.post-description {
  color: #a8b2d1;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.post-content {
  text-align: left;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3) {
  color: #ccd6f6;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.post-content :deep(h1) {
  font-size: 1.8rem;
}

.post-content :deep(h2) {
  font-size: 1.5rem;
}

.post-content :deep(h3) {
  font-size: 1.3rem;
}

.post-content :deep(p) {
  color: #a8b2d1;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  color: #a8b2d1;
  margin: 1rem 0;
  padding-left: 2rem;
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
}

.post-content :deep(a) {
  color: #64ffda;
  text-decoration: none;
}

.post-content :deep(a:hover) {
  text-decoration: underline;
}

.post-content :deep(code) {
  background-color: rgba(100, 255, 218, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  color: #64ffda;
}

.post-content :deep(pre) {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 重置代码块内的 code 样式 */
.post-content :deep(pre code) {
  background: none;
  padding: 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.6;
}

.post-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #233554;
}
</style>