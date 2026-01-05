'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dynamicIconImports = require('./dynamicIconImports.js');
var Icon = require('./Icon.js');

const iconNames = Object.keys(dynamicIconImports);
async function getIconNode(name) {
    if (!(name in dynamicIconImports)) {
        throw new Error('[aws-icons]: Icon name not found in DynamicIcon');
    }
    const icon = (await dynamicIconImports[name]());
    return icon.__iconNode;
}
/**
 * Dynamic AWS icon component
 *
 * @component DynamicIcon
 * @param {object} props
 * @param {IconName} props.name - The name of the icon to render
 * @param {Function} props.fallback - Optional fallback component while loading
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {string} props.className - The class name of the icon
 *
 * @returns {ForwardRefExoticComponent} AwsIcon
 */
const DynamicIcon = react.forwardRef(({ name, fallback: Fallback, ...props }, ref) => {
    const [iconNode, setIconNode] = react.useState();
    react.useEffect(() => {
        getIconNode(name)
            .then(setIconNode)
            .catch((error) => {
            console.error(error);
        });
    }, [name]);
    if (iconNode == null) {
        if (Fallback == null) {
            return null;
        }
        return react.createElement(Fallback);
    }
    return react.createElement(Icon, {
        ref,
        ...props,
        iconNode,
    });
});
DynamicIcon.displayName = 'DynamicIcon';

exports.default = DynamicIcon;
exports.iconNames = iconNames;
//# sourceMappingURL=DynamicIcon.js.map
