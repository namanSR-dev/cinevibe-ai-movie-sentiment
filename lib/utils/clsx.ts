/**
 * Classname composition utility.
 *
 * Combines conditional class fragments (`clsx`) and resolves Tailwind conflict
 * precedence (`tailwind-merge`) to keep component styling deterministic.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges one or more class name inputs into a single normalized class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
