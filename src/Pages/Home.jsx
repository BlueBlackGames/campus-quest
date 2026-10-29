import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [stats, setStats] = useState({
    students: 0,
    tasks: 0,
    points: 0,
    freelancers: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      // Profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*");

      const totalStudents = profiles?.length || 0;

      const totalPoints =
        profiles?.reduce(
          (sum, profile) =>
            sum + (profile.points || 0),
          0
        ) || 0;

      // Tasks
      const { data: tasks } = await supabase
        .from("tasks")
        .select("id");

      const totalTasks =
        tasks?.length || 0;

      // Freelancers
      const freelancers =
        profiles?.filter(
          (profile) =>
            profile.skills &&
            profile.skills.length > 0
        ).length || 0;

      setStats({
        students: totalStudents,
        tasks: totalTasks,
        points: totalPoints,
        freelancers,
      });

      // Leaderboard
      const { data: topUsers } =
        await supabase
          .from("profiles")
          .select(
            "full_name, points"
          )
          .order(
            "points",
            { ascending: false }
          )
          .limit(5);

      setLeaderboard(topUsers || []);

      // Freelance Jobs
      const { data: jobsData } =
        await supabase
          .from("freelance_jobs")
          .select("*")
          .limit(3);

      setJobs(jobsData || []);

    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    {
      title: "Assignments",
      icon: "📚",
      desc: "Complete assignments and earn rewards.",
    },
    {
      title: "Skill Development",
      icon: "💻",
      desc: "Coding, design and learning tasks.",
    },
    {
      title: "Campus Events",
      icon: "🎉",
      desc: "Participate in events and competitions.",
    },
    {
      title: "Freelancing",
      icon: "🚀",
      desc: "Work for students and earn points.(currently under development)",
    },
  ];

  return (
    <div className="min-h-screen text-white">
        
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div
  className="
  rounded-3xl
  p-10
  text-center
  bg-white/10
  backdrop-blur-xl
  border
  border-white/20
  shadow-xl
  "
>

          <h1 className="text-5xl md:text-7xl font-bold text-yellow-400">
            🎓 Campus Quest
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Complete Tasks • Earn Points • Build Skills
          </p>

          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
            A student-powered platform where
            college students complete tasks,
            freelance for others,
            participate in events,
            and climb the leaderboard.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">

            <Link
              to="/tasks"
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
            >
              Explore Tasks
            </Link>

            <Link
              to="/profile"
              className="border border-yellow-400 px-6 py-3 rounded-xl"
            >
              My Profile
            </Link>

          </div>

        </div>
      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="
p-6
rounded-xl
text-center
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
">
            <div className="text-4xl">
              👨‍🎓
            </div>

            <h2 className="text-yellow-400 text-2xl font-bold mt-2">
              {stats.students}
            </h2>

            <p>Students</p>
          </div>

          <div className="
p-6
rounded-xl
text-center
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
">
            <div className="text-4xl">
              📌
            </div>

            <h2 className="text-yellow-400 text-2xl font-bold mt-2">
              {stats.tasks}
            </h2>

            <p>Tasks</p>
          </div>

          <div className="
p-6
rounded-xl
text-center
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
">
            <div className="text-4xl">
              ⭐
            </div>

            <h2 className="text-yellow-400 text-2xl font-bold mt-2">
              {stats.points}
            </h2>

            <p>Points Earned</p>
          </div>

          <div className="
p-6
rounded-xl
text-center
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
">
            <div className="text-4xl">
              🚀
            </div>

            <h2 className="text-yellow-400 text-2xl font-bold mt-2">
              {stats.freelancers}
            </h2>

            <p>Freelancers</p>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-4 py-20">

        <h2 className="text-4xl text-center font-bold text-yellow-400 mb-10">
          Explore Categories
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 text-center"
            >

              <div className="text-5xl">
                {cat.icon}
              </div>

              <h3 className="mt-4 text-yellow-400 font-bold text-xl">
                {cat.title}
              </h3>

              <p className="mt-3 text-gray-300">
                {cat.desc}
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* FREELANCE JOBS */}

      <section className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl text-center text-yellow-400 font-bold mb-10">
          🚀 Freelance Opportunities
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="
rounded-xl
p-6
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
"
            >

              <h3 className="text-xl font-bold">
                {job.title}
              </h3>

              <p className="text-gray-300 mt-3">
                {job.description}
              </p>

              <p className="mt-4 text-yellow-400 font-bold">
                Reward:
                {" "}
                {job.reward_points}
                {" "}
                Points
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* LEADERBOARD */}

      <section className="max-w-5xl mx-auto px-4 py-20">

        <h2 className="text-4xl text-center text-yellow-400 font-bold mb-10">
          🏆 Top Students
        </h2>

        <div className="
rounded-2xl
overflow-hidden
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
">

          {leaderboard.map((student, index) => (

            <div
              key={index}
              className="flex justify-between p-5 border-b border-white/10"
            >

              <span>
                #{index + 1}
                {" "}
                {student.full_name}
              </span>

              <span className="text-yellow-400 font-bold">
                {student.points || 0}
                {" "}
                pts
              </span>

            </div>

          ))}
        </div>
      </section>

      {/* FOOTER */}

      <section className="pb-12 px-4">

        <div className="
p-8
rounded-2xl
max-w-5xl
mx-auto
text-center
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-xl
"
>

          <h2 className="text-3xl font-bold text-yellow-400">
            Why Campus Quest?
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div>✅ Earn Rewards</div>
            <div>✅ Build Portfolio</div>
            <div>✅ Learn Skills</div>
            <div>✅ Collaborate</div>

          </div>
        </div>

      </section>

    </div>
  );
}