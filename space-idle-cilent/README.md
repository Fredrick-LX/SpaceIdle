# Space Idle 前端项目

本项目基于 Vue 3、TypeScript 和 Vite 构建，是 Space Idle 游戏的前端部分。

## 技术栈

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- 其他依赖请查看 `package.json`

## 项目结构

```
space-idle-cilent/
├── public/             # 静态资源
├── src/                # 源码目录
│   ├── assets/         # 图片等资源
│   ├── components/     # 组件
│   ├── views/          # 页面视图
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   └── main.ts         # 入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 安装依赖

```bash
npm install
```

## 本地开发

```bash
npm run dev
```

启动后访问 [http://localhost:5173](http://localhost:5173) 查看项目。

## 项目打包

```bash
npm run build
```

打包后的文件位于 `dist/` 目录。

## 代码规范

- 推荐使用 [VSCode](https://code.visualstudio.com/) 编辑器，配合 Volar 插件获得最佳 TypeScript 支持。
- 组件统一使用 `<script setup lang="ts">` 语法糖。
- 建议遵循 Vue 官方风格指南。

## 其他

如需更多帮助，请查阅 [Vue 官方文档](https://vuejs.org/) 或 [Vite 官方文档](https://vitejs.dev/)。
