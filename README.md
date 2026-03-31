# iusenixbtw | NixOS + Hyprland Config

> "We're not meant to save the world. We're meant to leave it."

A highly customized, Flake-based NixOS configuration focused on a macOS-inspired aesthetic with an Interstellar-themed twist. This setup utilizes **Hyprland** for tiling window management, **Stylix** for automated theming, and **Waybar** for a clean, glass-morphic top bar.

## 🛠️ Tech Stack

* **OS:** [NixOS](https://nixos.org/) (Unstable/Flake)
* **WM:** [Hyprland](https://hyprland.org/)
* **Theming:** [Stylix](https://github.com/nix-community/stylix) (colors, fonts, cursor)
* **Wallpaper:** [Hyprpaper](https://github.com/hyprwm/hyprpaper) (static) / [mpvpaper](https://github.com/ghost8398/mpvpaper) (animated) - Toggleable
* **Bar:** [Waybar](https://github.com/Alexays/Waybar)
* **Shell:** Zsh (with Starship prompt)
* **Terminal:** [Kitty](https://sw.kovidgoyal.net/kitty/)
* **Browser:** [Zen Browser](https://zen-browser.app/) (Optimized Firefox Fork)
* **Widgets:** AGS (Aylur's GTK Shell) - Control Center

## 📁 Project Structure

```text
.
├── flake.nix               # System entry point with Stylix input
├── configuration.nix       # System-level settings (GC, Boot, Users)
├── scripts/                # Standalone shell scripts
│   ├── ws-sync             # Switch workspaces on both monitors
│   ├── ws-move             # Move windows to correct monitor workspace
│   └── monitor-setup       # Auto-configure monitors on startup
├── wallpapers/             # Wallpaper assets (interstellar.mp4)
├── modules/
│   ├── home.nix            # Home Manager entry point
│   ├── stylix.nix          # Stylix theming configuration
│   ├── wallpaper-manager.nix  # Hyprpaper/mpvpaper toggle + fetch
│   ├── waybar.nix          # macOS style top bar
│   ├── hyprland.nix        # Window manager logic & keybinds
│   ├── hyprlock.nix        # Lock screen (Tokyo Night theme)
│   ├── hypridle.nix        # Idle service (battery-aware)
│   ├── rofi.nix            # App launcher
│   ├── zsh.nix             # Zsh shell with Starship
│   ├── auth.nix            # Git configuration
│   ├── ags.nix             # AGS widget config
│   └── packages.nix        # All installed packages
└── nextsteps.md            # Project roadmap & TODOs
```

## 🎨 Wallpaper System

### Hyprpaper (Default - Static)
- Fetches random minimalistic space/astronaut wallpapers from Unsplash
- Falls back to local wallpapers when offline
- Configured via `modules/wallpaper-manager.nix`

### mpvpaper (Optional - Animated)
- Can toggle to use for the animated Interstellar wallpaper
- Use `SUPER + W` keybind to cycle between wallpaper modes
- See Setup.md for downloading the Interstellar video

### Toggle Command
```bash
wallpaper-toggle hyprpaper   # Use static wallpapers
wallpaper-toggle mpvpaper   # Use animated wallpaper
```

## 🎛️ Keybindings

| Key | Action |
|-----|--------|
| `SUPER + T` | Open Kitty terminal |
| `SUPER + B` | Open Zen Browser |
| `SUPER + Q` | Close active window |
| `SUPER + F` | Toggle floating |
| `SUPER + L` | Lock screen (hyprlock) |
| `SUPER + W` | Cycle wallpaper mode |
| `SUPER + 1-0` | Switch workspace (synced across monitors) |
| `SUPER + SHIFT + 1-0` | Move window to workspace |

## 🔧 Theming with Stylix

Stylix automatically applies:
- Tokyo Night color scheme
- JetBrains Mono font throughout
- Cursor theming

Manual overrides in `modules/stylix.nix` can customize further.

## 📋 Maintenance

### Rebuild System
```bash
sudo nixos-rebuild switch --flake .#iusenixbtw
```

### Auto-Rebuild (commits + pushes first)
```bash
sysbuild
```

### Garbage Collection
Configured to run weekly automatically.