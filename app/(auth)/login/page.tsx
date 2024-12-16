"use client";
import Button from "@/app/components/Button";

const inputStyles =
  "w-full rounded-lg h-12 bg-neutral-100 border-[1.5px] p-4 focus:outline-primary";

export default function Register() {
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <div className="w-[55%] h-[100%] justify-center items-center flex bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-1/2 bg-white rounded-2xl flex justify-start p-10 flex-col shadow-2xl gap-4"
      >
        <h2 className="font-bold text-4xl">Log In</h2>
        <div>
          <span className="font-semibold">Correo electrónico</span>
          <input className={inputStyles} />
        </div>
        <div>
          <span className="font-semibold">Contraseña</span>
          <input className={inputStyles}></input>
        </div>
        <div>
          <Button className="h-12 w-full" variant="primary" type="submit">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}
