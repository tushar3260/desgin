export default function Input({ type="text", placeholder, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full mb-4 p-3 rounded bg-black/40 border border-gray-600 focus:outline-none focus:border-blue-500"
    />
  );
}
