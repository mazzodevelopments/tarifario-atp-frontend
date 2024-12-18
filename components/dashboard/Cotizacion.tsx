interface CotizacionProps {
  name: string;
  client: string;
  users: {
    id: string;
    profilePic: string;
  }[];
  date: string;
  phase: string;
}

export default function Cotizacion({
  name,
  client,
  users,
  date,
  phase,
}: CotizacionProps) {
  return (
    <tr>
      <td className="py-4 font-bold hover:cursor-pointer hover:underline">
        {name}
      </td>
      <td className="text-gray-700 py-4 font-semibold hover:cursor-pointer hover:underline">
        {client}
      </td>
      <td className="py-4">
        <div className="flex -space-x-3">
          {users.slice(0, 3).map((user, index) => (
            <img
              key={index}
              src={user.profilePic}
              alt="User profile"
              className="w-8 h-8 rounded-full border-2 border-white relative"
              style={{ zIndex: users.length - index }}
            />
          ))}
          {users.length > 3 && (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white text-sm font-medium rounded-full border-2 border-white">
              +{users.length - 3}
            </div>
          )}
        </div>
      </td>
      <td className="py-4">
        <span className="px-2 py-1 text-sm font-medium bg-gray-200 rounded">
          {phase}
        </span>
      </td>
      <td className="py-4 font-semibold text-gray-700">
        {new Date(date).toLocaleDateString()}
      </td>
    </tr>
  );
}
