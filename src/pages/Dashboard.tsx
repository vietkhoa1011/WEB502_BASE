import { useEffect, useState } from "react";

function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      <div className="row mb-3">
        <div className="col-md-3">
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
