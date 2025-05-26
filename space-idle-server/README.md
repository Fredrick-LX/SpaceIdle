# Space Idle 后端服务

## 项目简介
本项目为 Space Idle 游戏的后端服务，基于 Node.js + Express + Socket.io 实现，负责用户注册、登录、密码重置等基础功能，数据持久化采用 LevelDB。

## 技术栈
- Node.js
- TypeScript
- Express
- Socket.io
- LevelDB
- pnpm（包管理）

## 环境要求
- Node.js 18 及以上版本
- pnpm 10 及以上版本

## 安装与运行
1. 安装依赖：
   ```bash
   pnpm install
   ```
2. 编译 TypeScript（可选，开发时可用 ts-node 直接运行）：
   ```bash
   pnpm exec tsc
   ```
3. 启动服务：
   ```bash
   pnpm start
   ```
   默认监听端口为 3000。

## 主要功能/API 说明
所有功能通过 Socket.io 实现，前端需通过 Socket.io 客户端与后端通信。

- `register` 注册
  - 参数：`username`, `email`, `password`, `confirmPassword`
  - 返回：注册成功/失败信息
- `login` 登录
  - 参数：`email`, `password`
  - 返回：登录成功/失败信息及用户基本信息
- `reset-password` 重置密码
  - 参数：`email`, `oldPassword`, `newPassword`, `confirmPassword`
  - 返回：重置结果
- `send-reset-email` 发送重置密码邮件（模拟）
  - 参数：`email`
  - 返回：发送结果

## 目录结构
```
space-idle-server/
├── node_modules/         # 依赖包
├── src/
│   └── index.ts          # 主入口文件
├── package.json          # 项目依赖与脚本
├── pnpm-lock.yaml        # pnpm锁定文件
├── tsconfig.json         # TypeScript 配置
└── README.md             # 项目说明
```

## 其他说明
- 用户数据存储于本地 LevelDB 数据库（`./db` 目录）。
- 仅为演示用途，未做安全加密处理，生产环境请务必加强安全措施。
- 如需扩展更多 API 或功能，请在 `src/index.ts` 中添加。
