import { createElement, forwardRef } from 'react';
import defaultAttributes from './defaultAttributes';
import { IconNode, IconProps } from './types';
import { mergeClasses } from './shared';

interface IconComponentProps extends IconProps {
  iconNode: IconNode;
}

const renderIconNode = (nodes: IconNode): React.ReactNode => {
  return nodes.map(([tag, attrs, children], index) => {
    return createElement(
      tag,
      { ...attrs, key: index },
      children ? renderIconNode(children) : []
    );
  });
};

const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color = 'currentColor',
      size = 48,
      strokeWidth,
      absoluteStrokeWidth,
      className = '',
      children,
      iconNode,
      ...rest
    },
    ref,
  ) => {
    return createElement(
      'svg',
      {
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
      },
      [
        ...renderIconNode(iconNode) as any,
        ...(Array.isArray(children) ? children : [children]),
      ],
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
