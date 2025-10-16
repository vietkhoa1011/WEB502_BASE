import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Product from "./pages/product";
import ProductTable from "./pages/ProductTable";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>

        </Route>
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="customers" element={<h1>customers</h1>} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="product" element={<Product/>} />    
          <Route path="ProductTable" element={<ProductTable/>} />
          <Route path="ProductTable/EditProduct/:id" element={<EditProduct/>} /> 
          <Route path="ProductTable/AddProduct" element={<AddProduct/>} />
          <Route path="reports" element={<h1>Reports</h1>} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} >  
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;