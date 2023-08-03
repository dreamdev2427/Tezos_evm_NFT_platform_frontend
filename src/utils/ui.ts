import { ZERO } from ".";

const BEGIN_ADDRESS_LENGTH = 4;
/**
 * Get address formatted that only shows part of it
 */
export function ellipseAddress(
  address = "",
  width = BEGIN_ADDRESS_LENGTH
): string {
  if (!address) {
    return "";
  }
  return `${address.slice(ZERO, width)}...${address.slice(-width)}`;
}
