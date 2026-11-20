import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function PeerReview() {

  const [assignments] = useState([
  {
    id: 1,
    title: "DBMS Assignment Unit 3",
    description: "Normalization Questions",
    pages: 5,
    points: 7,
    verification_count: 1,
    file_url:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    title: "Operating Systems Notes",
    description: "CPU Scheduling and Deadlocks",
    pages: 8,
    points: 10,
    verification_count: 2,
    file_url:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 3,
    title: "Java OOP Assignment",
    description: "Inheritance and Polymorphism",
    pages: 3,
    points: 3,
    verification_count: 0,
    file_url:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  }
]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);
const fetchAssignments = async () => {

  const { data, error } = await supabase
    .from("assignments")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  setAssignments(data || []);

  setLoading(false);
};
  const approveAssignment = async (
    assignment
  ) => {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    /* Prevent duplicate reviews */

    const {
      data: existingReview
    } = await supabase
      .from("assignment_reviews")
      .select("*")
      .eq(
        "assignment_id",
        assignment.id
      )
      .eq(
        "reviewer_id",
        user.id
      )
      .maybeSingle();

    if (existingReview) {
      alert(
        "You already reviewed this assignment."
      );
      return;
    }

    /* Insert Review */

    await supabase
      .from("assignment_reviews")
      .insert({
        assignment_id: assignment.id,
        reviewer_id: user.id,
        approved: true,
      });

    /* Reviewer gets 3 points */

    const {
      data: reviewer
    } = await supabase
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .single();

    await supabase
      .from("profiles")
      .update({
        points:
          (reviewer.points || 0) + 3,
      })
      .eq("id", user.id);

    /* Increase verification count */

    const newCount =
      assignment.verification_count + 1;

    const updateData = {
      verification_count: newCount,
    };

    /* Verify after 3 reviews */

    if (newCount >= 3) {

      updateData.verified = true;

      /* Reward uploader */

      const {
        data: owner
      } = await supabase
        .from("profiles")
        .select("points")
        .eq(
          "id",
          assignment.user_id
        )
        .single();

      await supabase
        .from("profiles")
        .update({
          points:
            (owner.points || 0) +
            assignment.points
        })
        .eq(
          "id",
          assignment.user_id
        );
    }

    await supabase
      .from("assignments")
      .update(updateData)
      .eq(
        "id",
        assignment.id
      );

    fetchAssignments();
  };

  return (

    <div className="min-h-screen text-white px-4 py-8">

      {/* Header */}

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        p-8
        max-w-6xl
        mx-auto
        text-center
        "
      >

        <h1 className="text-5xl font-bold text-yellow-400">
          🔍 Peer Review Hub
        </h1>

        <p className="mt-4 text-gray-300">
          Verify assignments uploaded by
          other students and earn
          <span className="text-yellow-400">
            {" "}+3 Points
          </span>
        </p>

      </div>

      {/* Cards */}

      {loading ? (

        <div className="text-center mt-10">
          Loading...
        </div>

      ) : (

        <div
          className="
          max-w-7xl
          mx-auto
          grid
          md:grid-cols-3
          gap-6
          mt-10
          "
        >
          <p className="text-center text-white mt-6">
  Assignments Found: {assignments.length}
</p>
          {assignments.map(
            (assignment) => (

              <div

                key={assignment.id}

                className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                p-6
                "

              >

                <h2 className="text-2xl font-bold text-yellow-400">
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
                    ⭐ Reward :
                    {" "}
                    {assignment.points}
                    {" "}
                    Points
                  </p>

                  <p>
                    ✅ Reviews :
                    {" "}
                    {assignment.verification_count}
                    / 3
                  </p>

                </div>

                {assignment.file_url && (

                  <a
                    href={assignment.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                    block
                    text-center
                    mt-4
                    bg-yellow-400
                    text-black
                    py-2
                    rounded-xl
                    font-bold
                    "
                  >
                    View PDF
                  </a>

                )}

                <button

                  onClick={() =>
                    approveAssignment(
                      assignment
                    )
                  }

                  className="
                  w-full
                  mt-4
                  bg-green-500
                  py-3
                  rounded-xl
                  font-bold
                  hover:bg-green-600
                  "

                >
                  ✅ Verify Assignment
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}
