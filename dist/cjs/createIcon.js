'use strict';

var react = require('react');
var shared = require('./shared.js');
var Icon = require('./Icon.js');

const createIcon = (iconName, iconNode) => {
    const Component = react.forwardRef(({ className, ...props }, ref) => react.createElement(Icon, {
        ref,
        iconNode,
        className: shared.mergeClasses(`aws-icon-${shared.toKebabCase(iconName)}`, className),
        ...props,
    }));
    Component.displayName = shared.toPascalCase(iconName);
    return Component;
};

module.exports = createIcon;
//# sourceMappingURL=createIcon.js.map
