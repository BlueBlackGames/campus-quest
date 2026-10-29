import { useNavigate, useLocation } from "react-router-dom";

export default function ComingSoon() {

  const navigate = useNavigate();

  const location = useLocation();

  const feature =
    location.state?.feature ||
    "This Feature";

  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        p-10
        max-w-2xl
        w-full
        text-center
        shadow-xl
        "
      >

        <div className="text-7xl">
          🚧
        </div>

        <h1 className="text-5xl font-bold text-yellow-400 mt-4">
          Coming Soon
        </h1>

        <h2 className="text-2xl text-white mt-4">
          {feature}
        </h2>

        <p className="text-gray-300 mt-6 leading-relaxed">

          We're currently building this
          section for Campus Quest.

          Future updates will bring
          exciting activities, rewards,
          collaboration opportunities,
          and much more.

        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">

          <div className="
          bg-black/20
          rounded-xl
          p-4
          ">
            💻
            <p className="mt-2">
              Coding Challenges
            </p>
          </div>

          <div className="
          bg-black/20
          rounded-xl
          p-4
          ">
            🎉
            <p className="mt-2">
              Campus Events
            </p>
          </div>

          <div className="
          bg-black/20
          rounded-xl
          p-4
          ">
            🚀
            <p className="mt-2">
              Freelancing Hub
            </p>
          </div>

        </div>

        <button

          onClick={() => navigate("/")}

          className="
          mt-8
          bg-yellow-400
          text-black
          px-8
          py-3
          rounded-xl
          font-bold
          hover:bg-yellow-500
          transition
          "

        >
          🏠 Back Home
        </button>

      </div>

    </div>

  );
}