'use client';

import { createElement, forwardRef, useEffect, useState } from 'react';
import { IconNode, IconProps } from './types';
import dynamicIconImports from './dynamicIconImports';
import Icon from './Icon';

export type DynamicIconModule = {
  default: React.ForwardRefExoticComponent<Omit<IconProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
  __iconNode: IconNode;
};

export type IconName = keyof typeof dynamicIconImports;

export const iconNames = Object.keys(dynamicIconImports) as Array<IconName>;

interface DynamicIconComponentProps extends Omit<IconProps, 'name'> {
  name: IconName;
  fallback?: () => JSX.Element | null;
}

async function getIconNode(name: IconName) {
  if (!(name in dynamicIconImports)) {
    throw new Error('[aws-icons]: Icon name not found in DynamicIcon');
  }

  const icon = (await dynamicIconImports[name]()) as DynamicIconModule;

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
const DynamicIcon = forwardRef<SVGSVGElement, DynamicIconComponentProps>(
  ({ name, fallback: Fallback, ...props }, ref) => {
    const [iconNode, setIconNode] = useState<IconNode>();

    useEffect(() => {
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

      return createElement(Fallback);
    }

    return createElement(Icon, {
      ref,
      ...props,
      iconNode,
    });
  },
);

DynamicIcon.displayName = 'DynamicIcon';

export default DynamicIcon;
