<template>
  <div class="home-container">
    <h1 class="title">欢迎来到我的博客</h1>
    <p class="subtitle">在这里分享我的技术经验和学习心得</p>
    
    <div class="cta-section">
      <NuxtLink to="/blog" class="blog-button">
        查看所有博客文章
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #64ffda;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #ccd6f6;
}

.cta-section {
  margin: 3rem 0;
}

.blog-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #64ffda, #00a3cc);
  color: #0a192f;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
}

.blog-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(100, 255, 218, 0.5);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>