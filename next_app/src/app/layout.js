'use client'
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Home from "./page";

export default function RootLayout({ children }) {
  return (
    <html>

      <body>
        <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
          <Home/>
        </UserProvider>
      </body>
    </html>
  );
};
