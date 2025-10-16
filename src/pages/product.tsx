import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/products?_page=${page}&_limit=8&title_like=${search}`)
      .then((res) => {
        const total = res.headers.get("X-Total-Count"); // json-server trả tổng số sản phẩm
        if (total) setTotalPages(Math.ceil(Number(total) / 8));
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [page, search]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Danh sách sản phẩm</h2>

      {/* Tìm kiếm */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset về page 1 khi tìm
          }}
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card h-100">
              <img src={p.image} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <p><b>{p.price} $</b></p>
                <Link to={`/products/${p.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
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

export default Product;
