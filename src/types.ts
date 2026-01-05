import { SVGProps } from 'react';

export type IconNode = [elementName: keyof React.JSX.IntrinsicElements, attrs: Record<string, string>, children?: IconNode][];

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}
