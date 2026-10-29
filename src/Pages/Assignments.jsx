import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Assignments() {

  const [view, setView] = useState("list");

  const [assignments, setAssignments] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const calculatePoints = (pages) => {
    if (pages <= 3) return 3;
    if (pages <= 7) return 7;
    return 10;
  };

  const fetchAssignments = async () => {
    const { data } = await supabase
      .from("assignments")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setAssignments(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const points =
      calculatePoints(Number(pages));

    let fileUrl = "";

    if (file) {
      const fileName =
        `${Date.now()}-${file.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("assignment-files")
          .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("assignment-files")
          .getPublicUrl(fileName);

      fileUrl = data.publicUrl;
    }

    const { error } =
      await supabase
        .from("assignments")
        .insert({
          user_id: user.id,
          title,
          description,
          pages: Number(pages),
          points,
          file_url: fileUrl,
        });

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setPages("");

    fetchAssignments();

    setView("list");
  };

  return (
    <div className="min-h-screen text-white px-4 py-8">

      <div className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      p-8
      max-w-6xl
      mx-auto
      ">

        <div className="flex justify-between items-center">

          <h1 className="text-4xl font-bold text-yellow-400">
            📚 Assignment Hub
          </h1>

          <button
            onClick={() =>
              setView(
                view === "list"
                  ? "add"
                  : "list"
              )
            }
            className="
            bg-yellow-400
            text-black
            px-4
            py-2
            rounded-xl
            font-bold
            "
          >
            {view === "list"
              ? "➕ Add Assignment"
              : "📋 View Assignments"}
          </button>

        </div>

      </div>

      {view === "add" && (

        <div className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        p-8
        max-w-4xl
        mx-auto
        mt-8
        ">

          <h2 className="text-2xl text-yellow-400 font-bold mb-6">
            Create Assignment
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className="
              w-full
              p-3
              rounded
              bg-black/20
              border
              border-yellow-400
              "
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
              w-full
              p-3
              rounded
              bg-black/20
              border
              border-yellow-400
              "
            />

            <input
              type="number"
              placeholder="Number of Pages"
              value={pages}
              onChange={(e) =>
                setPages(e.target.value)
              }
              required
              className="
              w-full
              p-3
              rounded
              bg-black/20
              border
              border-yellow-400
              "
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
            />

            <button
              type="submit"
              className="
              bg-yellow-400
              text-black
              px-6
              py-3
              rounded-xl
              font-bold
              "
            >
              Submit Assignment
            </button>

          </form>

        </div>

      )}

      {view === "list" && (

        <div className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-3
        gap-6
        mt-10
        ">

          {assignments.map(
            (assignment) => (

              <div
                key={assignment.id}
                className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-2xl
                p-6
                "
              >

                <h2 className="text-2xl text-yellow-400 font-bold">
                  {assignment.title}
                </h2>

                <p className="mt-3 text-gray-300">
                  {assignment.description}
                </p>

                <div className="mt-4 space-y-2">

                  <p>
                    📄 Pages :
                    {" "}
                    {assignment.pages}
                  </p>

                  <p>
                    ⭐ Points :
                    {" "}
                    {assignment.points}
                  </p>

                  <p>
                    ✅ Status :
                    {" "}
                    {assignment.verified
                      ? "Verified"
                      : "Pending"}
                  </p>

                </div>

                {assignment.file_url && (
                  <a
                    href={
                      assignment.file_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                    block
                    mt-4
                    bg-yellow-400
                    text-black
                    text-center
                    py-2
                    rounded-lg
                    "
                  >
                    View PDF
                  </a>
                )}

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}