import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="text-lg font-bold hover:text-primary transition-colors">
            RightSense Technologies
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;