const fs = require('fs');
const path = require('path');

const targetArg = process.argv[2];
const inputFile = path.resolve(targetArg || 'package.json');
const outputDir = path.dirname(inputFile);
const outputFile = path.resolve(outputDir, 'package.json');
const bak = path.resolve(outputDir, 'package.json.bak');

if (!fs.existsSync(inputFile)) {
	console.error('package.json not found at path:', inputFile);
	process.exit(1);
}

// backup
try {
	if (fs.existsSync(outputFile)) {
		fs.copyFileSync(outputFile, bak);
	}
} catch (e) {
	console.warn('Warning: could not create backup:', e.message);
}

let raw = fs.readFileSync(inputFile, 'utf8');
// strip BOM
raw = raw.replace(/^\uFEFF/, '');

// resolve git conflict markers by preferring HEAD side
function resolveGitConflicts(text) {
	const lines = text.split(/\r?\n/);
	const out = [];
	let inConflict = false;
	let inOther = false;
	for (let i = 0; i < lines.length; i += 1) {
		const line = lines[i];
		if (!inConflict && line.startsWith('<<<<<<<')) {
			inConflict = true;
			inOther = false;
			continue;
		}
		if (inConflict && !inOther && line.startsWith('=======')) {
			inOther = true; // start skipping the other side
			continue;
		}
		if (inConflict && line.startsWith('>>>>>>>')) {
			inConflict = false;
			inOther = false;
			continue;
		}
		if (inConflict) {
			if (!inOther) {
				out.push(line); // keep HEAD side
			} else {
				// skip other side
			}
			continue;
		}
		out.push(line);
	}
	return out.join('\n');
}

raw = resolveGitConflicts(raw);

// quick sanitize: strip JS-style comments
raw = raw.replace(/\/\*[\s\S]*?\*\//g, ''); // block comments
raw = raw.replace(/(^|[\s;,{])\/\/.*$/gm, '$1'); // line comments

// remove trailing commas inside objects/arrays
raw = raw.replace(/,\s*([}\]])/g, '$1');

function tryParse(txt) {
	try { return { data: JSON.parse(txt) }; }
	catch (e) { return { err: e }; }
}

let { data, err } = tryParse(raw);
if (err) {
	// show context around position if available
	const m = String(err.message).match(/position (\d+)/i);
	if (m) {
		const pos = Number(m[1]);
		const start = Math.max(0, pos - 120);
		const end = Math.min(raw.length, pos + 120);
		console.error('JSON parse failed near:\n', raw.slice(start, end));
	}
	console.error('Parse error:', err.message);
	process.exit(2);
}

// extract markdownlint configs if present
const outML = {};

if (Object.prototype.hasOwnProperty.call(data, 'markdownlint')) {
	outML.markdownlint = data['markdownlint'];
	delete data['markdownlint'];
}
if (Object.prototype.hasOwnProperty.call(data, 'markdownlint-cli2')) {
	outML.cli2 = data['markdownlint-cli2'];
	delete data['markdownlint-cli2'];
}

// write cleaned package.json (pretty-printed, no comments)
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2) + '\n', 'utf8');

// write markdownlint config files
const mlFile = path.resolve(outputDir, '.markdownlint.jsonc');
const cli2File = path.resolve(outputDir, '.markdownlint-cli2.jsonc');
const ignoreFile = path.resolve(outputDir, '.markdownlintignore');

if (!fs.existsSync(mlFile)) {
	const ml = outML.markdownlint ?? {
		// line length off for mixed-content docs/READMEs
		MD013: false,
		MD033: { allowed_elements: ['br'] }
	};
	fs.writeFileSync(mlFile, JSON.stringify(ml, null, 2) + '\n', 'utf8');
}

if (!fs.existsSync(cli2File)) {
	const cli2 = outML.cli2 ?? {
		globs: ['**/*.md', '**/*.mdx'],
		ignores: [
			'**/node_modules/**',
			'site/.next/**',
			'**/dist/**',
			'**/build/**',
			'extensions/**',
			'CapyIDE/extensions/**',
			'tmp_capy_push/**',
			'test/**',
			'CapyIDE/test/**'
		],
		// let .markdownlint.jsonc define rules
		config: {}
	};
	fs.writeFileSync(cli2File, JSON.stringify(cli2, null, 2) + '\n', 'utf8');
}

if (!fs.existsSync(ignoreFile)) {
	fs.writeFileSync(
		ignoreFile,
		[
			'node_modules/',
			'site/.next/',
			'dist/',
			'build/',
			'extensions/',
			'CapyIDE/extensions/',
			'tmp_capy_push/',
			'test/',
			'CapyIDE/test/'
		].join('\n') + '\n',
		'utf8'
	);
}

console.log('package.json validated and cleaned.');
console.log('markdownlint configs placed in .markdownlint.jsonc and .markdownlint-cli2.jsonc.');


