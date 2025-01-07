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
    <div className="flex justify-start w-full h-full flex-col bg-background p-[20px]">
      <Header
        title="Cotizaciones"
        description="Historial de cotizaciones realizadas"
        className="bg-gradient-to-r from-green-600 to-emerald-200"
      />
      <div className="flex mb-4 items-center ">
        <div className="w-auto rounded-[10px] flex bg-sky-50 h-10 px-4 items-center justify-start">
          <Search
            className="text-primary mr-2 opacity-65 ml-1"
            fontWeight="bold"
            size={18}
          />
          <input
            className="text-[0.8vw] font-regular text-primary bg-transparent outline-none placeholder:text-primary placeholder:opacity-65"
            placeholder="Buscar cotización"
          />
        </div>
      </div>
      <div className="w-full py-2 px-4 border-[2px] border-gray-100 rounded-[10px]">
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
