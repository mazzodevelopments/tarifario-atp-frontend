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
    <tr className="text-sm">
      <td className="font-semibold hover:cursor-pointer hover:underline hover:text-primary">
        {name}
      </td>
      <td className="font-medium text-gray-600 hover:cursor-pointer hover:text-primary">
        {client}
      </td>
      <td className="py-2">
        <div className="flex -space-x-3">
          {users.slice(0, 3).map((user, index) => (
            <img
              key={index}
              src={user.profilePic}
              alt="User profile"
              className="w-7 h-7 rounded-full border-2 border-white relative"
              style={{ zIndex: users.length - index }}
            />
          ))}
          {users.length > 3 && (
            <div className="w-7 h-7 flex items-center justify-center bg-gray-300 text-white text-sm font-medium rounded-full border-2 border-white">
              +{users.length - 3}
            </div>
          )}
        </div>
      </td>
      <td>
        <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 rounded">
          {phase}
        </span>
      </td>
      <td className="font-medium">{new Date(date).toLocaleDateString()}</td>
    </tr>
  );
}
