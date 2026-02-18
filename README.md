# React Server Components from Scratch

A proof-of-concept implementation of React Server Components (RSC) without a framework like Next.js. Built to understand how RSC works at a low level.

## What it does

- Server components that access a SQLite database directly
- Client components with interactivity (hydration)
- React Flight protocol for streaming serialized components from server to client
- Hybrid rendering: server and client components in the same tree

## Project Structure

```
├── src/
│   ├── App.jsx               # Root component
│   ├── Client.jsx            # Client entry point (browser bootstrap)
│   ├── ClientComponent.jsx   # Client-side interactive component
│   └── ServerComponent.jsx   # Server-side component with DB access
├── server/
│   ├── main.js               # Server entry point
│   └── server.js             # Fastify server + routes
├── public/
│   └── style.css             # Styles
├── dist/                     # Webpack build output
├── index.html                # HTML template
├── webpack.config.js         # Client bundle config
├── babel.config.js           # Babel/JSX config
└── notes.db                  # SQLite database
```

## Requirements

- **Node.js** >= 22
- **React** 19

## Getting Started

Install dependencies:

```bash
npm install
```

Run both processes in separate terminals:

```bash
# Terminal 1 — watch and rebuild client bundle
npm run dev:bundle

# Terminal 2 — run the server
npm run dev:server
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. Browser requests `/` → server returns `index.html`
2. Client JS boots, fetches `/react-flight`
3. Server renders the component tree via `renderToPipeableStream` and streams it using the React Flight protocol
4. Client deserializes the stream with `createFromFetch` and renders the result

## Stack

- **React 19** — server and client components
- **react-server-dom-webpack** — React Flight protocol
- **Fastify** — HTTP server
- **Webpack** — client-side bundling
- **SQLite** — database for server components