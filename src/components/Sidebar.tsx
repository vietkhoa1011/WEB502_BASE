import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style={{ width: "250px",
        height: "100vh", // chiều cao toàn màn hình
        position: "fixed", // cố định bên trái
        top: 0,
        left: 0,
        overflowY: "auto",
     }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">WEB502 Admin</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/admin/ProductTable" className="nav-link text-white">
              ProductTable
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="nav-link text-white">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/product" className="nav-link text-white">
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/customers" className="nav-link text-white">
            Customers
          </Link>
        </li>
        <li>
          <Link to="/admin/reports" className="nav-link text-white">
            Reports
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://i.pravatar.cc/30"
            alt=""
            width="30"
            height="30"
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
