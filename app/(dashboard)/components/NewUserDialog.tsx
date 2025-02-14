import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function NewUserDialog() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New user:", { name, email });

    toast({
      title: "Usuario creado",
      description: `Se ha creado el usuario ${name} con éxito.`,
    });

    setName("");
    setEmail("");

    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="primary"
            className="px-3 py-2 bg-neutral-900 text-white text-sm"
          >
            Crear nuevo usuario
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nuevo usuario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nombre
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Password
              </label>
              <Input
                id="email"
                type="password"
                value={email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Rol
              </label>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                <option value="superadmin">superadmin</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <Button type="submit" className="ml-auto text-white">
              Guardar usuario
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}
