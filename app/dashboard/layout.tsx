import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen relative h-screen bg-secondary flex justify-center items-center flex-col px-[4vw] py-[1vw]">
      <div className="w-full h-full relative flex justify-center items-center flex-col rounded-2xl overflow-hidden">
        <div className="flex w-[100%] px-[2%] h-28  bg-white justify-between items-center absolute top-0 left-0">
          <div className="w-44">
            <Image
              src={"/logo-nav.png"}
              width={1000}
              height={1000}
              alt="LOGO"
            />
          </div>
          <div className="flex justify-center items-center gap-8">
            <a className="text-neutral-900 hover:text-primary hover:cursor-pointer">
              Inicio
            </a>
            <a className="text-neutral-900 hover:text-primary hover:cursor-pointer">
              Importar
            </a>
            <a className="text-neutral-900 hover:text-primary hover:cursor-pointer">
              Exportar
            </a>
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
