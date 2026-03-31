{ config, pkgs, lib, ... }:

let
  wallpaperDir = "/etc/nixos/wallpapers";

  fetchSpaceWallpaper = pkgs.writeShellScriptBin "fetch-space-wallpaper" ''
    #!/usr/bin/env bash

    sleep 4

    WALLPAPER_DIR="/etc/nixos/wallpapers"
    WALLPAPERS=($WALLPAPER_DIR/*.jpg)
    COUNT=''${#WALLPAPERS[@]}

    if [ "$COUNT" -eq 0 ]; then
      echo "No wallpapers found in $WALLPAPER_DIR"
      exit 1
    fi

    RANDOM_INDEX=$((RANDOM % "$COUNT"))
    SELECTED="''${WALLPAPERS[$RANDOM_INDEX]}"

    MONITOR=$(hyprctl monitors -j | jq -r '.[0].name')
    if [ -z "$MONITOR" ]; then
      MONITOR="eDP-1"
    fi

    echo "preload = $SELECTED" > /tmp/hyprpaper.conf
    echo "wallpaper = $MONITOR,$SELECTED" >> /tmp/hyprpaper.conf

    pkill hyprpaper 2>/dev/null || true
    sleep 1

    hyprpaper -c /tmp/hyprpaper.conf &
    sleep 3

    echo "Wallpaper set to: $SELECTED on monitor $MONITOR"
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
}