import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Assignments",
      icon: "📚",
      desc: "Complete academic work and earn points.",
    },
    {
      id: 2,
      name: "Coding",
      icon: "💻",
      desc: "Programming challenges and projects.(Currently Under Construction)",
    },
    {
      id: 3,
      name: "Campus Events",
      icon: "🎉",
      desc: "Participate in workshops and competitions.(Currently Under Construction)",
    },
    {
      id: 4,
      name: "Freelancing",
      icon: "🚀",
      desc: "Work for fellow students and earn rewards.(Currently Under Construction)",
    },
  ];

  return (
    <div className="min-h-screen text-white px-4 py-8">

      <div className="glass-card max-w-5xl mx-auto rounded-3xl p-8 text-center">

        <h1 className="text-5xl font-bold text-yellow-400">
          🎯 Task Hub
        </h1>

        <p className="text-gray-300 mt-4">
          Choose a category, complete tasks,
          earn points and improve your ranking.
        </p>

      </div>

      <div className="max-w-7xl mx-auto mt-12 grid md:grid-cols-4 gap-6">

        {categories.map((cat) => (

          <div
            key={cat.id}
            onClick={() =>
              navigate(
                `/tasks/${cat.name.toLowerCase()}`
              )
            }
            className="glass-card rounded-2xl p-6 cursor-pointer hover:scale-105 transition"
          >

            <div className="text-6xl text-center">
              {cat.icon}
            </div>

            <h2 className="text-2xl text-yellow-400 text-center mt-4 font-bold">
              {cat.name}
            </h2>

            <p className="mt-4 text-gray-300 text-center">
              {cat.desc}
            </p>

          </div>

        ))}
      </div>

    </div>
  );
}