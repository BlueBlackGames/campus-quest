import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const profileImage =
    user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.email || "Student"
    )}&background=facc15&color=000000`;

  return (
    <nav className="w-full bg-black/40 backdrop-blur-md shadow-lg fixed top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Campus Quest"
            className="h-10 w-10 object-contain transition-transform duration-300 hover:scale-110"
          />

          <span className="text-xl font-bold text-yellow-400 tracking-wide">
            cAmpus-QuESt
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white font-medium">

          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/tasks"
            className="hover:text-yellow-400 transition duration-300"
          >
            Tasks
          </Link>

          <Link
            to="/profile"
            className="hover:text-yellow-400 transition duration-300"
          >
            Profile
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-400 transition duration-300"
          >
            Contact
          </Link>

        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <>
              <img
                src={profileImage}
                alt="Profile"
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover cursor-pointer hover:scale-110 transition duration-300"
              />

              <span className="text-sm text-yellow-400 font-semibold max-w-[180px] truncate">
                {user.email}
              </span>

              <button
                onClick={onLogout}
                className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold hover:bg-yellow-500 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition duration-300"
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile Section */}
        <div className="md:hidden flex items-center gap-3">

          {user && (
            <img
              src={profileImage}
              alt="Profile"
              onClick={() => navigate("/profile")}
              className="
w-36
h-36
rounded-full
border-4
border-yellow-400
shadow-lg
shadow-yellow-400/30
hover:scale-105
transition
duration-300
"

            />
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/70 backdrop-blur-md text-white px-4 py-4 space-y-3">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            to="/tasks"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-400"
          >
            Tasks
          </Link>

          {user && (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block hover:text-yellow-400"
            >
              Profile
            </Link>
          )}

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-400"
          >
            Contact
          </Link>

          {user ? (
            <>
              <div className="text-yellow-400 text-sm break-all">
                {user.email}
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition duration-300"
            >
              Login
            </Link>
          )}

        </div>
      </div>

    </nav>
  );
}