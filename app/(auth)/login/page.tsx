"use client";
import Button from "@/components/Button";

const inputStyles =
  "w-full rounded-lg h-12 bg-secondary border-[2px] border-primary p-4 focus:outline-primary";

export default function Register() {
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <div className="w-[52.5%] h-[22.5vw] justify-start items-center flex">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-1/2 bg-secondary rounded-2xl flex justify-center items-start p-10 flex-col gap-4"
      >
        <h2 className="font-bold text-4xl text-white leading-[1]">Ingresar</h2>
        <div className="w-full">
          <span className="font-semibold text-white leading-[1]">
            Correo electrónico
          </span>
          <input className={inputStyles} />
        </div>
        <div className="w-full">
          <span className="font-semibold text-white leading-[1]">
            Contraseña
          </span>
          <input className={inputStyles}></input>
        </div>
        <div className="w-full">
          <Button className="h-12 w-full" variant="primary" type="submit">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}
