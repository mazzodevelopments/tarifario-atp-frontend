import Image from "next/image";
import {
  Clock,
  CornerLeftDown,
  CornerRightUp,
  FilePlus,
  Home,
  LogOut,
  PlusSquare,
  Users,
} from "react-feather";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen relative h-screen bg-neutral-50 flex justify-center items-center flex-row px-[1vw] py-[1vw]">
      <div className="w-full h-full flex justify-center items-center flex-row rounded-[16px] shadow-md overflow-hidden border-[1px] border-neutral-200">
        <div className="w-[14vw] h-full flex justify-between items-center flex-col bg-neutral-50 z-20">
          <div className="flex justify-start w-full pl-[1.5vw] items-center flex-col">
            <div className="w-full flex flex-row">
              <div className="w-[6vw] py-10 justify-start items-center flex saturate-[1]">
                <Image
                  src={"/newlogo.png"}
                  width={1000}
                  height={1000}
                  alt="LOGO"
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-start gap-[1.2vw] flex-col">
              <a className="text-black flex items-center hover:text-primary hover:cursor-pointer">
                <Home size={20} />
                <span className="ml-2 mt-1">Home</span>
              </a>
              <a className="text-black flex items-center hover:text-primary hover:cursor-pointer">
                <PlusSquare size={20} />
                <span className="ml-2 mt-1">Crear</span>
              </a>
              <a className="text-black flex items-center hover:text-primary hover:cursor-pointer">
                <Clock size={20} />
                <span className="ml-2 mt-1">Cotizaciones</span>
              </a>
              <a className="text-black flex items-center hover:text-primary hover:cursor-pointer">
                <Users size={20} />
                <span className="ml-2 mt-1">Proveedores</span>
                {/* Estos se cambian */}
              </a>
              <a className="text-black flex items-center hover:text-primary hover:cursor-pointer">
                <CornerRightUp size={20} />
                <span className="ml-2 mt-1">Home</span>
                {/* Estos se cambian */}
              </a>
            </div>
          </div>
          <div className="w-full pl-[1.5vw] h-28 justify-start items-center flex">
            <a className="text-black flex items-center hover:text-primary hover:cursor-pointer">
              <LogOut size={20} />
              <span className="ml-2 mt-1">Logout</span>
            </a>
          </div>
        </div>
        <div className="w-full h-full relative flex justify-center items-center flex-col overflow-hidden border-l-[1px] border-neutral-200 rounded-l-[16px]">
          <div className="flex w-[100%] px-[2%] h-28  bg-white justify-end items-center absolute top-0 left-0">
            <div className="flex justify-end items-center gap-8">
              {/* DATOS USUARIO */}
              <div className="flex justify-end items-center gap-2 h-14 px-2 rounded-2xl hover:bg-[#1E3A50] hover:cursor-pointer">
                <div className="w-10 h-10 rounded-xl border-[0.5px] border-neutral-400 overflow-hidden">
                  <Image
                    src={"/DEFAULT_PROFILE_PIC.png"}
                    width={1000}
                    height={1000}
                    alt="LOGO"
                  />
                </div>
                <div className="flex flex-col pr-1">
                  <h3 className="font-semibold text-neutral-900">
                    Tomás Matteozzi
                  </h3>
                  <span className="text-xs text-neutral-900">
                    Administrador
                  </span>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
