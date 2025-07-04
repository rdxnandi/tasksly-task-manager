import { Header, Footer } from "../index.js";

function Layout({ children }) {
  return (
    <div>
      <div className="flex flex-row">
        <Header />
        <div className="w-full min-h-screen">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
