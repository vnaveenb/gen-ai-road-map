# GenAI Roadmap Web App

This Astro app renders the roadmap library from markdown files and is ready for Docker + GitHub CI/CD deployment to OMV Portainer.

## Local commands

Run from this folder:

```powershell
npm.cmd install
npm.cmd run dev
```

Production build test:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Docker

### Files
- [Dockerfile](Dockerfile)
- [deploy/nginx.conf](deploy/nginx.conf)
- [.dockerignore](.dockerignore)

### Build image locally

```powershell
cd web
docker build -t genai-roadmap-web:local .
docker run --rm -p 8088:80 genai-roadmap-web:local
```

Then open `http://localhost:8088`.

## GitHub CI/CD

### Workflows
- [.github/workflows/web-ci.yml](../.github/workflows/web-ci.yml): builds app on PR/push.
- [.github/workflows/web-docker-publish.yml](../.github/workflows/web-docker-publish.yml): builds and pushes image to GHCR on push to `main` or `master`.

### Published image

Image is published as:

```text
ghcr.io/<github-owner-lowercase>/genai-roadmap-web:latest
```

It also publishes commit SHA tags (`sha-...`).

### Where the image appears in GitHub

GHCR images show up in **Packages**, not in repository files.

Use one of these package pages:

- User-owned repo: `https://github.com/users/<owner-lowercase>/packages/container/genai-roadmap-web`
- Org-owned repo: `https://github.com/orgs/<org-lowercase>/packages/container/genai-roadmap-web`

### If workflow ran but no image is visible

1. Open Actions and confirm **web-docker-publish** succeeded (not only **web-ci**).
2. In repository Settings > Actions > General, set Workflow permissions to **Read and write permissions**.
3. Open the web-docker-publish run summary and copy the exact pushed tag (`latest` or `sha-...`).
4. In Portainer registry credentials for `ghcr.io`, use GitHub username + PAT with `read:packages`.
5. If package is private, keep credentials in Portainer; if public, unauthenticated pull can work.

### Optional secret for auto-redeploy

If you want GitHub push to trigger Portainer redeploy automatically, add repo secret:

- `PORTAINER_WEBHOOK_URL` = your Portainer stack webhook URL

If secret is missing, image is still published and you can redeploy manually from Portainer.

## OMV Portainer deployment

### Stack template

Use:
- [deploy/portainer-stack.yml](deploy/portainer-stack.yml)
- [deploy/portainer-env.example](deploy/portainer-env.example)

### Steps

1. In Portainer, create registry credentials for `ghcr.io`.
2. Use GitHub username + personal access token (scope: `read:packages`) if package is private.
3. Create stack from [deploy/portainer-stack.yml](deploy/portainer-stack.yml).
4. Set env vars in Portainer:
	- `GHCR_IMAGE=ghcr.io/your-github-username/genai-roadmap-web`
	- `IMAGE_TAG=latest`
	- `APP_PORT=8088`
5. Deploy stack.

If you use Cloudflare Tunnel in same Docker network, route tunnel service to `http://genai-roadmap-web:80` and you may remove host port mapping.

## Notes

- Node requirement is `>=22.12.0` in [package.json](package.json).
- This app is static output served by Nginx in production.
