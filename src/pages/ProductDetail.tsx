import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <div className="row">
        <div className="col-md-5">
          <img src={product.image.replace("public", "")} alt={product.name} />
        </div>
        <div className="col-md-7">
          <h4>{product.price} $</h4>
          <p>{product.description}</p>
          <Link to="/" className="btn btn-secondary">Quay lại</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
