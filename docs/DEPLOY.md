Deploying to GitHub Pages (Vite React app)

1) Repo & branch
- This workflow publishes the `dist/` folder to the `gh-pages` branch when you push to `main`.

2) Add your custom domain
- Replace the `CNAME` file in project root with your domain (for example `www.example.com` or `example.com`). Commit and push.

3) DNS configuration (on Yachay)
- Create an A record for `@` pointing to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- If you prefer using `www`, create a CNAME record for `www` pointing to `<your-github-username>.github.io` (e.g. `vortex-56.github.io`).

4) GitHub repository settings
- On GitHub, go to Settings -> Pages and make sure `gh-pages` is selected as the publishing branch and your domain is listed.

5) Secrets
- The workflow uses `GITHUB_TOKEN` automatically provided by Actions. No extra secret needed for basic GitHub Pages deploy.

6) Trigger
- Push to `main` to trigger the workflow and publish.

Notes
- If you want me to set the actual domain in the `CNAME` file here, provide the domain and I will update the file.
- If you want automatic redirects and HTTPS, wait a few minutes after DNS changes and GitHub Pages will provision TLS.
