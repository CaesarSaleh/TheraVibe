// 'use client'
// import "./globals.css";
// import { UserProvider } from "@auth0/nextjs-auth0/client";
// import Home from "./page";

// export default function RootLayout({ children }) {
//   return (
//     <html>

//       <body>
//         <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
//           <Home/>
//         </UserProvider>
//       </body>
//     </html>
//   );
// };

import "./globals.css";
// import Home from "./page";

import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  return (
    <>
    <head>
        <link rel="icon" href="icon.png" type="image/png" />
        <title>TheraVibe.VR</title>

    </head>
    <html lang="en">
    <UserProvider>
      <body>{children}</body>
    </UserProvider>
    </html>
    </>
  );
}