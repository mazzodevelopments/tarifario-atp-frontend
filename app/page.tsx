export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[50%] flex items-center justify-center">
        <div className="h-full w-1/2 bg-primary">Color Primario</div>
        <div className="h-full w-1/2 bg-secondary text-primary">
          Color Secundario
        </div>
      </div>
      <div className="h-[50%] bg-background text-secondary">
        Color del background
      </div>
    </div>
  );
}
