export default function Register() {
  return (
    <div className="w-screen h-screen justify-center items-center flex bg-secondary">
      <div className="w-1/4 h-auto bg-white rounded-2xl flex justify-start p-10 flex-col shadow-2xl">
        <h2 className="font-bold text-4xl">Registrarse</h2>
        <div className="mt-4">
          <span>Correo electrónico</span>
          <input className="w-full rounded-lg h-12 bg-neutral-100 border-[1.5px]"></input>
        </div>
        <div className="mt-4">
          <span>Contraseña</span>
          <input className="w-full rounded-lg h-12 bg-neutral-100 border-[1.5px]"></input>
        </div>
        <div className="mt-4">
          <span>Repetir Contraseña</span>
          <input className="w-full rounded-lg h-12 bg-neutral-100 border-[1.5px]"></input>
        </div>
        <div className="mt-4">
          <button className="h-12 bg-primary w-full rounded-lg text-white font-semibold">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
