export * from "./collections";
export * from "./nft";
export * from "./wallet";
export * from "./ui";
export * from "./network";
export * from "./market";
export * from "./constants";

export const isEmpty = (value:any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
