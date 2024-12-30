import Cotizacion from "@/components/dashboard/Cotizacion";
import DEFAULT_PROFILE_PIC from "@/public/default-profile-pic.png";

const cotizaciones = [
  {
    id: "1",
    name: "A25R-1",
    client: "Marcelo Alvear",
    users: [
      { id: "1", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "2", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "3", profilePic: DEFAULT_PROFILE_PIC.src },
    ],
    date: new Date().toISOString(),
    phase: "Request",
  },
  {
    id: "2",
    name: "B34Q-5",
    client: "Ricardo Fort",
    users: [
      { id: "1", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "2", profilePic: DEFAULT_PROFILE_PIC.src },
    ],
    date: new Date().toISOString(),
    phase: "In Progress",
  },
  {
    id: "3",
    name: "C78T-2",
    client: "Tomás Mazza",
    users: [
      { id: "1", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "2", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "3", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "4", profilePic: DEFAULT_PROFILE_PIC.src },
    ],
    date: new Date().toISOString(),
    phase: "Completed",
  },
];

export default function History() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background py-8 px-6">
      <div className="flex mb-4 items-center text-neutral-900">
        <h2 className="font-semibold text-3xl mt-[1px] ml-2">Cotizaciones</h2>
      </div>
      <div className="w-full p-4 border-[2px] border-neutral-100 rounded-3xl">
        <table className="w-full table-auto overflow-hidden">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-4">Nombre</th>

              <th className="py-4">Cliente</th>
              <th className="py-4">Usuarios</th>
              <th className="py-4">Fase</th>
              <th className="py-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((cotizacion) => (
              <Cotizacion
                key={cotizacion.id}
                name={cotizacion.name}
                client={cotizacion.client}
                users={cotizacion.users}
                date={cotizacion.date}
                phase={cotizacion.phase}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
