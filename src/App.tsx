import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Product from "./pages/product";
import Dashboard from "./pages/Dashboard";


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
          <Route path="dashboard" element={<Dashboard/>} />
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