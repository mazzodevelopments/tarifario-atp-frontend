import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center">
      <div className="w-[50%] flex justify-end px-[2%] items-center h-full">
        <div className="w-[18vw] mt-[0.75vw] h-auto pr-20 border-r-2 border-r-gray-300 flex flex-col justify-center items-center">
          <Image src={"/logo-nav.png"} width={1000} height={1000} alt="LOGO" />
          <h1 className="flex items-center justify-center mt-6 text-3xl ">
            <span className="font-bold text-primary">atp</span>
            <span className="font-semibold text-gray-800">SOLUTIONS</span>
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
}
