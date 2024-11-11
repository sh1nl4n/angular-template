export function convertToCamelCase(value: string): string {
  return value
    .split(/[-\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function convertToCebabCase(value: string): string {
  return value
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
}

export function generateString(len: number): string {
  let randomString = "";
  for (let j = 0; j < len; j++) {
    const randomChar = Math.floor(Math.random() * 26) + 65;
    randomString += String.fromCharCode(randomChar);
  }

  return randomString;
}
