import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/login" className="brand">DeskSpot</Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
