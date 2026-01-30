---
title: 构造合法数列的动态规划解法：从朴素递推到前缀和优化
date: 2026-02-01
description: 深入解析“合法数列计数”问题中两种动态规划思路：直观的 O(n²) 朴素递推与高效的 O(n) 前缀和优化，揭示状态定义的本质，并对比实现细节与思维路径。
---
### 构造合法数列的动态规划解法：从朴素到优化

#### 问题描述
给定一个正整数 `n`，要求构造所有满足以下条件的数列：
- 数列以 `n` 开头；
- 后面每个新数不能超过前一个数的一半（向下取整）；
- 每个不同的数列都算一个（哪怕只是长度不同）。

求：这样的合法数列总共有多少个？

https://www.luogu.com.cn/problem/P1028

#### 方法一：朴素递推

##### 原理
对于每一个数字 `i`，我们考虑它能构成的所有合法数列：
- 直接使用 `[i]` 自己。
- 在后面添加一个不超过 `i/2` 的数字 `j`，然后加上所有以 `j` 开头的合法数列。

因此，我们的递推式可以写作：
```
f(i) = 1 + Σ f(j)，其中 j = 1 到 ⌊i/2⌋
```

##### 实现代码
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> f(n + 1, 0);

    for (int i = 1; i <= n; ++i) {
        f[i] = 1; // 数列 [i] 本身
        for (int j = 1; j <= i / 2; ++j) {
            f[i] += f[j]; // 接上所有以 j 开头的合法数列
        }
    }

    cout << f[n] << endl;
    return 0;
}
```

##### 优点与缺点
- **优点**：逻辑清晰，容易理解和实现。
- **缺点**：时间复杂度为 O(n²)，对于较大的 `n` 可能会超时。

#### 方法二：前缀和优化

##### 原理
注意到在计算 `f(i)` 时，我们需要对 `f(1)` 到 `f(i/2)` 进行求和。为了减少重复计算，我们可以使用**前缀和数组**来存储这些累积值。定义 `prefix[i]` 表示 `f(1) + f(2) + ... + f(i)`，那么有：
```
f(i) = 1 + prefix[i/2]
prefix[i] = prefix[i-1] + f(i)
```

这种方法避免了每次都要重新计算部分和，从而提高了效率。

##### 实现代码
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dp(n + 1), prefix(n + 1);
    for (int i = 1; i <= n; ++i) {
        dp[i] = 1 + prefix[i / 2];
        prefix[i] = prefix[i - 1] + dp[i];
    }
    cout << dp[n] << endl;
    return 0;
}
```