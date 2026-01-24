<template>
  <div class="blog-container">
    <div class="header">
      <h1>博客文章</h1>
      <NuxtLink to="/" class="back-link">← 返回首页</NuxtLink>
    </div>
    
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">加载失败: {{ error.message }}</div>
    <div v-else-if="posts?.length">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <h2>
          <NuxtLink :to="`/blog${post.path}`" class="post-link">{{ post.title }}</NuxtLink>
        </h2>
        <p class="post-meta">
          发布日期: {{ formatDate(post.meta?.date) }}
        </p>
        <p class="post-excerpt">{{ post.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>暂无文章</p>
    </div>
  </div>
</template>

<script setup>
const { data: posts, pending, error } = await useAsyncData('all-posts', async () => {
  // 使用 queryCollection 查询 content 集合
  const result = await queryCollection('content').all()
  console.log('All posts data:', result) // 调试信息
  
  // 按日期降序排序（最新的在前）
  result.sort((a, b) => {
    const dateA = new Date(a.meta?.date || a.date || a.createdAt || '1970-01-01')
    const dateB = new Date(b.meta?.date || b.date || b.createdAt || '1970-01-01')
    return dateB - dateA // 降序排列
  })
  
  return result
})

function formatDate(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 2rem;
}

.header h1 {
  color: #64ffda;
  font-size: 2rem;
  margin: 0;
}

.back-link {
  color: #64ffda;
  text-decoration: none;
  font-size: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

.post-item {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: rgba(23, 42, 69, 0.5);
  border-radius: 8px;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: 2rem;
  margin-right: 2rem;
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.post-link {
  color: #ccd6f6;
  text-decoration: none;
  font-size: 1.5rem;
}

.post-link:hover {
  color: #64ffda;
  text-decoration: underline;
}

.post-meta {
  color: #8892b0;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.post-excerpt {
  color: #a8b2d1;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .blog-container {
    padding: 1rem 0;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
  
  .post-item {
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1rem;
  }
}
</style>