import { Footer, Header, Sidebar } from "../index.js";

export default function Layout({ children }) {
  return (
    <div>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col gap-6 w-full">
          <Header />
          <div className="w-full min-h-screen">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
