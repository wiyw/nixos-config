# AI Agent Documentation - NixOS Hyprland Configuration

> This file documents the project for AI agents. Humans should refer to README.md and Setup.md.

## Project Overview

This is a NixOS flake-based configuration for a Hyprland desktop environment with a macOS-inspired + Interstellar aesthetic.

**System Name:** `iusenixbtw`

**Tech Stack:**
- NixOS (Unstable) with Flakes
- Hyprland (Wayland compositor)
- Stylix (theming)
- Hyprpaper/mpvpaper (wallpaper - toggleable)
- Waybar (top bar)
- Home Manager (user configuration)
- AGS (widget system)

---

## File Structure

```
/home/greyson/nixos-config/
├── flake.nix                 # Main flake entry point
├── configuration.nix         # System-level config (boot, users, services)
├── hardware-configuration.nix # Auto-generated hardware config
├── home/
│   ├── home.nix             # Home Manager entry (imports all modules)
│   ├── packages.nix         # All installed packages
│   ├── stylix.nix           # Stylix theming config (TO BE CREATED)
│   ├── wallpaper-manager.nix # Hyprpaper/mpvpaper toggle (TO BE CREATED)
│   ├── hyprland.nix         # Window manager config, keybinds, scripts
│   ├── hyprlock.nix         # Lock screen config
│   ├── hypridle.nix         # Idle/lock/suspend service (battery-aware)
│   ├── waybar.nix           # Top bar modules
│   ├── rofi.nix             # App launcher
│   ├── zsh.nix              # Zsh + Starship config
│   ├── auth.nix             # Git username/email
│   ├── ags.nix              # AGS widget config
│   └── wallpapers/          # Wallpaper assets
├── README.md                 # Human documentation
├── Setup.md                  # Setup instructions
├── nextsteps.md              # Project roadmap
└── agents.md                 # This file
```

---

## Module Reference

### flake.nix
- Defines `iusenixbtw` NixOS system
- Inputs: nixpkgs, home-manager, zen-browser, ags, stylix (to be added)
- Must add `stylix` input and pass `inputs` to home-manager

### home/hyprland.nix
Contains several custom scripts:
- **`smart-bg`** - Muted mpvpaper audio when windows cover wallpaper (now deprecated)
- **`ws-sync`** - Switches workspaces on both monitors simultaneously
- **`ws-move`** - Moves windows to correct monitor's paired workspace
- **`monitor-setup`** - Auto-configures monitors on startup (DP-4 + eDP-1)

**Key exec-once commands:**
```nix
exec-once = [
  "waybar"
  "ags run ~/.config/ags"
  "hypridle"
  "hyprctl setcursor Bibata-Modern-Classic 24"
  # mpvpaper removed - to be replaced with hyprpaper
  "${smartBgScript}/bin/smart-bg"  # deprecated
  "${monitorSetupScript}/bin/monitor-setup"
];
```

### home/hypridle.nix
Battery-aware idle service:
- Lock after 300s (only on battery)
- DPMS off after 330s (only on battery)
- Suspend after 900s (only on battery)
- Uses `battery-idle` script to check power state

### home/hyprlock.nix
Tokyo Night themed lock screen with:
- Screenshot background + blur
- Clock (large, centered)
- Date
- Greeting with username
- Password input field

### home/waybar.nix
macOS-style top bar with:
- Workspaces (1-10 on external, 11-20 on laptop)
- Window title
- Media player controls
- Network status
- Battery
- Clock

### home/packages.nix
Key packages:
- `zen-browser` - Browser
- `kitty` - Terminal
- `waybar` - Status bar
- `hyprlock` / `hypridle` - Lock/idle
- `mpvpaper` - Animated wallpaper (keep for toggle)
- `hyprpaper` - Static wallpaper (TO BE ADDED)
- Starship, fzf, eza, bat, etc.

---

## Planned Changes

### 1. Add Stylix (Stylix is not yet installed)

**In flake.nix:**
```nix
stylix.url = "github:nix-community/stylix";
# In outputs, pass inputs to home-manager
```

**Create home/stylix.nix:**
```nix
{ config, pkgs, lib, inputs, ... }:
{
  imports = [ inputs.stylix.homeManagerModules.stylix ];
  
  stylix = {
    enable = true;
    # Will use hyprpaper wallpaper path
  };
}
```

### 2. Replace mpvpaper with hyprpaper (with toggle)

**In home/packages.nix:**
- Keep `mpvpaper` (for toggle option)
- Add `hyprpaper`

**Create home/wallpaper-manager.nix:**
- Configure hyprpaper service
- Create `fetch-space-wallpaper` script (Unsplash)
- Create `wallpaper-toggle` script
- Add keybind `SUPER + W` to cycle modes

### 3. Update home/home.nix
Import new modules:
```nix
imports = [
  ./stylix.nix
  ./wallpaper-manager.nix
  # ... existing imports
];
```

---

## Keybindings

| Key | Action |
|-----|--------|
| `SUPER` | Mod key |
| `SUPER + T` | Open Kitty |
| `SUPER + B` | Open Zen Browser |
| `SUPER + Q` | Close window |
| `SUPER + F` | Toggle floating |
| `SUPER + L` | Lock screen |
| `SUPER + W` | Cycle wallpaper mode (TO BE ADDED) |
| `SUPER + 1-0` | Workspace 1-10 |
| `SUPER + SHIFT + 1-0` | Move to workspace |
| `SUPER + Click` | Drag window |
| `SUPER + Right Click` | Resize window |
| `SUPER + SUPER_L` | Open Rofi |

---

## Common Tasks

### Rebuild System
```bash
sudo nixos-rebuild switch --flake .#iusenixbtw
```

### Quick Rebuild (auto-commits)
```bash
sysbuild
```

### Check Hyprland Errors
```bash
journalctl --user -xe | grep hypr
```

### Check Service Status
```bash
systemctl --user status waybar
systemctl --user status hypridle
systemctl --user status hyprpaper
```

### Test Configuration (without applying)
```bash
sudo nixos-rebuild dry-activate --flake .#iusenixbtw
```

---

## Style Guide

- Use 2 spaces for indentation in Nix files
- Prefer `pkgs.writeShellScriptBin` for custom scripts (keeps them in store)
- Use descriptive names for custom scripts (e.g., `smart-bg`, `ws-sync`)
- Keep packages alphabetically sorted where possible
- Use Tokyo Night color scheme as default (`rgba(7aa2f7...)`, etc.)
- Comment complex logic but keep it minimal

---

## Known Issues

1. **AGS compilation error** - Current issue in `home/ags/ControlCenter.tsx`
   - Error: `No matching export in "../ags-js-lib/lib/index.ts" for import "bind"`
   - Related to outdated AGS version or API changes

2. **Unsplash Source deprecation** - May need alternative wallpaper source
   - Alternative: Use `picsum.photos` or hardcoded URLs

---

## Testing New Changes

1. Make changes to Nix files
2. Run `sudo nixos-rebuild dry-activate --flake .#iusenixbtw` to check for errors
3. If dry-activate passes, run `sudo nixos-rebuild switch --flake .#iusenixbtw`
4. Log out and back in (or restart)

---

## Important Paths

- User config: `~/.config/`
- Hyprland socket: `/tmp/hypr/*.sock`
- mpvpaper socket: `/tmp/mpv-socket`
- Wallpaper cache: `~/.cache/hyprpaper/`
- AGS config: `~/.config/ags/`

---

## Contact

- **User:** greyson
- **System:** iusenixbtw (Dell XPS laptop + external monitor)
- **Monitors:** eDP-1 (laptop, 11-20), DP-4 (external, 1-10)