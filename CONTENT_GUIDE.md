# 网站内容管理说明

本站使用 Academic Pages + GitHub Pages，托管和自动发布均免费。推荐用 Pages CMS 管理日常内容，用本地 Git 管理布局或批量修改。

## Pages CMS：日常管理入口

1. 打开 <https://pagescms.org>，使用 GitHub 登录。
2. 选择 `yhpan/yhpan.github.io` 仓库及 `main` 分支。
3. 在左侧选择要编辑的内容，保存后 Pages CMS 会直接生成 Git 提交。
4. GitHub Actions 会自动构建并发布，一般无需手动部署。

Pages CMS 当前可以管理：

- **Author profile**：侧边栏头像、姓名、简介、单位、地点、邮箱和学术/社交链接
- **Site settings**：站点标题、简介、网址和语言
- **Main navigation**：顶部菜单文字、顺序和链接
- **Page introductions**：Notes 与 Jobs 页面的介绍文字
- **Homepage / Research page / Projects page**：主要页面正文
- **Publications**：新增、编辑和删除论文记录
- **New research notes**：新增、编辑和删除 Notes，并设置日期、摘要和多个 Tags
- **Job opportunities**：新增、编辑和删除工作机会

页面布局、筛选程序和主题样式仍由本地 Git 管理，以免内容编辑时意外破坏网站结构。

## Author Profile 在哪里修改

在 Pages CMS 左侧打开 **Author profile** 即可。对应的本地文件为 `_data/profile.yml`。修改并保存后，网站所有页面侧边栏、页脚 GitHub 链接和 Publications 页的 Google Scholar 链接会同步读取这里的数据。

头像可以填写公开图片网址，或填写网站内图片路径，例如 `/images/profile.jpg`。

## Notes 管理

每篇 Note 是 `_posts/` 中一个 Markdown 文件。在 Pages CMS 的 **New research notes** 中填写：

- `title`：标题
- `date`：发布日期
- `excerpt`：列表中的简短摘要
- `tags`：可添加多个标签
- `published`：是否公开
- `body`：正文

网站提供三种浏览方式：

- `/notes/`：按关键词、Tags 和年份筛选
- `/notes/tags/`：按 Tags 聚合
- `/notes/archive/`：按日期归档

旧 Hexo Notes 已迁移为统一的 Academic Pages 文章，同时保留原网址。

## Jobs 管理

在 Pages CMS 的 **Job opportunities** 中维护标题、职位类别、地点、机构、截止日期、申请链接和来源链接。网站只显示列表视图，并提供搜索、职位类型和状态筛选。

状态会在浏览器中自动计算：

- 有截止日期且尚未到期：Active
- 未填写截止日期：No Deadline
- 已过截止日期：Expired

## 本地 Git 发布

在 `D:\Git\yhpan.github.io\yhpan.github.io-main` 修改完成后：

```powershell
git status
git add -A
git commit -m "Update website content"
git push origin main
```

GitHub 仓库的 **Settings → Pages → Build and deployment** 应选择 **GitHub Actions**。

## 本地预览

如果已安装并启动 Docker Desktop：

```powershell
docker compose up
```

浏览器打开 `http://localhost:4000`。停止预览可按 `Ctrl+C`。

## 备份

迁移前的完整旧站保存在同级目录 `D:\Git\yhpan.github.io\yhpan.github.io-legacy-backup`。仓库中的旧 Hexo 静态副本已移除，减少重复文件；原 Notes URL 已由新文章继续承接。
