# CapyMCP Server Analysis Report

## Server Packages Summary
All 19 MCP server packages were found at `C:\Users\Joeba\Desktop\Projects\capy-mcp\packages`. Each package has a built `dist/index.js` file.

### Server Capabilities Overview
| Server Name | Key Tools | Environment Variables | Auto-approve Suggestions |
|-------------|-----------|------------------------|--------------------------|
| browser | browser_launch, page_navigate, page_screenshot | None | All tools |
| clipboard | clipboard_copy, clipboard_paste | None | All tools |
| core | ping | None | All tools |
| diff | diff_generate, patch_apply | None | diff_generate |
| electron | electron_launch, electron_logs | None | electron_logs |
| fetch | fetch | FETCH_ALLOWED_ORIGINS | fetch (read-only) |
| fs | read_file, write_file, list_files | BASE_DIR | read_file, list_files |
| git | git_status, git_commit | None | git_status |
| image | image_convert, image_resize | None | All tools |
| lint | lint_eslint, lint_stylelint | None | All tools |
| memory | create_entities, search_nodes | MEMORY_DB_PATH | search_nodes |
| metrics | metric_record, metric_query | METRICS_DB_PATH | metric_query |
| nodepkg | npm_install, npm_run_script | None | npm_list |
| pg | pg_query, pg_list_tables | PG_CONN, PG_SSL | pg_query, pg_list_tables |
| secrets | secret_get, secret_list | None | secret_list |
| sqlite | sqlite_query, sqlite_schema | None | sqlite_query, sqlite_schema |
| test | mocha_run, playwright_run | None | All tools |
| time | now, format, diff | None | All tools |
| build | webpack_build, gulp_task | None | All tools |

## Special Setup Requirements
1. **fs Server**: Must set `BASE_DIR` to workspace directory
2. **memory Server**: Requires `MEMORY_DB_PATH` for persistence
3. **metrics Server**: Requires `METRICS_DB_PATH` for storage
4. **pg Server**: Needs PostgreSQL connection string in `PG_CONN`
5. **fetch Server**: Configure `FETCH_ALLOWED_ORIGINS` (default "*")

## MCP Configuration File
```json
{
  "servers": [
    {
      "name": "browser",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\browser\\dist\\index.js"],
      "auto_approve": ["browser_launch", "page_navigate", "page_screenshot", "console_log_stream", "page_evaluate"],
      "disabled": false
    },
    {
      "name": "clipboard",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\clipboard\\dist\\index.js"],
      "auto_approve": ["clipboard_copy", "clipboard_paste"],
      "disabled": false
    },
    {
      "name": "core",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\core\\dist\\index.js"],
      "auto_approve": ["ping"],
      "disabled": false
    },
    {
      "name": "diff",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\diff\\dist\\index.js"],
      "auto_approve": ["diff_generate"],
      "disabled": false
    },
    {
      "name": "electron",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\electron\\dist\\index.js"],
      "auto_approve": ["electron_logs"],
      "disabled": false
    },
    {
      "name": "fetch",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\fetch\\dist\\index.js"],
      "auto_approve": ["fetch"],
      "env": {
        "FETCH_ALLOWED_ORIGINS": "*"
      },
      "disabled": false
    },
    {
      "name": "fs",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\fs\\dist\\index.js"],
      "auto_approve": ["read_file", "list_files"],
      "env": {
        "BASE_DIR": "c:/Users/Joeba/Desktop/Projects/CapyIDE"
      },
      "disabled": false
    },
    {
      "name": "git",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\git\\dist\\index.js"],
      "auto_approve": ["git_status"],
      "disabled": false
    },
    {
      "name": "image",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\image\\dist\\index.js"],
      "auto_approve": ["image_convert", "image_resize"],
      "disabled": false
    },
    {
      "name": "lint",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\lint\\dist\\index.js"],
      "auto_approve": ["lint_eslint", "lint_stylelint"],
      "disabled": false
    },
    {
      "name": "memory",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\memory\\dist\\index.js"],
      "auto_approve": ["search_nodes"],
      "env": {
        "MEMORY_DB_PATH": "memory.db"
      },
      "disabled": false
    },
    {
      "name": "metrics",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\metrics\\dist\\index.js"],
      "auto_approve": ["metric_query"],
      "env": {
        "METRICS_DB_PATH": "metrics.db"
      },
      "disabled": false
    },
    {
      "name": "nodepkg",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\nodepkg\\dist\\index.js"],
      "auto_approve": ["npm_list"],
      "disabled": false
    },
    {
      "name": "pg",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\pg\\dist\\index.js"],
      "auto_approve": ["pg_query", "pg_list_tables"],
      "env": {
        "PG_CONN": "postgres://user:password@localhost:5432/db",
        "PG_SSL": "0"
      },
      "disabled": false
    },
    {
      "name": "secrets",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\secrets\\dist\\index.js"],
      "auto_approve": ["secret_list"],
      "disabled": false
    },
    {
      "name": "sqlite",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\sqlite\\dist\\index.js"],
      "auto_approve": ["sqlite_query", "sqlite_schema"],
      "disabled": false
    },
    {
      "name": "test",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\test\\dist\\index.js"],
      "auto_approve": ["mocha_run", "playwright_run"],
      "disabled": false
    },
    {
      "name": "time",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\time\\dist\\index.js"],
      "auto_approve": ["now", "format", "diff"],
      "disabled": false
    },
    {
      "name": "build",
      "command": "node",
      "args": ["C:\\Users\\Joeba\\Desktop\\Projects\\capy-mcp\\packages\\build\\dist\\index.js"],
      "auto_approve": ["webpack_build", "gulp_task"],
      "disabled": false
    }
  ]
}