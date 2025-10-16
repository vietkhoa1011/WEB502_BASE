import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  useEffect(() => {
    // Tạo query string linh hoạt
    const params = new URLSearchParams();
    params.append("_page", String(page));
    params.append("_limit", "10");
    if (search) params.append("title_like", search);
    if (minPrice) params.append("price_gte", minPrice);
    if (maxPrice) params.append("price_lte", maxPrice);

    fetch(`http://localhost:3000/products?${params.toString()}`)
      .then((res) => {
        const total = res.headers.get("X-Total-Count");
        if (total) setTotalPages(Math.ceil(Number(total) / 10));
        return res.json();
      })
      .then((data) => setProducts(data));
  }, [page, search, minPrice, maxPrice]);

  return (
    <div className="container mt-4">
      <h2>Danh sách sản phẩm</h2>

      {/* Bộ lọc */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-3 d-flex align-items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="form-control"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            placeholder="Giá từ..."
            className="form-control"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            placeholder="Đến..."
            className="form-control"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-3 text-end">
          <Link to="/admin/ProductTable/AddProduct" className="btn btn-primary">
            Thêm
          </Link>
        </div>
      </div>

      {/* Bảng danh sách */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá ($)</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                Không có sản phẩm
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>
                  <Link
                    to={`/admin/ProductTable/EditProduct/${p.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Sửa
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <li
              key={num}
              className={`page-item ${num === page ? "active" : ""}`}
              onClick={() => setPage(num)}
            >
              <button className="page-link">{num}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default ProductTable;
