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
            <h3 className="text-white">Inicio</h3>
          </div>
          <div className="w-20 justify-center">
            <h3 className="text-white">Inicio</h3>
          </div>
          <div className="w-20 justify-center">
            <h3 className="text-white">Inicio</h3>
          </div>
          <div className="w-20 justify-center">
            <h3 className="text-white">Inicio</h3>
          </div>
          <div className="w-10 h-10 rounded-xl border-[0.5px] border-neutral-400 overflow-hidden">
            <Image
              src={"/DEFAULT_PROFILE_PIC.png"}
              width={1000}
              height={1000}
              alt="LOGO"
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
