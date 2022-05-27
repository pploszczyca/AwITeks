import {PlantActualInsolationEnum, SpeciesFertilizationDoseEnum} from "../api";

export function insolationToString(insolation: PlantActualInsolationEnum): string {
  switch (insolation) {
    case "HIGH":
      return "wysokie";
    case "MEDIUM":
      return "średnie";
    case "LOW":
      return "niskie";
  }
}

export function fertilizationToString(fertilization: SpeciesFertilizationDoseEnum): string {
  switch (fertilization) {
    case "HIGH":
      return "wysokie";
    case "MEDIUM":
      return "średnie";
    case "LOW":
      return "niskie";
  }
}
