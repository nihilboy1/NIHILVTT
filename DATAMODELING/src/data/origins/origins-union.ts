import { Origin } from "../../domain/origin/origin.schema.js";
import { origins as originsXPHB } from "./origins-XPHB.js";

// União de todas as origins
export const PHB2024ORIGINS: Origin[] = [
  ...originsXPHB,
  // Adicione aqui outras origins quando elas forem modeladas
];
