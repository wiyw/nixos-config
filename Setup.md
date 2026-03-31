# Setup & Installation Guide

## Prerequisites

- NixOS with flakes enabled
- Internet connection for package downloads

## Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/iusenixbtw/nixos-config.git
   cd nixos-config
   ```

2. Rebuild the system:
   ```bash
   sudo nixos-rebuild switch --flake .#iusenixbtw
   ```

## Wallpaper Setup

### Hyprpaper (Default - Static Wallpapers)

The system automatically fetches minimalistic space/astronaut wallpapers from Unsplash on startup. No manual setup needed!

To manually fetch a new wallpaper:
```bash
fetch-space-wallpaper
```

To change wallpaper sources, edit `home/wallpaper-manager.nix`.

### mpvpaper (Optional - Animated Video Wallpaper)

To use the animated Interstellar wallpaper:

1. Download the video from Google Drive:
   ```
   https://drive.usercontent.google.com/download?id=1rFjfl0s_XdW0TRvn0r-8oztS8jSKWte6&export=download&authuser=0&confirm=t&uuid=834c765f-27f9-4aa7-bc6f-2f219976f597&at=AGN2oQ2UOY43Qd-P1r2zA28inwKn:1774748360846
   ```
   (Credits to Wonger100 on Reddit for creating and rendering the video)

2. Convert to mp4 format with ffmpeg:
   ```bash
   ffmpeg -i ~/Downloads/Live.mov -vf "scale=1920:trunc(ow/a/2)*2" -c:v libx264 -preset ultrafast -c:a aac ./wallpapers/interstellar.mp4
   ```
   (You may need to create the wallpapers directory first)

3. Switch to mpvpaper mode:
   ```bash
   wallpaper-toggle mpvpaper
   ```

## Toggling Between Wallpaper Modes

Use the keyboard shortcut or command:

```bash
# Switch to hyprpaper (static wallpapers)
wallpaper-toggle hyprpaper

# Switch to mpvpaper (animated wallpaper)
wallpaper-toggle mpvpaper
```

Or use the keybinding: `SUPER + W` (cycles through modes)

## First-Time Setup

After initial installation:

1. Restart your computer to ensure all services start properly
2. Configure Git credentials in `home/auth.nix`
3. Adjust Waybar modules as needed in `home/waybar.nix`

## Troubleshooting

### Wallpaper not loading
- Check that `~/.cache/hyprpaper/` directory exists
- Run `fetch-space-wallpaper` manually to see errors

### Hyprland not starting
- Check journal logs: `journalctl -xe | grep hypr`
- Verify GPU drivers are installed in `hardware-configuration.nix`

### Services not starting
- Run `systemctl --user status waybar`
- Run `systemctl --user status hypridle`

## Customization

### Adding Custom Wallpapers
Place images in `home/wallpapers/` and update `wallpaper-manager.nix` to reference them.

### Changing the Theme
Edit `home/stylix.nix` to modify:
- Color scheme (base16 themes available)
- Font families
- Cursor theme