{ config, pkgs, ... }:

{
  wayland.windowManager.hyprland = {
    enable = true;
    settings = {
      "$mod" = "SUPER";

      # Autostart your ricing tools
      exec-once = [
        "waybar"
        "swaync"
        "hyprpaper"
        "hypridle"
      ];

      bind = [
        "$mod, T, exec, kitty"
        "$mod, B, exec, zen" # Launch Zen Browser
        "$mod, Space, exec, rofi -show drun" # Launch App Launcher
        "$mod, M, exit,"
      ];
    };
  };
}