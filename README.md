# AWS Icons for React

AWS Architecture Icons as optimized React components with full TypeScript support and tree-shaking.

## 🚀 Installation

```bash
npm install @nxavis/aws-icons
# or
yarn add @nxavis/aws-icons
# or
pnpm add @nxavis/aws-icons
```

## 📦 Features

- ✅ **307 AWS Architecture Icons** - Complete set of official AWS service icons
- ✅ **Tree-shakable** - Import only the icons you need
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Multiple Formats** - ESM, CJS, and UMD builds
- ✅ **Customizable** - Size, color, and all SVG props supported
- ✅ **Lightweight** - Data-driven approach, no bloated SVG components

## 🎯 Usage

### Basic Usage

```tsx
import { AmazonEc2, AmazonS3 } from "@nxavis/aws-icons";

function MyComponent() {
  return (
    <div>
      <AmazonEc2 size={48} />
      <AmazonS3 size={48} color="#FF9900" />
    </div>
  );
}
```

function MyComponent() {
return (
<div>
<AmazonEc2 size={48} />
<AmazonS3 size={48} color="#FF9900" />
</div>
);
}

````

### Dynamic Import (Code Splitting)

For better performance and smaller initial bundle size, use dynamic imports:

```tsx
import { DynamicIcon, iconNames } from "aws-icons/dynamic";

function MyComponent({ iconName }) {
  return <DynamicIcon name={iconName} size={48} />;
}

// Type-safe icon names
type IconName = (typeof iconNames)[number];

function IconPicker() {
  const [selected, setSelected] = useState<IconName>("AmazonEc2");

  return (
    <div>
      <select onChange={(e) => setSelected(e.target.value as IconName)}>
        {iconNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <DynamicIcon name={selected} size={64} />
    </div>
  );
}
````

**Benefits of Dynamic Import:**

- ✅ Only loads the icon when needed
- ✅ Reduces initial bundle size
- ✅ Perfect for Next.js App Router with `'use client'`
- ✅ Type-safe with full autocomplete support

### With Custom Props

All icons accept standard SVG props:

```tsx
import { AwsLambda } from "aws-icons";

<AwsLambda
  size={64}
  color="currentColor"
  className="my-icon"
  onClick={() => console.log("Clicked!")}
/>;
```

### Available Props

```typescript
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string; // Default: 48
  color?: string; // Default: 'currentColor'
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}
```

## 📚 Available Icons

All icons follow PascalCase naming based on AWS service names:

- `AmazonEc2`
- `AmazonS3`
- `AwsLambda`
- `AmazonDynamoDb`
- ... and 300+ more!

Full icon list available in the [icons directory](./src/icons).

## 🏗️ Build Outputs

- **ESM** (`dist/esm/`): Tree-shakable ES modules
- **CJS** (`dist/cjs/`): CommonJS for Node.js
- **UMD** (`dist/umd/`): Browser-ready minified bundle
- **Types** (`dist/index.d.ts`): TypeScript definitions

## 📄 License

MIT

## 🙏 Credits

Icons are sourced from the official AWS Architecture Icons package.
