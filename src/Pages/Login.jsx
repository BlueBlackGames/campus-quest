import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  onLogin(user);

  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_completed")
    .eq("id", user.id)
    .single();

  if (!profile?.profile_completed) {
    navigate("/profile");
  } else {
    navigate("/");
  }
};


  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // ✅ must match Supabase config
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Sign in with Google
        </button>

        {/* Links */}
        <div className="mt-4 text-center space-y-2">
          <Link
            to="/signup"
            className="text-yellow-400 hover:text-yellow-300 transition duration-300 block"
          >
            Create New Account
          </Link>
          <Link
            to="/reset-password"
            className="text-yellow-400 hover:text-yellow-300 transition duration-300 block"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
