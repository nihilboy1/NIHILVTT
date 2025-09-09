import { FeatType } from "../../domain/feat/feat.schema";
import { featsFightingStyle } from "./feats-fightingStyle";
import { featsGeneral } from "./feats-general";
import { featsOrigin } from "./feats-origin";

export const PHB2024FEATS = [
  ...featsFightingStyle,
  ...featsGeneral,
  ...featsOrigin,
] as const satisfies FeatType[];
