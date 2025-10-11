import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="p-4 bg-light"
        style={{
          marginLeft: "250px", // để tránh đè lên Sidebar
          minHeight: "100vh",  // ✅ đảm bảo luôn cao bằng màn hình
          overflowY: "auto",   // chỉ phần này được cuộn
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
