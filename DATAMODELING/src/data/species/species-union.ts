import { Specie } from "../../domain/specie/specie.schema.js";
import { species as speciesXPHB } from "./species-XPHB.js";

// União de todas as especies
export const PHB2024SPECIES: Specie[] = [
  ...speciesXPHB,
  // Adicione aqui outras especies quando elas forem modeladas
];
