import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function EditProfile() {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    college_name: "",
    branch: "",
    semester: "",
    bio: "",
    skills: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setFormData({
        full_name:
          data.full_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          "",

        college_name: data.college_name || "",
        branch: data.branch || "",
        semester: data.semester || "",
        bio: data.bio || "",
        skills: data.skills || "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("profiles")
      .update({
        ...formData,
        profile_completed: true,
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
    } else {
      alert("✅ Profile Updated Successfully");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/background.jpg')] bg-cover bg-center flex justify-center items-center relative px-4">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-md border border-yellow-400/30 shadow-2xl p-8">

        <div className="flex flex-col items-center mb-6">

          <img
            src={
              user?.user_metadata?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                formData.full_name || "Student"
              )}`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover"
          />

          <h2 className="text-3xl text-yellow-400 font-bold mt-4">
            Student Profile
          </h2>

          <p className="text-gray-200 mt-2">
            {user?.email}
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                full_name: e.target.value,
              })
            }
            className="w-full p-3 bg-transparent border border-yellow-400 rounded text-white"
          />

          <input
            type="text"
            placeholder="College Name"
            value={formData.college_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                college_name: e.target.value,
              })
            }
            className="w-full p-3 bg-transparent border border-yellow-400 rounded text-white"
          />

          <input
            type="text"
            placeholder="Branch"
            value={formData.branch}
            onChange={(e) =>
              setFormData({
                ...formData,
                branch: e.target.value,
              })
            }
            className="w-full p-3 bg-transparent border border-yellow-400 rounded text-white"
          />

          <input
            type="number"
            placeholder="Semester"
            value={formData.semester}
            onChange={(e) =>
              setFormData({
                ...formData,
                semester: e.target.value,
              })
            }
            className="w-full p-3 bg-transparent border border-yellow-400 rounded text-white"
          />

          <textarea
            rows="4"
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) =>
              setFormData({
                ...formData,
                bio: e.target.value,
              })
            }
            className="w-full p-3 bg-transparent border border-yellow-400 rounded text-white"
          />

          <input
            type="text"
            placeholder="Skills"
            value={formData.skills}
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value,
              })
            }
            className="w-full p-3 bg-transparent border border-yellow-400 rounded text-white"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition"
          >
            Save Profile
          </button>

        </form>

      </div>
    </div>
  );
}
