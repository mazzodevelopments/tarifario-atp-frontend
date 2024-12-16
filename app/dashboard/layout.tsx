import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen bg-secondary flex justify-center items-center flex-col">
      <div className="w-full h-28 bg-secondary justify-between items-center flex px-[10vw]">
        <div className="w-44">
          <Image src={"/logo-nav.png"} width={1000} height={1000} alt="LOGO" />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-20 justify-center">
            <a className="text-white hover:text-primary hover:cursor-pointer">
              Inicio
            </a>
          </div>
          <div className="w-20 justify-center">
            <a className="text-white hover:text-primary hover:cursor-pointer">
              Inicio
            </a>
          </div>
          <div className="w-20 justify-center">
            <a className="text-white hover:text-primary hover:cursor-pointer">
              Inicio
            </a>
          </div>
          <div className="w-20 justify-center">
            <a className="text-white hover:text-primary hover:cursor-pointer">
              Inicio
            </a>
          </div>
          {/* DATOS USUARIO */}
          <div className="flex justify-center items-center gap-2 h-14 px-2 rounded-2xl hover:bg-[#1E3A50] hover:cursor-pointer">
            <div className="w-10 h-10 rounded-xl border-[0.5px] border-neutral-400 overflow-hidden">
              <Image
                src={"/DEFAULT_PROFILE_PIC.png"}
                width={1000}
                height={1000}
                alt="LOGO"
              />
            </div>
            <div className="flex flex-col pr-1">
              <h3 className="font-semibold text-white">Tomás Matteozzi</h3>
              <span className="text-xs text-gray-200">Administrador</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
