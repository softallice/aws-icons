import { forwardRef, createElement } from 'react';
import { mergeClasses, toKebabCase, toPascalCase } from './shared.js';
import Icon from './Icon.js';

const createIcon = (iconName, iconNode) => {
    const Component = forwardRef(({ className, ...props }, ref) => createElement(Icon, {
        ref,
        iconNode,
        className: mergeClasses(`aws-icon-${toKebabCase(iconName)}`, className),
        ...props,
    }));
    Component.displayName = toPascalCase(iconName);
    return Component;
};

export { createIcon as default };
//# sourceMappingURL=createIcon.js.map
