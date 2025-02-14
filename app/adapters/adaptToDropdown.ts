type Option = {
  id: number;
  name: string;
};

export const adaptToDropdown = <T>(
  data: T[],
  idKey: keyof T,
  nameKey: keyof T,
): Option[] => {
  return data.map((item) => ({
    id: Number(item[idKey]), // Convertimos a string por si viene como número
    name: String(item[nameKey]),
  }));
};

/** Ejemplo de uso**
 const familias = [
 { codigo: 1, descripcion: "Familia A" },
 { codigo: 2, descripcion: "Familia B" },
 { codigo: 3, descripcion: "Familia C" },
 ];

 const dropdownOptions = adaptToDropdown(familias, "codigo", "descripcion");

 console.log(dropdownOptions);

 [
 { id: "1", name: "Familia A" },
 { id: "2", name: "Familia B" },
 { id: "3", name: "Familia C" },
 ]
 **/
