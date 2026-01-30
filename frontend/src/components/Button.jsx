export default function Button({ children, onClick, color="blue" }) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    red: "from-red-500 to-pink-500"
  };

  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded font-semibold bg-gradient-to-r ${colors[color]} hover:scale-105 transition`}
    >
      {children}
    </button>
  );
}