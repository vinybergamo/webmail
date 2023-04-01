export const logger = {
  green: (message: string) => console.log(`\x1b[32m${message}\x1b[0m`),
  red: (message: string) => console.log(`\x1b[31m${message}\x1b[0m`),
  yellow: (message: string) => console.log(`\x1b[33m${message}\x1b[0m`),
  blue: (message: string) => console.log(`\x1b[34m${message}\x1b[0m`),
  magenta: (message: string) => console.log(`\x1b[35m${message}\x1b[0m`),
  cyan: (message: string) => console.log(`\x1b[36m${message}\x1b[0m`),
  white: (message: string) => console.log(`\x1b[37m${message}\x1b[0m`),
};
