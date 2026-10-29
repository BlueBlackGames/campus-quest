import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProductId from "./Pages/ProductId";
import CategoryDetail from "./Pages/CategoryDetail";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import { supabase } from "./supabaseClient";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import OrdersListAdmin from "./Pages/Admin/OrdersList"; // admin orders
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
//import OrdersPage from "./Pages/OrdersPage"; // optional: user orders

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } =
supabase.auth.onAuthStateChange(
async (_event, session) => {

  const currentUser = session?.user;

  setUser(currentUser ?? null);

  if (currentUser) {

    await supabase
      .from("profiles")
      .upsert({
        id: currentUser.id,

        email: currentUser.email,

        full_name:
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.name ||
          "",

        avatar_url:
          currentUser.user_metadata?.avatar_url ||

          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            currentUser.email
          )}`
      });

  }
});

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
return (
  <div className="app-overlay text-white">

    <Navbar
      user={user}
      onLogout={handleLogout}
    />

    <main className="pt-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/products/:id" element={<CategoryDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<OrdersListAdmin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </main>

  </div>
);
}
