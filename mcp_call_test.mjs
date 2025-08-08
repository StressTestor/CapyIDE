import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const root = process.cwd();
const cfgPath = path.join(root, 'mcp_settings.json');
if (!fs.existsSync(cfgPath)) {
  console.error('mcp_settings.json not found');
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));

function expandEnvObj(obj) {
  if (!obj) return {};
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = String(v).replaceAll('${workspaceFolder}', root);
  }
  return out;
}

async function withClient(name, server, fn) {
  const relArg = server.args?.[0];
  const scriptPath = path.isAbsolute(relArg) ? relArg : path.join(root, relArg);
  const command = server.command || 'node';
  const args = [scriptPath];
  const env = { ...process.env, ...expandEnvObj(server.env) };

  const client = new Client({ name: `capy-mcp-test-${name}`, version: '0.0.1' });
  const transport = new StdioClientTransport({ command, args, env });
  try {
    await client.connect(transport);
    return await fn(client);
  } finally {
    try { await client.close?.(); } catch {}
    try { transport.close?.(); } catch {}
  }
}

function fmt(name, ok, extra = '') {
  const s = ok ? 'OK' : 'FAIL';
  console.log(`${name}: ${s}${extra ? ' - ' + extra : ''}`);
}

async function main() {
  const servers = cfg.servers || cfg.mcpServers;
  let anyFail = false;

  for (const [name, server] of Object.entries(servers)) {
    try {
      await withClient(name, server, async (client) => {
        const tools = await client.listTools();
        fmt(name, true, `tools=${tools.tools?.length ?? 0}`);
      });
    } catch (e) {
      anyFail = true;
      fmt(name, false, String(e?.message || e));
    }
  }

  if (servers['capy-diff']) {
    try {
      const res = await withClient('capy-diff', servers['capy-diff'], async (client) => {
        const call = await client.callTool({
          name: 'diff_generate_text',
          arguments: { oldText: 'hello', newText: 'hello world', filename: 'sample.txt', context: 1 }
        });
        return call;
      });
      const snippet = res?.content?.[0]?.text?.slice(0, 60) ?? '';
      fmt('capy-diff callTool', true, snippet.replace(/\n/g, ' '));
    } catch (e) {
      anyFail = true;
      fmt('capy-diff callTool', false, String(e?.message || e));
    }
  }

  if (anyFail) process.exit(2);
}

main().catch((e) => { console.error(e); process.exit(3); });
