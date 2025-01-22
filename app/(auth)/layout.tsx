export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center bg-neutral-50">
      {children}
    </div>
  );
}
