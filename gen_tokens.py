from pathlib import Path
import shutil
P = Path('.')
# tokens.css
(P/'src/tokens.css').write_text(""":root {
  --bg-page:#F5F7FA; --surface-card:#FFFFFF; --surface-subtle:#EEF2F7;
  --brand:#167EFB; --brand-hover:#0D67E8; --azure-400:#2898FF; --azure-200:#A8D4FF; --azure-100:#D6E9FF; --azure-50:#EEF5FF;
  --chip-bg:#0F1115; --chip-text:#FFFFFF;
  --ink:#0F1115; --ink-2:#3E4552; --muted:#6B7485; --placeholder:#8E96A4;
  --border:#ECEFF4; --divider:#EFEFF3;
  --lock-bg:#E2E8F0; --lock-text:#3E4552;
  --ok-bg:#ECFDF5; --ok:#059669; --warn-bg:#FEF3C7; --warn:#D97706; --danger-bg:#FEF2F2; --danger:#DC2626;
  --wash:linear-gradient(180deg,#7DC2FF 0%,#C6E3FF 36%,#EAF4FF 70%,#F5F7FA 100%);
  --cta:linear-gradient(135deg,#2898FF 0%,#0D67E8 100%);
  --featured:linear-gradient(135deg,#2193FF 0%,#0E6CF5 100%);
  --fade:linear-gradient(180deg,rgba(245,247,250,0) 0%,rgba(245,247,250,.92) 45%,#F5F7FA 100%);
  --r-chip:8px; --r-input:14px; --r-sq:14px; --r-card:20px; --r-lg:24px; --r-pill:9999px;
  --sh-card:0 4px 20px rgba(15,23,42,.04); --sh-search:0 4px 16px rgba(15,23,42,.05);
  --sh-cta:0 8px 20px rgba(22,126,251,.28); --sh-fab:0 10px 24px rgba(22,126,251,.36);
  --font:"SF Pro Rounded",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --mono:"JetBrains Mono",ui-monospace,Consolas,monospace;
}
""", encoding="utf-8")
print("tokens ok")
