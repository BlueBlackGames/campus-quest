import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  };

  if (!profile)
    return (
      <div className="text-center text-yellow-400 mt-20">
        Loading...
      </div>
    );

  return (
  <div className="relative min-h-screen overflow-hidden">

    {/* Background Image */}
    <div
      className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center"
    />

    {/* Background Blur Layer */}
    <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

    {/* Animated Gradient Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-300/10" />

    {/* Profile Content */}
    <div className="relative z-10 min-h-screen flex justify-center items-center px-4 py-8">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-yellow-400/30 rounded-3xl shadow-[0_0_50px_rgba(250,204,21,0.15)] p-8">

        {/* Profile Header */}
        <div className="flex flex-col items-center">

          <img
            src={
              profile.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.full_name || "Student"
              )}`
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-400/30"
          />

          <h1 className="mt-4 text-4xl font-bold text-yellow-400 text-center">
            {profile.full_name}
          </h1>

          <p className="text-gray-300 mt-2 text-center">
            {profile.email}
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-black/20 rounded-xl p-4 text-center border border-yellow-400/20">
            <div className="text-3xl">⭐</div>
            <h3 className="text-yellow-400 font-bold mt-2">
              {profile.points || 0}
            </h3>
            <p className="text-gray-300 text-sm">
              Points
            </p>
          </div>

          <div className="bg-black/20 rounded-xl p-4 text-center border border-yellow-400/20">
            <div className="text-3xl">🏆</div>
            <h3 className="text-yellow-400 font-bold mt-2">
              {profile.level || 1}
            </h3>
            <p className="text-gray-300 text-sm">
              Level
            </p>
          </div>

        </div>

        {/* Profile Information */}
        <div className="mt-8 space-y-5 text-white">

          <div className="bg-black/20 p-4 rounded-xl border border-yellow-400/10">
            🏫 <span className="text-yellow-400 font-bold">College</span>
            <p className="text-gray-300 mt-1">
              {profile.college_name || "Not Added"}
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-yellow-400/10">
            📚 <span className="text-yellow-400 font-bold">Branch</span>
            <p className="text-gray-300 mt-1">
              {profile.branch || "Not Added"}
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-yellow-400/10">
            🎓 <span className="text-yellow-400 font-bold">Semester</span>
            <p className="text-gray-300 mt-1">
              {profile.semester || "Not Added"}
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-yellow-400/10">
            📝 <span className="text-yellow-400 font-bold">Bio</span>
            <p className="text-gray-300 mt-1">
              {profile.bio || "No bio added yet"}
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-yellow-400/10">
            🚀 <span className="text-yellow-400 font-bold">Skills</span>
            <p className="text-gray-300 mt-1">
              {profile.skills || "No skills added yet"}
            </p>
          </div>

        </div>

        {/* Button */}
        <Link
          to="/profile/edit"
          className="block w-full text-center mt-8 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition duration-300 hover:scale-[1.02]"
        >
          Edit Profile
        </Link>

      </div>

    </div>

  </div>
);
}