import { createElement, forwardRef } from 'react';
import { mergeClasses, toKebabCase, toPascalCase } from './shared';
import { IconNode, IconProps } from './types';
import Icon from './Icon';

const createIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, IconProps>(({ className, ...props }, ref) =>
    createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `aws-icon-${toKebabCase(iconName)}`,
        className,
      ),
      ...props,
    }),
  );

  Component.displayName = toPascalCase(iconName);

  return Component;
};

export default createIcon;
