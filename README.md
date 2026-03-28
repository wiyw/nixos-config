# 🌌 iusenixbtw | NixOS + Hyprland Config

> "We're not meant to save the world. We're meant to leave it."

A highly customized, Flake-based NixOS configuration focused on a macOS-inspired aesthetic with an Interstellar-themed twist. This setup utilizes **Hyprland** for tiling window management and **Waybar** for a clean, glass-morphic top bar.

## 🛠️ Tech Stack

* **OS:** [NixOS](https://nixos.org/) (Unstable/Flake)
* **WM:** [Hyprland](https://hyprland.org/)
* **Bar:** [Waybar](https://github.com/Alexays/Waybar)
* **Shell:** Zsh (with custom plugins)
* **Terminal:** Kitty
* **Browser:** Zen Browser (Optimized Firefox Fork)
* **Widgets:** AGS (Aylur's GTK Shell) - *In Migration*
* **Wallpaper:** Live Interstellar video engine via `mpvpaper`

## 📁 Project Structure

```text
.
├── flake.nix               # System entry point
├── configuration.nix       # System-level settings (GC, Boot, Users)
├── home/
│   ├── home.nix            # Home Manager entry point
│   ├── waybar.nix          # macOS style top bar
│   ├── hyprland.nix        # Window manager logic & keybinds
│   ├── auth.nix            # Secure Git & Identity module
│   ├── secrets.nix         # (GIT IGNORED) Local private data
│   └── wallpapers/         # Cinematic assets
└── nextsteps.md            # Project roadmap & TODOs

