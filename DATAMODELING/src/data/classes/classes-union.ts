import { ClassType } from "../../domain/class/class.schema";
import { fighterClass } from "./fighter/class-fighter";

export const PHB2024CLASSES = [
  fighterClass,
] as const satisfies ClassType[];
