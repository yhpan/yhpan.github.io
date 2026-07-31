# Yuhao Pan — Academic Website

Source for [yhpan.github.io](https://yhpan.github.io), built with Jekyll and the Academic Pages theme.

## Content

- Author profile: `_data/profile.yml`
- Home, Research, Projects, Notes, and Jobs pages: `_pages/`
- Research notes: `_posts/`
- Publications: `_publications/`
- Job opportunities: `_jobs/`
- Main navigation: `_data/navigation.yml`

Most content can be edited through [Pages CMS](https://pagescms.org). See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the editing and publishing workflow.

## Publishing

Push changes to `main`. The workflow in `.github/workflows/pages.yml` builds and deploys the site to GitHub Pages.

## Local preview

With Docker Desktop running:

```powershell
docker compose up
```

Open `http://localhost:4000`.

## Theme

Based on [Academic Pages](https://github.com/academicpages/academicpages.github.io), itself derived from Minimal Mistakes.
