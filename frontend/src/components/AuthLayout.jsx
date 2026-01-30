export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl w-[380px] text-white">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-400 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}