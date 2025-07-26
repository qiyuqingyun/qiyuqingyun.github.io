<!-- 文件路径：pages/markdown.vue -->
<template>
  <div class="page-container">
    <div class="content markdown-content">
      <ContentRenderer :value="content" />
      <NuxtLink to="/" class="back-link">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ContentRenderer } from '#components'

// 获取当前路由参数（假设使用动态路由）
const route = useRoute()
// 获取Markdown内容，假设content目录下有example.md
const { data } = await useAsyncData('example', () => 
  $fetch(`/api/_content/query/${route.params.slug || 'example'}`)
)
const content = computed(() => data.value || {})
</script>

<style scoped>
.markdown-content {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #ff69b4;
  text-decoration: none;
  border: 1px solid #ff69b4;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.back-link:hover {
  background-color: #ff69b4;
  color: #1a1a2e;
}
</style>