import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    branch: "",
    semester: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      const user = data.user;

      if (user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: user.id,
            full_name: formData.fullName,
            email: formData.email,
            college_name: formData.collegeName,
            branch: formData.branch,
            semester: Number(formData.semester),
            points: 0,
            level: 1,
          });

        if (profileError) throw profileError;
      }

      alert(
        "✅ Account created successfully. Please verify your email if verification is enabled."
      );

      navigate("/");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center relative">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-yellow-400/30 rounded-xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          🎓 Join College Quest
        </h2>

        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full p-3 rounded bg-transparent border border-yellow-400 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-yellow-400 hover:text-yellow-300"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}