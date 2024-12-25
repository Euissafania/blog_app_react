import { useEffect } from 'react';
import feather from 'feather-icons'; // Pastikan feather-icons diinstal
import { NavLink } from 'react-router-dom'; // Menggunakan NavLink dari React Router

const Sidebar = () => {
  useEffect(() => {
    feather.replace(); // Inisialisasi Feather Icons setelah render
  }, []);

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              <span data-feather="home"></span>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/myposts">
              <span data-feather="file-text"></span>
              My Posts
            </NavLink>
          </li>
        </ul>
        
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Administrator</span>
        </h6>
        
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
              <span data-feather="grid"></span>
              Posts Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
