{ config, pkgs, ... }:

let
  smartBgScript = pkgs.writeShellScriptBin "smart-bg" ''
    #!/usr/bin/env bash
    
    # Give mpvpaper a second to start and create the socket
    sleep 2

    while true; do
      WINDOWS=$(hyprctl activeworkspace | grep "windows:" | awk '{print $2}')
      
      if [[ "$WINDOWS" -gt 0 ]]; then
        # Mute audio via the IPC socket
        echo '{ "command": ["set_property", "mute", true] }' | ${pkgs.socat}/bin/socat - /tmp/mpv-socket > /dev/null 2>&1
      else
        # Unmute audio via the IPC socket
        echo '{ "command": ["set_property", "mute", false] }' | ${pkgs.socat}/bin/socat - /tmp/mpv-socket > /dev/null 2>&1
      fi
      
      sleep 0.5
    done
  '';
in
{
  wayland.windowManager.hyprland = {
    enable = true;
    settings = {
      "$mod" = "SUPER";

      monitor = ",preferred,auto,1";

      exec-once = [
        "waybar"
        "swaync"
        "hypridle"
        "hyprctl setcursor Bibata-Modern-Classic 24"
        # Added --volume=10 right after the socket command!
        "mpvpaper -o 'loop --panscan=1 --input-ipc-server=/tmp/mpv-socket --volume=10' '*' /home/greyson/Videos/interstellar.mp4"
        "${smartBgScript}/bin/smart-bg"
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

      # REPEATABLE BINDS (Hold down to change volume)
      binde = [
        # Unmutes first, then raises volume
        ", XF86AudioRaiseVolume, exec, sh -c 'wpctl set-mute @DEFAULT_AUDIO_SINK@ 0; wpctl set-volume -l 1.0 @DEFAULT_AUDIO_SINK@ 5%+'"
        # Unmutes first, then lowers volume
        ", XF86AudioLowerVolume, exec, sh -c 'wpctl set-mute @DEFAULT_AUDIO_SINK@ 0; wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-'"
      ];

      # STANDARD BINDS
      bind = [
        # Media Keys
        ", XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"
        ", XF86AudioPlay, exec, playerctl play-pause"
        ", XF86AudioPrev, exec, playerctl previous"
        ", XF86AudioNext, exec, playerctl next"

        # Window Controls
        "$mod, T, exec, kitty"
        "$mod, B, exec, zen"
        "$mod, Q, killactive,"
        "$mod, F, togglefloating,"
        "$mod SHIFT, M, exit,"
        "$mod, W, exec, killall waybar; waybar"

        # Workspaces
        "$mod, 1, workspace, 1"
        "$mod, 2, workspace, 2"
        "$mod, 3, workspace, 3"
        "$mod, 4, workspace, 4"
        "$mod, 5, workspace, 5"
        "$mod, 6, workspace, 6"
        "$mod, 7, workspace, 7"
        "$mod, 8, workspace, 8"
        "$mod, 9, workspace, 9"
        "$mod, 0, workspace, 10"

        # Move to Workspaces
        "$mod SHIFT, 1, movetoworkspace, 1"
        "$mod SHIFT, 2, movetoworkspace, 2"
        "$mod SHIFT, 3, movetoworkspace, 3"
        "$mod SHIFT, 4, movetoworkspace, 4"
        "$mod SHIFT, 5, movetoworkspace, 5"
        "$mod SHIFT, 6, movetoworkspace, 6"
        "$mod SHIFT, 7, movetoworkspace, 7"
        "$mod SHIFT, 8, movetoworkspace, 8"
        "$mod SHIFT, 9, movetoworkspace, 9"
        "$mod SHIFT, 0, movetoworkspace, 10"
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
      layerrule {
        name = waybar-blur
        match:namespace = waybar
        blur = on
        ignore_alpha = 0.2
      }

      # The new 0.53+ syntax for global transparency
      # Increased transparency (70% active, 60% inactive)
      windowrule {
        name = global-transparency
        match:class = .*
        opacity = 0.70 0.60 
      }
    '';
  };
}