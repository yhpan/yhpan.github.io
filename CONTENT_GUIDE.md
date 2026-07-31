# 网站内容管理说明

这个站点基于 Academic Pages，继续使用 GitHub Pages 免费托管。职位、论文和新笔记都以独立的 Markdown 文件保存，因此内容和页面样式彼此分离。

## 推荐：Pages CMS 可视化管理

1. 打开 https://pagescms.org 并使用 GitHub 登录。
2. 选择 `yhpan/yhpan.github.io` 仓库和默认分支。
3. 进入 **Job opportunities**，即可用表单新增、编辑或删除职位。
4. 保存后，Pages CMS 会直接提交到 GitHub；GitHub Pages 随后自动重新构建网站。

职位状态不需要手动维护：

- 有截止日期且尚未到期：Active
- 未填写截止日期：No Deadline
- 已过截止日期：Expired

## 本地 Git 管理

职位文件位于 `_jobs/`。复制任意现有文件，修改标题、职位类型、地点、机构、截止日期和链接即可。日期采用 `YYYY-MM-DD` 格式；没有固定截止日期时留空。

其他主要内容：

- 首页：`_pages/about.md`
- 研究页：`_pages/research.md`
- 项目页：`_pages/projects.md`
- 论文：`_publications/`
- 新研究笔记：`_posts/`
- 顶部导航：`_data/navigation.yml`
- 姓名、头像和社交链接：`_config.yml`

修改后提交并推送到 GitHub。仓库的 GitHub Pages 发布来源需在 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。

## 本地预览

如果电脑已安装 Docker，可在站点目录中使用 Docker Compose 启动预览；页面默认在 `http://localhost:4000` 打开。

## 旧站内容

原 Hexo 文章和所需静态资源保留在原路径，因此旧链接仍可继续访问。迁移前的完整静态站另有一份同级备份目录 `yhpan.github.io-legacy-backup`。
