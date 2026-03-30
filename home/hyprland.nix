{ config, pkgs, ... }:

let
  smartBgScript = pkgs.writeShellScriptBin "smart-bg" ''
    #!/usr/bin/env bash
    
    LOG="/tmp/smart-bg.log"
    echo "--- Script Started ---" > $LOG
    
    sleep 2
    CURRENT_STATE="unmuted"

    while true; do
      # Get the IDs of the currently active workspace on EVERY connected monitor
      ACTIVE_WS_IDS=$(${pkgs.hyprland}/bin/hyprctl monitors -j | ${pkgs.jq}/bin/jq '.[] | .activeWorkspace.id')
      
      ALL_HAVE_WINDOWS=true
      
      # Loop through those workspaces to see if any are empty
      for ID in $ACTIVE_WS_IDS; do
        WINS=$(${pkgs.hyprland}/bin/hyprctl workspaces -j | ${pkgs.jq}/bin/jq ".[] | select(.id == $ID) | .windows")
        if [[ -z "$WINS" || "$WINS" == "null" || "$WINS" -eq 0 ]]; then
          ALL_HAVE_WINDOWS=false
          break
        fi
      done
      
      # Mute ONLY if ALL visible workspaces have at least one window
      if [[ "$ALL_HAVE_WINDOWS" == true ]] && [[ "$CURRENT_STATE" == "unmuted" ]]; then
        echo "--> Both sides covered. Muting audio!" >> $LOG
        echo '{ "command": ["set_property", "mute", true] }' | ${pkgs.socat}/bin/socat - UNIX-CONNECT:/tmp/mpv-socket >> $LOG 2>&1
        CURRENT_STATE="muted"
        
      # Unmute if AT LEAST ONE side is showing the bare wallpaper
      elif [[ "$ALL_HAVE_WINDOWS" == false ]] && [[ "$CURRENT_STATE" == "muted" ]]; then
        echo "--> Uncovered wallpaper detected. Unmuting audio!" >> $LOG
        echo '{ "command": ["set_property", "mute", false] }' | ${pkgs.socat}/bin/socat - UNIX-CONNECT:/tmp/mpv-socket >> $LOG 2>&1
        CURRENT_STATE="unmuted"
      fi
      
      sleep 0.5
    done
  '';

  # Switches BOTH monitors simultaneously
  workspaceSyncScript = pkgs.writeShellScriptBin "ws-sync" ''
    #!/usr/bin/env bash
    WS=$1
    ACTIVE_MON=$(${pkgs.hyprland}/bin/hyprctl activeworkspace -j | ${pkgs.jq}/bin/jq -r '.monitor')

    # If DP-4 is connected, trigger dual-workspace logic
    if ${pkgs.hyprland}/bin/hyprctl monitors -j | ${pkgs.jq}/bin/jq -e '.[] | select(.name == "DP-4")' > /dev/null; then
        WS_RIGHT=$((WS + 10))
        
        # Batching executes this in a single frame, preventing flicker and focus-breaking!
        ${pkgs.hyprland}/bin/hyprctl --batch "dispatch workspace $WS ; dispatch workspace $WS_RIGHT ; dispatch focusmonitor $ACTIVE_MON"
    else
        # Fallback: Laptop-only mode
        ${pkgs.hyprland}/bin/hyprctl dispatch workspace $WS
    fi
  '';

  # Moves windows to the correct monitor's paired workspace
  windowMoveScript = pkgs.writeShellScriptBin "ws-move" ''
    #!/usr/bin/env bash
    WS=$1
    ACTIVE_MON=$(${pkgs.hyprland}/bin/hyprctl activeworkspace -j | ${pkgs.jq}/bin/jq -r '.monitor')

    if ${pkgs.hyprland}/bin/hyprctl monitors -j | ${pkgs.jq}/bin/jq -e '.[] | select(.name == "DP-4")' > /dev/null; then
        if [ "$ACTIVE_MON" = "DP-4" ]; then
            ${pkgs.hyprland}/bin/hyprctl dispatch movetoworkspace $WS
        else
            TARGET=$((WS + 10))
            ${pkgs.hyprland}/bin/hyprctl dispatch movetoworkspace $TARGET
        fi
    else
        # Fallback: Laptop-only mode
        ${pkgs.hyprland}/bin/hyprctl dispatch movetoworkspace $WS
    fi
  '';
