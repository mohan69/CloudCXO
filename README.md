# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/669b6a5b-c5a7-41cc-9630-658c02d5473a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/669b6a5b-c5a7-41cc-9630-658c02d5473a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

This project can be deployed to GitHub Pages using the `gh-pages` package.

### One-Time Configuration

Before your first deployment, you need to configure your project.

1.  **Set `homepage` in `package.json`**:
    Open your `package.json` and add a `homepage` property, pointing to your live site's URL.
    ```json
    "homepage": "https://<your-github-username>.github.io/<your-repo-name>"
    ```

2.  **Add deployment scripts to `package.json`**:
    Add `predeploy` and `deploy` scripts to the `scripts` section.
    ```json
    "scripts": {
      //... other scripts
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

3.  **Configure `vite.config.js`**:
    Set the `base` option in your `vite.config.js` to your repository name.
    ```javascript
    // https://vitejs.dev/config/
    export default defineConfig({
      //...
      base: '/<your-repo-name>/',
    })
    ```

### Deploying

After committing and pushing your changes, run the following command to deploy your application:

```sh
npm run deploy
```

This will build your project and publish it to the `gh-pages` branch. Your site will be available at the URL you set in the `homepage` property.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/669b6a5b-c5a7-41cc-9630-658c02d5473a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
