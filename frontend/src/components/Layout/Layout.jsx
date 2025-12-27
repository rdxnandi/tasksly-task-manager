import { Footer, Header, Sidebar } from "../index.js";

export default function Layout({ children }) {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <Header />

        <div className="flex gap-6 w-full">
          {/* Sidebar Section */}
          <Sidebar />
          <div className="w-full min-h-screen">{children}</div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
