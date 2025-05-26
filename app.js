import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>动态博客</h1>
      </header>
      <main>
        <PostList />
      </main>
    </div>
  );
}

function PostList() {
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // 使用GitHub API获取文章数据（通过代理）
    fetch('/api/repos/qiyuqingyun/qiyuqingyun.github.io/contents/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('网络响应失败');
        }
        return response.json();
      })
      .then(data => {
        // 解码Base64内容
        const decodedPosts = data.map(file => ({
          id: file.sha,
          title: atob(file.content.split('\n').slice(0, 1).join('')) // 获取第一行作为标题
        }));
        setPosts(decodedPosts);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {posts.length === 0 ? (
        <p>加载中...</p>
      ) : (
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <h2>{post.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;