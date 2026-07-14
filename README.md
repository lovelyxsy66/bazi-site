# 玄衡八字排盘

静态八字排盘网页，包含个人排盘、二人合宫和深层四柱解析页面。

## 本地构建

```bash
npm install
npm run build
```

构建结果会输出到 `dist/`。

## GitHub Pages 部署

仓库已包含 `.github/workflows/pages.yml`。推送到 `main` 分支后，GitHub Actions 会自动运行构建并部署 `dist/` 到 GitHub Pages。
