import Cotizacion from "@/app/(dashboard)/components/Cotizacion";
import DEFAULT_PROFILE_PIC from "@/public/default-profile-pic.png";
import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";

const cotizaciones = [
  {
    id: "1",
    name: "A25R-1",
    client: "John Doe",
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
    name: "A25R-2",
    client: "Emily Johnson",
    users: [
      { id: "1", profilePic: DEFAULT_PROFILE_PIC.src },
      { id: "2", profilePic: DEFAULT_PROFILE_PIC.src },
    ],
    date: new Date().toISOString(),
    phase: "In Progress",
  },
  {
    id: "3",
    name: "A25R-3",
    client: "Michael Brown",
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
    <div className="flex justify-start w-full h-full flex-col bg-transparent px-[20px]">
      <div className="w-full h-auto  rounded-[18px] mb-2 flex-shrink-0">
        <Header
          title="Cotizaciones"
          description="Historial de cotizaciones realizadas"
        />
      </div>
      <div className="flex mb-2 items-center ">
        <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
          <div className="relative w-[12vw]">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
            />
            <input
              className="w-full h-[2.25vw] rounded-xl pl-10 pr-4 bg-sky-50  text-md focus:outline-none placeholder-primary"
              placeholder="Buscar cotización"
            />
          </div>
        </div>
      </div>
      <div className="w-full p-[20px] border-[0.5px] border-[#ebebebcc] shadow-sm bg-white rounded-[18px]">
        <table className="w-full table-auto overflow-hidden">
          <thead className="text-left text-gray-600 p-4 border-b">
            <tr>
              <th className="text-sm font-semibold pb-2">Nombre</th>
              <th className="text-sm font-semibold pb-2">Cliente</th>
              <th className="text-sm font-semibold pb-2">Usuarios</th>
              <th className="text-sm font-semibold pb-2">Fase</th>
              <th className="text-sm font-semibold pb-2">Fecha</th>
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
