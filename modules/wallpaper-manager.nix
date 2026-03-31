{ config, pkgs, lib, ... }:

let
  wallpaperDir = "${config.home.homeDirectory}/wallpapers";
  cacheDir = "${config.home.homeDirectory}/.cache/hyprpaper";

  fetchSpaceWallpaper = pkgs.writeShellScriptBin "fetch-space-wallpaper" ''
    #!/usr/bin/env bash

    WALLPAPER_DIR="${cacheDir}"
    mkdir -p "$WALLPAPER_DIR"

    # Try multiple sources for space/astronaut wallpapers
    # Source 1: Wallhaven random (space query)
    URL="https://wallhaven.cc/random?categories=111&purity=100&sorting=random&resolutions=1920x1080"

    # Download the HTML to find the image URL
    HTML=$(curl -s "$URL")
    IMAGE_URL=$(echo "$HTML" | grep -oP 'https://w.wallhaven.cc/full/[a-z0-9]+/wallhaven-[a-z0-9]+\.(jpg|png)' | head -1)

    if [ -z "$IMAGE_URL" ]; then
      # Fallback: use picsum with space/galaxy seed
      IMAGE_URL="https://picsum.photos/seed/spacex/1920/1080"
    fi

    # Download the image
    curl -L -o "$WALLPAPER_DIR/wallpaper.jpg" "$IMAGE_URL" 2>/dev/null

    if [ -f "$WALLPAPER_DIR/wallpaper.jpg" ]; then
      # Set the wallpaper via hyprctl
      hyprctl hyprpaper wallpaper "" "$WALLPAPER_DIR/wallpaper.jpg"
      echo "Wallpaper updated: $IMAGE_URL"
    else
      echo "Failed to download wallpaper"
      exit 1
    fi
  '';

  wallpaperToggle = pkgs.writeShellScriptBin "wallpaper-toggle" ''
    #!/usr/bin/env bash

    CONFIG_DIR="$HOME/.config/nixos"
    mkdir -p "$CONFIG_DIR"
    CONFIG_FILE="$CONFIG_DIR/wallpaper-mode"

    get_current_mode() {
      if [ -f "$CONFIG_FILE" ]; then
        cat "$CONFIG_FILE"
      else
        echo "hyprpaper"
      fi
    }

    set_mode() {
      echo "$1" > "$CONFIG_FILE"
      notify-send "Wallpaper Mode" "Switched to $1"
    }

    current_mode=$(get_current_mode)

    if [ "$1" = "hyprpaper" ]; then
      pkill mpvpaper 2>/dev/null
      hyprctl dispatch exec "[workspace 1 silent] hyprpaper"
      set_mode "hyprpaper"
    elif [ "$1" = "mpvpaper" ]; then
      pkill hyprpaper 2>/dev/null
      hyprctl dispatch exec "[workspace 1 silent] mpvpaper -o 'loop --panscan=1 --input-ipc-server=/tmp/mpv-socket --volume=50 --ao=pipewire' '*' /etc/nixos/wallpapers/interstellar.mp4"
      set_mode "mpvpaper"
    elif [ "$1" = "cycle" ]; then
      if [ "$current_mode" = "hyprpaper" ]; then
        wallpaper-toggle mpvpaper
      else
        wallpaper-toggle hyprpaper
      fi
    else
      echo "Usage: wallpaper-toggle {hyprpaper|mpvpaper|cycle}"
      echo "Current mode: $current_mode"
    fi
  '';
in
{
  home.packages = [
    fetchSpaceWallpaper
    wallpaperToggle
  ];

  home.sessionVariables = {
    WALLPAPER_DIR = wallpaperDir;
    WALLPAPER_CACHE = cacheDir;
  };

  systemd.user.services.wallpaper-fetch = {
    Unit = {
      Description = "Fetch random space wallpaper on startup";
      After = ["graphical-session.target"];
      PartOf = ["graphical-session.target"];
    };
    Service = {
      Type = "oneshot";
      ExecStart = "${fetchSpaceWallpaper}/bin/fetch-space-wallpaper";
      RemainAfterExit = true;
    };
    Install = {
      WantedBy = ["graphical-session.target"];
    };
  };

  services.hyprpaper = {
    enable = true;
    settings = {
      preload = [ "${cacheDir}/wallpaper.jpg" ];
      wallpaper = ", ${cacheDir}/wallpaper.jpg";
    };
  };
}