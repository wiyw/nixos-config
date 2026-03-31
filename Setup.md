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

### swww (Default - Static Wallpapers)

The system automatically sets a random space wallpaper on startup using `swww`.
Wallpapers are stored in `/etc/nixos/wallpapers/` (space1.jpg - space5.jpg included).

To manually fetch a new random wallpaper:
```bash
fetch-space-wallpaper
```

### mpvpaper (Optional - Animated Video Wallpaper)

To use the animated Interstellar wallpaper:

1. Download the video from Google Drive:
   ```
   https://drive.usercontent.google.com/download?id=1rFjfl0s_XdW0TRvn0r-8oztS8jSKWte6&export=download&authuser=0&confirm=t
   ```
   (Credits to Wonger100 on Reddit)

2. Convert to mp4 format with ffmpeg:
   ```bash
   ffmpeg -i ~/Downloads/Live.mov -vf "scale=1920:trunc(ow/a/2)*2" -c:v libx264 -preset ultrafast -c:a aac ./wallpapers/interstellar.mp4
   ```

3. Switch to mpvpaper mode:
   ```bash
   wallpaper-toggle mpvpaper
   ```

## Toggling Between Wallpaper Modes

Use the keyboard shortcut or command:

```bash
# Switch to swww (static wallpapers)
wallpaper-toggle swww

# Switch to mpvpaper (animated wallpaper)
wallpaper-toggle mpvpaper
```

Or use the keybinding: `SUPER + W` (cycles through modes)

## First-Time Setup

After initial installation:

1. Restart your computer to ensure all services start properly
2. Configure Git credentials in `modules/auth.nix`
3. Adjust Waybar modules as needed in `modules/waybar.nix`

## Troubleshooting

### Wallpaper not loading
- Run `fetch-space-wallpaper` manually to see errors
- Check that wallpapers exist in `/etc/nixos/wallpapers/`

### Hyprland not starting
- Check journal logs: `journalctl --user -xe | grep hypr`
- Verify GPU drivers are installed

### Services not starting
- Run `systemctl --user status waybar`
- Run `systemctl --user status hypridle`

## Customization

### Adding Custom Wallpapers
Place images in `/etc/nixos/wallpapers/` (space*.jpg naming for rotation).

### Using waypaper (GUI)
Run `waypaper` to set wallpaper via GUI selector.