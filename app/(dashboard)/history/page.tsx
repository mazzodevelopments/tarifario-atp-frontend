import Cotizacion from "@/components/dashboard/Cotizacion";
import DEFAULT_PROFILE_PIC from "@/public/default-profile-pic.png";
import { Search } from "react-feather";

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
      <div className="flex mb-4 items-center ">
        <div className="rounded-3xl flex bg-sky-50 h-10 px-4 items-center justify-start">
          <Search
            className="text-primary mr-2 opacity-50"
            fontWeight="bold"
            size={20}
          />
          <input
            className="text-lg font-regular text-primary bg-transparent outline-none placeholder:text-primary placeholder:opacity-50"
            placeholder="Buscar cotización"
          />
        </div>
      </div>
      <div className="w-full p-4 border-[2px] border-gray-100 rounded-3xl">
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
