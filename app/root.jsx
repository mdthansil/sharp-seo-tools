import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";
import Layout from "./components/Layout/Layout";

export const meta = () => ({
  charset: "utf-8",
  title: "Sharp SEO Tools",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='font-primary bg-gray-200'>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
