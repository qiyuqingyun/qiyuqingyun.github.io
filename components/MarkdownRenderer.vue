<template>
  <div class="markdown-container">
    <div class="markdown-content">
      <ContentRenderer :value="value" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.markdown-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.markdown-content {
  background-color: rgba(0, 0, 0, 0.7); /* 半透明黑色背景 */
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 1200px; /* 增加最大宽度 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-align: left;
  backdrop-filter: blur(5px); /* 模糊背景效果 */
}

/* Markdown 内容样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  color: #fff;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-content :deep(h1) {
  font-size: 2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.markdown-content :deep(h2) {
  font-size: 1.7rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.4rem;
}

.markdown-content :deep(p) {
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  color: #e0e0e0;
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(a) {
  color: #64ffda;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(code) {
  background-color: rgba(100, 255, 218, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  color: #64ffda;
}

/* 代码块样式 */
.markdown-content :deep(pre) {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 重置代码块内的 code 样式 */
.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.6;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #64ffda;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background-color: rgba(100, 255, 218, 0.05);
  color: #ccc;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: 0.75rem;
  border: 1px solid #333;
  color: #e0e0e0;
}

.markdown-content :deep(th) {
  background-color: rgba(34, 34, 34, 0.8);
  font-weight: bold;
}

/* 修改图片样式 */
.markdown-content :deep(img) {
  /* 确保图片不会超出容器 */
  max-width: 100%;
  /* 自动调整高度以保持比例 */
  height: auto;
  /* 防止行内元素间距问题 */
  display: block;
  /* 居中显示 */
  margin: 1rem auto;
  /* 移除背景颜色和内边距 */
  background: none;
  padding: 0;
}

.markdown-content :deep(div[style*="text-align: center;"] img) {
  display: inline-block;
  margin: 1rem auto;
}

.markdown-content :deep(iframe) {
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 8px;
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .markdown-content {
    padding: 1rem;
  }
  
  .markdown-content :deep(h1) {
    font-size: 1.6rem;
  }
  
  .markdown-content :deep(h2) {
    font-size: 1.4rem;
  }
  
  .markdown-content :deep(h3) {
    font-size: 1.2rem;
  }
  
  .markdown-content :deep(iframe) {
    height: 300px;
  }
}
</style>