import { clsx } from 'clsx';

function mergeClasses(...inputs) {
    return clsx(inputs);
}
function toKebabCase(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
function toPascalCase(string) {
    return string.replace(/(\w)(\w*)/g, function (_g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });
}

export { mergeClasses, toKebabCase, toPascalCase };
//# sourceMappingURL=shared.js.map
