import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const oldTranslations: Record<string, string> = await Bun.file(`${import.meta.dir}/pl-PL.json`).json();
const tStrings = await extractTStrings(`${import.meta.dir}/../`);

const newTranslations = tStrings
  .sort((a, b) => a.localeCompare(b))
  .reduce(
    (acc, tString) => {
      return { ...acc, [tString]: oldTranslations[tString] ?? '' };
    },
    {} as Record<string, string>,
  );

await Bun.write(`${import.meta.dir}/pl-PL.json`, JSON.stringify(newTranslations, null, 2));

async function extractTStrings(dir: string): Promise<string[]> {
  const files = await readdir(dir, { recursive: true });
  const tsFiles = files.filter(
    (file) => (file as string).endsWith('.ts') || (file as string).endsWith('.tsx'),
  );

  const results: string[][] = await Promise.all(
    tsFiles.map(async (file) => {
      const filePath = path.join(dir, file as string);
      const fileStat = await stat(filePath);

      if (fileStat.isDirectory()) return extractTStrings(filePath);

      const content = await readFile(filePath, 'utf8');
      const matches = content.match(/\$t\('([^']+)'\)/g);

      if (!matches) return [];

      const results: string[] = [];

      matches.forEach((match) => {
        const m = match.match(/\$t\('([^']+)'\)/);

        if (!m) return;

        results.push(m[1]);
      });

      return results;
    }),
  );

  return results.flat();
}
