export const convertToPersian = (x: string | number): string => {
  // convert English digits into Persian
  const farsiDigits: string[] = [
    "۰",
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹",
  ];

  const chars = [":", "/", " ", "-", ","];

  return x
    .toString()
    .split("")
    .map((x) => (chars.includes(x) ? x : farsiDigits[x as any]))
    .join("");
};

export const separateDigits = (n: number): string => {
  // separate digits 3 by 3
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(n);
};
