# RightSense Technologies Project

## Getting Started

This project is built with Vite, React, TypeScript, and Tailwind CSS.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Using [nvm](https://github.com/nvm-sh/nvm) is recommended to manage Node versions.

### Local Development

To get started with local development, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_GIT_URL>
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd <YOUR_PROJECT_NAME>
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    This will start a local server with hot-reloading.
    ```sh
    npm run dev
    ```

## Tech Stack

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Components**: [shadcn-ui](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)

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
    The necessary `predeploy` and `deploy` scripts are already included.
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
