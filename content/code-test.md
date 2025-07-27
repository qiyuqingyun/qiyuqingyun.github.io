---
title: 代码渲染测试
date: 2025-07-27
description: 这篇文章用于测试 Markdown 中各种编程语言代码的渲染效果。
---

# 代码渲染测试

在这篇文章中，我们将测试多种编程语言的代码渲染效果。

## JavaScript 示例

```javascript
function helloWorld() {
  console.log('Hello, World!');
}

const person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
};

helloWorld();
```

## Python 示例

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

person = Person("Alice", 25)
print(person.greet())
```

## Java 示例

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}
```

## CSS 示例

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
```

## HTML 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>代码渲染测试</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="title">欢迎来到代码渲染测试页面</h1>
        <button class="button" onclick="handleClick()">点击我</button>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

## Vue 示例

```vue
<template>
  <div class="counter">
    <h1>{{ title }}</h1>
    <p>计数器: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      title: 'Vue 计数器示例',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
}
</script>

<style scoped>
.counter {
  text-align: center;
  padding: 20px;
}

.counter h1 {
  color: #42b983;
}
</style>
```

## 总结

通过这篇文章，我们可以测试网站对各种编程语言代码块的渲染效果，确保代码高亮功能正常工作。