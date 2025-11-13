# Better Auth Next.js Lab

This repository serves as a Next.js laboratory for experimenting with the `better-auth` authentication library. It demonstrates a basic implementation of user authentication flows, including sign-up and sign-in, within a Next.js application.

## Features

*   **Next.js Framework:** Leverages the latest features of Next.js for a robust and scalable web application.
*   **Better Auth Integration:** Implements authentication using the `better-auth` library.
*   **User Authentication:** Provides sign-up and sign-in functionalities.
*   **Database:** Uses `better-sqlite3` for local data storage.
*   **Form Management:** Utilizes `react-hook-form` for efficient form handling and validation.
*   **Schema Validation:** Employs `zod` for robust data validation.
*   **Styling:** Styled with `tailwindcss` for a modern and responsive UI.
*   **Custom Auth API:** Includes a custom API route for authentication handling.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   bun (or npm/yarn)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/itsgitz/nextjs-lab.git
    cd nextjs-lab/better-auth
    ```
2.  Install dependencies:
    ```bash
    bun install
    # or npm install
    # or yarn install
    ```

### Running the Development Server

1.  Start the development server:
    ```bash
    bun run dev
    # or npm run dev
    # or yarn dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
better-auth/
├───.next/
├───app/
│   ├───api/
│   │   └───auth/
│   │       └───[...all]/
│   │           └───route.ts  # Custom authentication API route
│   ├───signin/
│   │   └───page.tsx          # Sign-in page
│   └───signup/
│       ├───actions.tsx       # Server actions for sign-up
│       └───page.tsx          # Sign-up page
├───lib/
│   ├───auth-client.ts        # Client-side authentication utilities
│   ├───auth.ts               # Server-side authentication logic
│   └───types/
│       └───schema/
│           ├───sign-in.ts    # Zod schema for sign-in
│           └───sign-up.ts    # Zod schema for sign-up
├───better-auth_migrations/   # Database migrations
├───public/                   # Static assets
├───next.config.ts            # Next.js configuration
├───package.json              # Project dependencies and scripts
├───postcss.config.mjs        # PostCSS configuration
├───proxy.ts                  # Proxy configuration (if any)
├───README.md                 # This README file
├───tailwind.config.ts        # Tailwind CSS configuration
└───tsconfig.json             # TypeScript configuration
```

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!