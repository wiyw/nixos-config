{ config, pkgs, ... }:

let
  scriptsDir = ../scripts;
in
{
  wayland.windowManager.hyprland = {
    enable = true;
    settings = {
      "$mod" = "SUPER";

      monitor = [
        "eDP-1, preferred, 0x0, 1"
        ", preferred, auto, 1"
      ];

      workspace = [
        "1, default:true"
        "2"
        "3"
        "4"
        "5"
        "6"
        "7"
        "8"
        "9"
        "10"
        "11"
        "12"
        "13"
        "14"
        "15"
        "16"
        "17"
        "18"
        "19"
        "20"
      ];

      exec-once = [
        "waybar"
        "ags run ~/.config/ags"
        "hypridle"
        "hyprctl setcursor Bibata-Modern-Classic 24"
        "${scriptsDir}/monitor-setup"
      ];

      general = {
        gaps_in = 5;
        gaps_out = 15;
        border_size = 2;
        "col.active_border" = "rgba(7aa2f7aa) rgba(bb9af7aa) 45deg"; 
        "col.inactive_border" = "rgba(414868aa)";
      };

      decoration = {
        rounding = 12;
        blur = {
          enabled = true;
          size = 8;
          passes = 3;
        };
      };

      binde = [
        ", XF86AudioRaiseVolume, exec, sh -c 'wpctl set-mute @DEFAULT_AUDIO_SINK@ 0; wpctl set-volume -l 1.0 @DEFAULT_AUDIO_SINK@ 5%+'"
        ", XF86AudioLowerVolume, exec, sh -c 'wpctl set-mute @DEFAULT_AUDIO_SINK@ 0; wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-'"
      ];

      bind = [
        ", XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"
        ", XF86AudioPlay, exec, playerctl play-pause"
        ", XF86AudioPrev, exec, playerctl previous"
        ", XF86AudioNext, exec, playerctl next"

        "$mod, C, exec, ags toggle control-center"

        "$mod, T, exec, kitty"
        "$mod, B, exec, zen"
        "$mod, Q, killactive,"
        "$mod, F, togglefloating,"
        "$mod SHIFT, M, exit,"
        "$mod, L, exec, hyprlock"
        "$mod, W, exec, wallpaper-toggle cycle"

        "$mod, 1, exec, ${scriptsDir}/ws-sync 1"
        "$mod, 2, exec, ${scriptsDir}/ws-sync 2"
        "$mod, 3, exec, ${scriptsDir}/ws-sync 3"
        "$mod, 4, exec, ${scriptsDir}/ws-sync 4"
        "$mod, 5, exec, ${scriptsDir}/ws-sync 5"
        "$mod, 6, exec, ${scriptsDir}/ws-sync 6"
        "$mod, 7, exec, ${scriptsDir}/ws-sync 7"
        "$mod, 8, exec, ${scriptsDir}/ws-sync 8"
        "$mod, 9, exec, ${scriptsDir}/ws-sync 9"
        "$mod, 0, exec, ${scriptsDir}/ws-sync 10"

        "$mod SHIFT, 1, exec, ${scriptsDir}/ws-move 1"
        "$mod SHIFT, 2, exec, ${scriptsDir}/ws-move 2"
        "$mod SHIFT, 3, exec, ${scriptsDir}/ws-move 3"
        "$mod SHIFT, 4, exec, ${scriptsDir}/ws-move 4"
        "$mod SHIFT, 5, exec, ${scriptsDir}/ws-move 5"
        "$mod SHIFT, 6, exec, ${scriptsDir}/ws-move 6"
        "$mod SHIFT, 7, exec, ${scriptsDir}/ws-move 7"
        "$mod SHIFT, 8, exec, ${scriptsDir}/ws-move 8"
        "$mod SHIFT, 9, exec, ${scriptsDir}/ws-move 9"
        "$mod SHIFT, 0, exec, ${scriptsDir}/ws-move 10"
      ];

      bindr = [
        "$mod, SUPER_L, exec, pkill rofi || rofi -show drun"
      ];

      bindm = [
        "$mod, mouse:272, movewindow"   
        "$mod, mouse:273, resizewindow" 
      ];
    };

    extraConfig = ''
      # Layer rules for waybar (existing)
      layerrule {
        name = waybar-blur
        match:namespace = waybar
        blur = on
        ignore_alpha = 0.2
      }

      # Layer rules for AGS Control Center
      layerrule {
        blur = on
        ignore_alpha = 0.3
        match:namespace = ^(control-center)$
      }

      # Popup windows
      layerrule {
        blur = on
        ignore_alpha = 0.3
        match:title = ^(.*-popup)$
      }
    '';
  };
}