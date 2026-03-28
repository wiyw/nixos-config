{ config, pkgs, ... }:

{
  wayland.windowManager.hyprland = {
    enable = true;
    settings = {
      "$mod" = "SUPER";

      # Display Scaling! Change '1' to '1.25' if it's too small, or '0.8' if it's still too big.
      monitor = ",preferred,auto,1";

      # Tell Hyprland to apply the blur effect to Waybar
      layerrule = [
        "blur, waybar"
        "ignorealpha 0.2, waybar"
      ];

      # Autostart your ricing tools
      exec-once = [
        "waybar"
        "swaync"
        "hypridle"
        "mpvpaper -p -o 'loop' '*' /home/greyson/Videos/interstellar.mp4"
        "hyprctl setcursor Bibata-Modern-Classic 24"
      ];

      # Clean gaps and rounded corners
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

      bind = [
        "$mod, T, exec, kitty"
        "$mod, B, exec, zen"
        "$mod, Space, exec, rofi -show drun"
        "$mod, Q, killactive,"
        "$mod, M, exit,"
        "$mod, F, togglefloating,"
        
        # Reload Waybar on the fly
        "$mod, W, exec, killall waybar; waybar"

        # 10 Workspaces
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

        # Move Window to 10 Workspaces
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

      bindm = [
        "$mod, mouse:272, movewindow"   
        "$mod, mouse:273, resizewindow" 
      ];
    };
  };
}