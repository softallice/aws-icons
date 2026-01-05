import { forwardRef, createElement } from 'react';
import defaultAttributes from './defaultAttributes.js';
import { mergeClasses } from './shared.js';

const renderIconNode = (nodes) => {
    return nodes.map(([tag, attrs, children], index) => {
        return createElement(tag, { ...attrs, key: index }, children ? renderIconNode(children) : []);
    });
};
const Icon = forwardRef(({ color = 'currentColor', size = 48, strokeWidth, absoluteStrokeWidth, className = '', children, iconNode, ...rest }, ref) => {
    return createElement('svg', {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
        className: mergeClasses('aws-icon', className),
        ...rest,
    }, [
        ...renderIconNode(iconNode),
        ...(Array.isArray(children) ? children : [children]),
    ]);
});
Icon.displayName = 'Icon';

export { Icon as default };
//# sourceMappingURL=Icon.js.map
