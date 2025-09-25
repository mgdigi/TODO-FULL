

export default function FormInput({ 
  type = "text", 
  name, 
  id, 
  placeholder = " ", 
  label, 
  value, 
  onChange, 
  error 
}) {
  return (
    <div className="relative mb-6">
      <input 
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 border border-gray-200 rounded-xl 
                   focus:ring-2 focus:ring-gray-400 focus:border-transparent 
                   transition-all outline-none peer"
      />
      <label 
        htmlFor={id}
        className="absolute left-3 top-3 text-gray-500 transition-all 
                   duration-300 pointer-events-none bg-white px-1 
                   peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-gray-700 
                   peer-[:not(:placeholder-shown)]:-translate-y-7 
                   peer-[:not(:placeholder-shown)]:scale-75"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
