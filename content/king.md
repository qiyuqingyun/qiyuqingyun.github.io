---
title: 国王游戏：贪心策略的正确性证明与高精度实现
date: 2026-02-11
description: 深入剖析经典贪心问题“国王游戏”的核心思想——为何按 $A_i B_i$ 排序能使最大奖赏最小？从局部交换到全局最优的严格推导，并附完整高精度 C++ 实现。
---
# 国王游戏：贪心策略与高精度实现详解

## 题目回顾

恰逢 H 国国庆，国王邀请 $n$ 位大臣玩一个有奖游戏。每位大臣在左右手上各写一个整数，国王也如此。大臣们排成一排，国王站在最前面。

第 $i$ 位大臣获得的金币数为：
$$
\left\lfloor \frac{\text{国王左手} \times \text{前 } i-1 \text{ 位大臣左手乘积}}{\text{第 } i \text{ 位大臣右手}} \right\rfloor
$$

国王希望重新安排队伍顺序，使得**获得奖赏最多的大臣所获奖赏尽可能少**。

---

## 贪心策略：按 $A_i \times B_i$ 升序排序

### 为什么是 $A_i \times B_i$？

考虑只有两位大臣 $X$ 和 $Y$，国王左手为 $S$(在整体时代表是前面人（国王与大臣）左手乘积)：

- **X 在前，Y 在后**：最大奖赏为 $\max\left(\frac{S}{B_x}, \frac{S A_x}{B_y}\right)$
- **Y 在前，X 在后**：最大奖赏为 $\max\left(\frac{S}{B_y}, \frac{S A_y}{B_x}\right)$

比较两个方案的关键在于：
$$
\frac{S A_x}{B_y} \leq \frac{S A_y}{B_x} \iff A_x B_x \leq A_y B_y
$$

因此，**当 $A_x B_x \leq A_y B_y$ 时，X 放在 Y 前面不会让最大奖赏变大**。

### 从局部到全局：邻项交换论证

假设存在一个最优排列不是按 $A_i B_i$ 升序的，那么其中必然存在相邻逆序对 $(X, Y)$ 满足 $A_x B_x > A_y B_y$。

根据上述局部性质，交换这对大臣不会使最大奖赏变大。通过不断消除逆序对（类似冒泡排序），最终得到按 $A_i B_i$ 升序的排列，其最大奖赏不大于原排列。

因此，**按 $A_i B_i$ 升序排列是全局最优解**。

---

## 重要澄清：最后一个人不一定是最大奖赏！

很多人误以为乘积越来越大，所以最后一个人奖赏最大。这是**错误的**！

### 反例说明

考虑：
- 国王左手：1
- 大臣1：$A=2, B=1$ → $A \times B = 2$
- 大臣2：$A=3, B=100$ → $A \times B = 300$

按 $A_i B_i$ 升序排列：大臣1 → 大臣2

奖赏计算：
- 大臣1：$\frac{1}{1} = 1$
- 大臣2：$\frac{1 \times 2}{100} = 0.02 \to 0$

**最大奖赏是 1（第一个人），最后一个人奖赏为 0！**

> **关键点**：排序的目标是**最小化所有位置中奖赏的最大值**，而不是控制最大值出现在哪个位置。最大值可能出现在任何位置，但我们只关心它的值尽可能小。

---

## 高精度实现细节

由于乘积可能达到 $10^{4000}$，必须使用高精度运算：

- **高精度 × 低精度**：逐位相乘处理进位
- **高精度 ÷ 低精度**：模拟竖式除法
- **高精度比较**：先比长度，再从高位比较

注意：所有 BigInt 内部存储为**低位在前**（如 123 存为 `[3,2,1]`）。

---

## 完整代码实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
using BigInt = vector<int>;

// 高精度 × 低精度
BigInt mul(const BigInt& A, int b) {
    BigInt C;
    int carry = 0;
    for (int i = 0; i < A.size(); ++i) {  
        carry += A[i] * b;
        C.push_back(carry % 10);
        carry /= 10;
    }
    while (carry) {
        C.push_back(carry % 10);
        carry /= 10;
    }
    return C;
}

// 高精度 ÷ 低精度，返回商（低位在前）
BigInt div(const BigInt& A, int b) {
    BigInt C;
    int rem = 0;
    for (int i = (A.size()) - 1; i >= 0; --i) {  // 从高位到低位
        rem = rem * 10 + A[i];
        C.push_back(rem / b);
        rem %= b;
    }
    reverse(C.begin(), C.end());
    while (C.size() > 1 && C.back() == 0)
        C.pop_back();
    return C;
}

bool isGreater(const BigInt& a, const BigInt& b) {
    if (a.size() != b.size())
        return a.size() > b.size();
    for (int i = (a.size()) - 1; i >= 0; --i) {
        if (a[i] != b[i])
            return a[i] > b[i];
    }
    return false;
}

void print(const BigInt& a) {
    for (int i = (a.size()) - 1; i >= 0; --i)
        cout << a[i];
}

struct Minister {
    int a, b;
    bool operator<(const Minister& other) const {
        return  a * b < other.a * other.b;
    }
};

int main() {
    int n;
    cin >> n;
    int king_a, king_b;
    cin >> king_a >> king_b;

    vector<Minister> ministers(n);
    for (int i = 0; i < n; ++i) {
        cin >> ministers[i].a >> ministers[i].b;
    }

    sort(ministers.begin(), ministers.end());

    BigInt product;
    if (king_a == 0) {
        product.push_back(0);
    }
    else {
        int x = king_a;
        while (x) {
            product.push_back(x % 10);
            x /= 10;
        }
    }

    BigInt max_reward = { 0 };

    for (int i = 0; i < n; ++i) {
        BigInt reward = div(product, ministers[i].b);
        if (isGreater(reward, max_reward)) {  
            max_reward = reward;
        }
        product = mul(product, ministers[i].a);
    }

    print(max_reward);
    return 0;
}
```

---

## 总结

1. **贪心策略**：按 $A_i \times B_i$ 升序排序
2. **正确性证明**：通过邻项交换论证，从局部最优推出全局最优
3. **常见误区**：最后一个人不一定获得最大奖赏，排序目标是最小化最大值，而非控制位置
4. **实现要点**：高精度运算处理大数乘积，注意存储格式和边界情况

这道题完美展示了贪心算法的精妙之处：看似简单的排序规则，背后却有严谨的数学证明支撑！