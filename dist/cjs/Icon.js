'use strict';

var react = require('react');
var defaultAttributes = require('./defaultAttributes.js');
var shared = require('./shared.js');

const renderIconNode = (nodes) => {
    return nodes.map(([tag, attrs, children], index) => {
        return react.createElement(tag, { ...attrs, key: index }, children ? renderIconNode(children) : []);
    });
};
const Icon = react.forwardRef(({ color = 'currentColor', size = 48, strokeWidth, absoluteStrokeWidth, className = '', children, iconNode, ...rest }, ref) => {
    return react.createElement('svg', {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
        className: shared.mergeClasses('aws-icon', className),
        ...rest,
    }, [
        ...renderIconNode(iconNode),
        ...(Array.isArray(children) ? children : [children]),
    ]);
});
Icon.displayName = 'Icon';

module.exports = Icon;
//# sourceMappingURL=Icon.js.map
