export default function Input({ className = "", ...props }) {
  return (
    <div>
      <input
        {...props}
        className={`w-full px-2 py-2 text-sm border rounded-md focus:outline-none 
          ${className}`}
      />
    </div>
  );
}
