import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen bg-secondary flex justify-center items-center">
      <div className="w-[50%] flex justify-end px-[2%] items-center h-full">
        <div className="w-[24vw] mt-[0.75vw] h-auto border-r-2 border-r-[#ffffff33] flex justify-center items-center">
          <Image src={"/logo.png"} width={1000} height={1000} alt="LOGO" />
        </div>
      </div>
      {children}
    </div>
  );
}
