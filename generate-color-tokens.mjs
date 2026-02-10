import fs from 'fs';
import path from 'path';

const INPUT_PATH = './assets/design-token.json';
const OUTPUT_PATH = './src/theme/designTokens.ts';

const raw = fs.readFileSync(INPUT_PATH, 'utf8');
const json = JSON.parse(raw);

function extract(obj) {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      if ('value' in value) {
        result[key.replace(/^#/, '')] = value.value;
      } else {
        result[key] = extract(value);
      }
    }
  });
  return result;
}

function resolveReference(value, palettes) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^{(\w+)\.#?(\w+)}/);
  if (!match) return value;

  const [, paletteName, tone] = match;
  const palette = palettes[paletteName];
  if (!palette) return value;

  return palette[tone] || value;
}

function resolveDeep(obj, palettes) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const result = Array.isArray(obj) ? [] : {};
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'string') {
      result[key] = resolveReference(val, palettes);
    } else {
      result[key] = resolveDeep(val, palettes);
    }
  });
  return result;
}

const light = extract(json['Global/Light']);
const dark = extract(json['Global/Dark']);
const semantic = extract(json['Sementic/Mode 1']);
const unit = extract(json['Unit/Mode 1']);

const resolvedSemantic = resolveDeep(semantic, light);

const output = `// 자동 생성된 파일 — 수정하지 마세요.
export const colors = {
  light: ${JSON.stringify(light, null, 2)},
  dark: ${JSON.stringify(dark, null, 2)},
  semantic: ${JSON.stringify(resolvedSemantic, null, 2)},
};

export const units = ${JSON.stringify(unit, null, 2)};
`;

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');
