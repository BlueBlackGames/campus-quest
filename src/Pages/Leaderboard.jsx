import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Leaderboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("points", {
        ascending: false,
      });

    if (!error) {
      setUsers(data || []);
    }

    setLoading(false);
  };

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen px-4 py-8 text-white">

      {/* Header */}

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-xl
        rounded-3xl
        p-8
        max-w-5xl
        mx-auto
        text-center
        "
      >
        <h1 className="text-5xl font-bold text-yellow-400">
          🏆 Leaderboard
        </h1>

        <p className="text-gray-300 mt-4">
          Complete assignments, help in peer reviews,
          earn points and climb the rankings.
        </p>
      </div>

      {/* Leaderboard */}

      <div
        className="
        mt-10
        max-w-5xl
        mx-auto
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-xl
        rounded-3xl
        overflow-hidden
        "
      >

        {loading ? (

          <div className="text-center p-10 text-yellow-400">
            Loading Leaderboard...
          </div>

        ) : (

          users.map((user, index) => (

            <div
              key={user.id}
              className="
              flex
              items-center
              justify-between
              p-5
              border-b
              border-white/10
              hover:bg-white/5
              transition
              "
            >

              {/* Left Side */}

              <div className="flex items-center gap-4">

                <div className="text-3xl">
                  {getMedal(index)}
                </div>

                <img
                  src={
                    user.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.full_name || "Student"
                    )}`
                  }
                  alt="profile"
                  className="
                  w-14
                  h-14
                  rounded-full
                  border-2
                  border-yellow-400
                  "
                />

                <div>

                  <h2 className="font-bold text-lg">
                    {user.full_name || "Student"}
                  </h2>

                  <p className="text-gray-300 text-sm">
                    {user.branch || "Branch Not Added"}
                  </p>

                </div>

              </div>

              {/* Right Side */}

              <div className="text-right">

                <div className="text-yellow-400 font-bold text-xl">
                  {user.points || 0}
                </div>

                <div className="text-gray-300 text-sm">
                  Points
                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Bottom Section */}

      <div
        className="
        mt-8
        max-w-5xl
        mx-auto
        text-center
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        p-6
        "
      >
        <h2 className="text-yellow-400 text-2xl font-bold">
          🎯 How To Earn Points?
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-black/20 p-4 rounded-xl">
            📚 Upload Assignments
          </div>

          <div className="bg-black/20 p-4 rounded-xl">
            ✅ Get Assignments Verified
          </div>

          <div className="bg-black/20 p-4 rounded-xl">
            🤝 Review Other Students' Work
          </div>

        </div>

      </div>

    </div>
  );
}