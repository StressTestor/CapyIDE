Param(
  [string]$ConfigPath = "mcp_settings.json",
  [int]$SleepMs = 600
)
$ErrorActionPreference = 'Stop'

# Ensure we run from the script directory
$scriptDir = Split-Path -Path $PSCommandPath -Parent
Set-Location $scriptDir

if (!(Test-Path $ConfigPath)) {
  Write-Error "Config not found: $ConfigPath"
  exit 1
}

$cfg = Get-Content $ConfigPath -Raw | ConvertFrom-Json
$fail = $false

foreach ($prop in $cfg.servers.PSObject.Properties) {
  $name = $prop.Name
  $srv = $prop.Value

  if (-not $srv) { continue }
  if ($srv.command -ne 'node') {
    Write-Host ("SKIP_NON_NODE {0}" -f $name)
    continue
  }

  $rel = $srv.args[0]
  if (-not $rel) {
    Write-Host ("MISSING_ARGS {0}" -f $name)
    $fail = $true
    continue
  }

  $scriptPath = if ([System.IO.Path]::IsPathRooted($rel)) { $rel } else { Join-Path (Get-Location) $rel }

  if (!(Test-Path $scriptPath)) {
    Write-Host ("MISSING {0} {1}" -f $name, $scriptPath)
    continue
  }

  try {
    $p = Start-Process -FilePath 'node' -ArgumentList $scriptPath -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
    Start-Sleep -Milliseconds $SleepMs
    if ($p.HasExited) {
      Write-Host ("EXITED_EARLY {0} {1}" -f $name, $p.ExitCode)
    } else {
      Write-Host ("STARTED {0}" -f $name)
      Stop-Process -Id $p.Id -Force
      Write-Host ("STOPPED {0}" -f $name)
    }
  }
  catch {
    Write-Host ("FAIL {0} {1}" -f $name, $_.Exception.Message)
    $fail = $true
  }
}

if ($fail) { exit 1 } else { Write-Host 'ALL_SERVERS_SPAWNABLE'; exit 0 }


