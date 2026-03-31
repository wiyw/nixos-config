{ config, pkgs, lib, ... }:

let
  wallpaperDir = "/etc/nixos/wallpapers";
  localWallpapers = "${wallpaperDir}/*.jpg";

  fetchSpaceWallpaper = pkgs.writeShellScriptBin "fetch-space-wallpaper" ''
    #!/usr/bin/env bash

    WALLPAPER_DIR="${wallpaperDir}"
    WALLPAPERS=($WALLPAPER_DIR/*.jpg)

    COUNT="''${#WALLPAPERS[@]}"
    if [ "$COUNT" -eq 0 ]; then
      echo "No wallpapers found in $WALLPAPER_DIR"
      exit 1
    fi

    RANDOM_INDEX=$((RANDOM % "$COUNT"))
    SELECTED_WALLPAPER="''${WALLPAPERS[$RANDOM_INDEX]}"

    hyprctl hyprpaper wallpaper "" "$SELECTED_WALLPAPER"
    echo "Wallpaper set to: $SELECTED_WALLPAPER"
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
      preload = [
        "${wallpaperDir}/space1.jpg"
        "${wallpaperDir}/space2.jpg"
        "${wallpaperDir}/space3.jpg"
        "${wallpaperDir}/space4.jpg"
        "${wallpaperDir}/space5.jpg"
      ];
      wallpaper = ", ${wallpaperDir}/space1.jpg";
    };
  };
}