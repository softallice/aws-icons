
import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import camelcase from 'camelcase';
import { IconNode } from '../src/types';

const SOURCE_DIR = path.resolve(__dirname, '../../works/icons/aws/Architecture-Service-Icons_02072025');
const OUT_DIR = path.resolve(__dirname, '../src/icons');
const ICON_DIR = path.resolve(__dirname, '../src/icons');
const INDEX_FILE = path.resolve(__dirname, '../src/index.ts');

async function getIconNode(svgContent: string): Promise<IconNode> {
  const $ = cheerio.load(svgContent, { xmlMode: true });

  function getChildren(element: any): IconNode {
    const children: IconNode = [];
    $(element).children().each((_: any, child: any) => {
      const tagName = child.tagName;
      const attribs = child.attribs;

      // Skip defs, title, desc
      if (['defs', 'title', 'desc'].includes(tagName)) return;

      const grandChildren = getChildren(child);
      if (grandChildren.length > 0) {
        children.push([tagName as keyof React.JSX.IntrinsicElements, attribs, grandChildren]);
      } else {
        children.push([tagName as keyof React.JSX.IntrinsicElements, attribs]);
      }
    });
    return children;
  }

  return getChildren($('svg')[0]);
}

const COMPONENT_TEMPLATE = (componentName: string, iconName: string, children: IconNode) => `
import createIcon from '../createIcon';
import { IconNode } from '../types';

export const __iconNode: IconNode = ${JSON.stringify(children)};

const ${componentName} = createIcon('${iconName}', __iconNode);

export default ${componentName};
`;

async function generateIcons() {
  console.log(`Searching for icons in ${SOURCE_DIR}...`);

  // Find all SVG files, targeting 48px version to avoid duplicates across sizes
  const svgFiles = await glob('**/48/*.svg', { cwd: SOURCE_DIR });
  console.log(`Found ${svgFiles.length} icons.`);

  // Create output directory
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  const exportStatements: string[] = [];
  const dynamicImports: string[] = [];
  const generatedNames = new Set<string>();

  for (const file of svgFiles) {
    const filePath = path.join(SOURCE_DIR, file);
    const svgContent = await fs.readFile(filePath, 'utf-8');

    // Generate component name from filename
    // e.g., "Arch_Compute/48/Arch_Amazon-EC2_48.svg" -> "AmazonEc2"
    const basename = path.basename(file, '.svg');
    // Remove common prefixes and suffixes and handle special characters
    const cleanName = basename
      .replace(/^Arch_/, '')
      .replace(/_64$/, '')
      .replace(/_48$/, '')
      .replace(/_32$/, '')
      .replace(/_16$/, '')
      .replace(/&/g, 'And') // Replace & with And
      .replace(/[^a-zA-Z0-9-]/g, '-'); // Replace other special chars with hyphen

    const componentName = camelcase(cleanName, { pascalCase: true });
    const iconName = camelcase(cleanName);

    if (generatedNames.has(componentName)) {
      console.warn(`Duplicate component name: ${componentName} from ${file}. Skipping.`);
      continue;
    }

    generatedNames.add(componentName);
    const componentFileName = `${componentName}.ts`; // Changed to .ts

    const iconNode = await getIconNode(svgContent);
    const fileContent = COMPONENT_TEMPLATE(componentName, iconName, iconNode);

    await fs.writeFile(path.join(ICON_DIR, componentFileName), fileContent);
    exportStatements.push(`export { default as ${componentName} } from './icons/${componentName}';`);
    dynamicImports.push(`  '${componentName}': () => import('./icons/${componentName}'),`);

    console.log(`Generated ${componentName}`);
  }

  // Write index.ts
  await fs.writeFile(INDEX_FILE, exportStatements.join('\n'));
  console.log(`Generated index.ts with ${exportStatements.length} exports.`);

  // Write dynamicIconImports.ts
  const dynamicImportsFile = path.resolve(__dirname, '../src/dynamicIconImports.ts');
  const dynamicImportsContent = `export default {
${dynamicImports.join('\n')}
} as const;
`;
  await fs.writeFile(dynamicImportsFile, dynamicImportsContent);
  console.log(`Generated dynamicIconImports.ts with ${dynamicImports.length} dynamic imports.`);
}

generateIcons().catch(console.error);
