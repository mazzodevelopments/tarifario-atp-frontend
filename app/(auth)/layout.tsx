import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen bg-secondary flex justify-center items-center">
      <div className="w-[45%] flex justify-center items-center h-full">
        <div className="w-[20vw] h-full flex justify-center items-center">
          <Image src={"/logo.png"} width={1000} height={1000} alt="LOGO" />
        </div>
      </div>
      {children}
    </div>
  );
}
