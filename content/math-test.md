---
title: LaTeX 数学公式测试
date: 2025-09-30
description: 这篇文章用于测试 Markdown 中 LaTeX 数学公式的渲染效果。
---

# LaTeX 数学公式测试

在这篇文章中,我们将测试各种 LaTeX 数学公式的渲染效果。

## 行内公式

这是一个行内公式示例:质能方程 $E = mc^2$ 由爱因斯坦提出。

圆的面积公式为 $A = \pi r^2$,其中 $r$ 是半径。

勾股定理:$a^2 + b^2 = c^2$

## 块级公式

### 二次方程求根公式

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### 积分公式

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

### 求和公式

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 矩阵

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

### 极限

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

### 偏微分方程

$$
\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}
$$

## 希腊字母

行内希腊字母:$\alpha, \beta, \gamma, \delta, \epsilon, \theta, \lambda, \mu, \pi, \sigma, \omega$

块级希腊字母展示:

$$
\Alpha, \Beta, \Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
$$

## 复杂公式

### 傅里叶变换

$$
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} \, dt
$$

### 麦克斯韦方程组

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### 薛定谔方程

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
$$

## 总结

通过这篇文章,我们可以测试网站对 LaTeX 数学公式渲染的支持,包括行内公式和块级公式,以及各种复杂的数学表达式。
