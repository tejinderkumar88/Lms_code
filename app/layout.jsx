import "bootstrap/dist/css/bootstrap.css";
import { Roboto, Sora } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../app/index.css";
import "../styles/custom.css";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";
import NextAuthProvider from "./NextAuthProvider";

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500",  "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Fluentie",
  description: "Educational website",
};

export default async function RootLayout({ children }) {
  // const session = useSession()
  return (
    <html lang="en">
      <body className={` ${sora.variable} ${roboto.variable}`}>
        <StoreProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
