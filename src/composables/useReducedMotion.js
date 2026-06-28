import { useMediaQuery } from "@vueuse/core";

export function useReducedMotion() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const finePointer = useMediaQuery("(pointer: fine)");
  return { reducedMotion, finePointer };
}
