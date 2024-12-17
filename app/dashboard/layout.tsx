import Image from "next/image";
import {
  Clock,
  CornerLeftDown,
  CornerRightUp,
  FilePlus,
  Home,
  LogOut,
  PlusSquare,
} from "react-feather";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen relative h-screen bg-secondary flex justify-center items-center flex-row px-[1vw] py-[1vw]">
      <div className="w-[10vw] h-full flex justify-between items-center flex-col">
        <div className="w-[4vw] h-28 justify-center items-center flex">
          <Image src={"/logo-nav.png"} width={1000} height={1000} alt="LOGO" />
        </div>
        <div className="flex justify-center items-center gap-[3vw] flex-col">
          <a className="text-white hover:text-primary hover:cursor-pointer">
            <Home size={28} />
          </a>
          <a className="text-white hover:text-primary hover:cursor-pointer">
            <PlusSquare size={28} />
          </a>
          <a className="text-white hover:text-primary hover:cursor-pointer">
            <Clock size={28} />
          </a>
          <a className="text-white hover:text-primary hover:cursor-pointer">
            <CornerLeftDown size={28} />
            {/* Estos se cambian */}
          </a>
          <a className="text-white hover:text-primary hover:cursor-pointer">
            <CornerRightUp size={28} />
            {/* Estos se cambian */}
          </a>
        </div>
        <div className="w-[5vw] h-28 justify-center items-center flex">
          <a className="text-white hover:text-primary hover:cursor-pointer">
            <LogOut size={28} />
          </a>
        </div>
      </div>
      <div className="w-full h-full relative flex justify-center items-center flex-col rounded-[40px] overflow-hidden">
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
                <span className="text-xs text-neutral-900">Administrador</span>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
