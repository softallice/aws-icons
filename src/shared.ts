import { clsx, type ClassValue } from 'clsx';

export function mergeClasses(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function toKebabCase(string: string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toPascalCase(string: string) {
  return string.replace(/(\w)(\w*)/g, function (_g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
}