in
{
  wayland.windowManager.hyprland = {
    enable = true;
    settings = {
      "$mod" = "SUPER";

      monitor = [
        "DP-4, preferred, 0x0, 1"
        "eDP-1, preferred, 1920x0, 1"
        ", preferred, auto, 1"
      ];

      workspace = [
        "1, monitor:DP-4, default:true"
        "2, monitor:DP-4"
        "3, monitor:DP-4"
        "4, monitor:DP-4"
        "5, monitor:DP-4"
        "6, monitor:DP-4"
        "7, monitor:DP-4"
        "8, monitor:DP-4"
        "9, monitor:DP-4"
        "10, monitor:DP-4"
        "11, monitor:eDP-1, default:true"
        "12, monitor:eDP-1"
        "13, monitor:eDP-1"
        "14, monitor:eDP-1"
        "15, monitor:eDP-1"
        "16, monitor:eDP-1"
        "17, monitor:eDP-1"
        "18, monitor:eDP-1"
        "19, monitor:eDP-1"
        "20, monitor:eDP-1"
      ];

      exec-once = [
        "waybar"
        "ags run ~/.config/ags"
        "hypridle"
        "hyprctl setcursor Bibata-Modern-Classic 24"
        "mpvpaper -o 'loop --panscan=1 --input-ipc-server=/tmp/mpv-socket --volume=50 --ao=pipewire' '*' /etc/nixos/home/wallpapers/interstellar.mp4"
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

      binde = [
        ", XF86AudioRaiseVolume, exec, sh -c 'wpctl set-mute @DEFAULT_AUDIO_SINK@ 0; wpctl set-volume -l 1.0 @DEFAULT_AUDIO_SINK@ 5%+'"
        ", XF86AudioLowerVolume, exec, sh -c 'wpctl set-mute @DEFAULT_AUDIO_SINK@ 0; wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-'"
      ];

      bind = [
        ", XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"
        ", XF86AudioPlay, exec, playerctl play-pause"
        ", XF86AudioPrev, exec, playerctl previous"
        ", XF86AudioNext, exec, playerctl next"

        "$mod, T, exec, kitty"
        "$mod, B, exec, zen"
        "$mod, Q, killactive,"
        "$mod, F, togglefloating,"
        "$mod SHIFT, M, exit,"
        "$mod, L, exec, hyprlock"

        "$mod, 1, exec, ${workspaceSyncScript}/bin/ws-sync 1"
        "$mod, 2, exec, ${workspaceSyncScript}/bin/ws-sync 2"
        "$mod, 3, exec, ${workspaceSyncScript}/bin/ws-sync 3"
        "$mod, 4, exec, ${workspaceSyncScript}/bin/ws-sync 4"
        "$mod, 5, exec, ${workspaceSyncScript}/bin/ws-sync 5"
        "$mod, 6, exec, ${workspaceSyncScript}/bin/ws-sync 6"
        "$mod, 7, exec, ${workspaceSyncScript}/bin/ws-sync 7"
        "$mod, 8, exec, ${workspaceSyncScript}/bin/ws-sync 8"
        "$mod, 9, exec, ${workspaceSyncScript}/bin/ws-sync 9"
        "$mod, 0, exec, ${workspaceSyncScript}/bin/ws-sync 10"

        "$mod SHIFT, 1, exec, ${windowMoveScript}/bin/ws-move 1"
        "$mod SHIFT, 2, exec, ${windowMoveScript}/bin/ws-move 2"
        "$mod SHIFT, 3, exec, ${windowMoveScript}/bin/ws-move 3"
        "$mod SHIFT, 4, exec, ${windowMoveScript}/bin/ws-move 4"
        "$mod SHIFT, 5, exec, ${windowMoveScript}/bin/ws-move 5"
        "$mod SHIFT, 6, exec, ${windowMoveScript}/bin/ws-move 6"
        "$mod SHIFT, 7, exec, ${windowMoveScript}/bin/ws-move 7"
        "$mod SHIFT, 8, exec, ${windowMoveScript}/bin/ws-move 8"
        "$mod SHIFT, 9, exec, ${windowMoveScript}/bin/ws-move 9"
        "$mod SHIFT, 0, exec, ${windowMoveScript}/bin/ws-move 10"
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

      layerrule {
        name = ags-control-center-blur
        match:namespace = ^(control-center)$
        blur = true
        ignore_alpha = 0.2
      }

      windowrule {
        name = global-transparency
        match:class = .*
        opacity = 0.70 0.60 
      }
    '';
  };
}