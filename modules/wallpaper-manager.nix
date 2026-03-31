{ config, pkgs, lib, ... }:

let
  wallpaperDir = "/etc/nixos/wallpapers";

  fetchSpaceWallpaper = pkgs.writeShellScriptBin "fetch-space-wallpaper" ''
    #!/usr/bin/env bash

    sleep 2

    WALLPAPER_DIR="/etc/nixos/wallpapers"

    FILES=$(ls "$WALLPAPER_DIR"/space*.jpg "$WALLPAPER_DIR"/movie*.jpg 2>/dev/null)
    COUNT=$(echo "$FILES" | wc -l)

    if [ "$COUNT" -eq 0 ] || [ -z "$FILES" ]; then
      echo "No wallpapers found in $WALLPAPER_DIR"
      exit 1
    fi

    SELECTED=$(echo "$FILES" | shuf -n 1)

    pkill swww 2>/dev/null || true
    pkill swww-daemon 2>/dev/null || true
    sleep 0.5

    swww-daemon &
    sleep 1

    swww img "$SELECTED" --transition-type any --transition-duration 2
    echo "Wallpaper set to: $SELECTED"
  '';

  fetchMovieWallpapers = pkgs.writeShellScriptBin "fetch-movie-wallpapers" ''
    #!/usr/bin/env bash

    set -e

    WALLPAPER_DIR="/etc/nixos/wallpapers"
    TEMP_DIR="/tmp/movie-wallpapers"

    mkdir -p "$WALLPAPER_DIR"
    mkdir -p "$TEMP_DIR"

    echo "Fetching space-themed movie wallpapers..."

    fetch_wallpaper() {
        local name="''${1}"
        local output_file="$WALLPAPER_DIR/movie-''${name}.jpg"
        
        if [ -f "$output_file" ]; then
            echo "  [SKIP] ''${name} wallpaper already exists"
            return 0
        fi
        
        echo "  [FETCH] Downloading ''${name} wallpaper..."
        
        local url=""
        case "''${name}" in
            hail-mary)
                url="https://images.unsplash.com/photo-1614730341194-75c607400070?w=3840x2160"
                ;;
            interstellar)
                url="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=3840x2160"
                ;;
            the-martian)
                url="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=3840x2160"
                ;;
            gravity)
                url="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=3840x2160"
                ;;
            arrival)
                url="https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?w=3840x2160"
                ;;
        esac
        
        if [ -n "$url" ]; then
            curl -L -o "$TEMP_DIR/''${name}.jpg" "$url" 2>/dev/null || true
        fi
        
        if [ -f "$TEMP_DIR/''${name}.jpg" ] && [ -s "$TEMP_DIR/''${name}.jpg" ]; then
            mv "$TEMP_DIR/''${name}.jpg" "$output_file"
            echo "  [OK] Saved to $output_file"
        else
            echo "  [FAIL] Could not download ''${name} wallpaper"
        fi
    }

    for movie in hail-mary interstellar the-martian gravity arrival; do
        fetch_wallpaper "$movie"
    done

    rm -rf "$TEMP_DIR"

    echo ""
    echo "Done! Movie wallpapers in $WALLPAPER_DIR:"
    ls -la "$WALLPAPER_DIR"/movie-*.jpg 2>/dev/null || echo "No movie wallpapers found"
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
        echo "swww"
      fi
    }

    set_mode() {
      echo "$1" > "$CONFIG_FILE"
      notify-send "Wallpaper Mode" "Switched to $1"
    }

    current_mode=$(get_current_mode)

    if [ "$1" = "swww" ]; then
      pkill mpvpaper 2>/dev/null
      fetch-space-wallpaper
      set_mode "swww"
    elif [ "$1" = "mpvpaper" ]; then
      pkill swww 2>/dev/null
      hyprctl dispatch exec "[workspace 1 silent] mpvpaper -o 'loop --panscan=1 --input-ipc-server=/tmp/mpv-socket --volume=50 --ao=pipewire' '*' /etc/nixos/wallpapers/interstellar.mp4"
      set_mode "mpvpaper"
    elif [ "$1" = "cycle" ]; then
      if [ "$current_mode" = "swww" ]; then
        wallpaper-toggle mpvpaper
      else
        wallpaper-toggle swww
      fi
    else
      echo "Usage: wallpaper-toggle {swww|mpvpaper|cycle}"
      echo "Current mode: $current_mode"
    fi
  '';
in
{
  home.packages = [
    fetchSpaceWallpaper
    fetchMovieWallpapers
    wallpaperToggle
  ];

  home.sessionVariables = {
    WALLPAPER_DIR = wallpaperDir;
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

  systemd.user.services.fetch-movie-wallpapers = {
    Unit = {
      Description = "Fetch space-themed movie wallpapers";
      After = ["network-online.target"];
      Wants = ["network-online.target"];
    };
    Service = {
      Type = "oneshot";
      ExecStart = "${fetchMovieWallpapers}/bin/fetch-movie-wallpapers";
      RemainAfterExit = true;
    };
    Install = {
      WantedBy = ["graphical-session.target"];
    };
  };
}