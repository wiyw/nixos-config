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
        "hypridle"
        # MPVPaper command: -vs (video, silent) -o (loop) '*' (all monitors) /path/to/video
        # -p = auto-pause when obscured, -o = pass options to mpv
        "mpvpaper -p -o 'loop' '*' /home/greyson/Videos/interstellar.mp4"
      ];

      # Clean gaps and rounded corners for that MacOS/Interstellar feel
      general = {
        gaps_in = 5;
        gaps_out = 15;
        border_size = 2;
        "col.active_border" = "rgba(7aa2f7aa) rgba(bb9af7aa) 45deg"; # Tokyonight blue/purple glow
        "col.inactive_border" = "rgba(414868aa)";
      };

      decoration = {
        rounding = 12;
        blur = {
          enabled = true;
          size = 8;
          passes = 3;
          new_optimizations = true;
        };
      };

      # The Master Keybinds
      bind = [
        # Core
        "$mod, T, exec, kitty"
        "$mod, B, exec, zen"
        "$mod, Space, exec, rofi -show drun"
        "$mod, Q, killactive,"
        "$mod, M, exit,"
        "$mod, F, togglefloating,"
        
        # Reload Waybar on the fly (Super + W)
        "$mod, W, exec, killall waybar; waybar"

        # Window Focus
        "$mod, left, movefocus, l"
        "$mod, right, movefocus, r"
        "$mod, up, movefocus, u"
        "$mod, down, movefocus, d"

        # Workspaces
        "$mod, 1, workspace, 1"
        "$mod, 2, workspace, 2"
        "$mod, 3, workspace, 3"
        "$mod, 4, workspace, 4"
        "$mod, 5, workspace, 5"

        # Move Window to Workspace
        "$mod SHIFT, 1, movetoworkspace, 1"
        "$mod SHIFT, 2, movetoworkspace, 2"
        "$mod SHIFT, 3, movetoworkspace, 3"
        "$mod SHIFT, 4, movetoworkspace, 4"
        "$mod SHIFT, 5, movetoworkspace, 5"
      ];

      # Mouse binds for dragging and resizing floating windows
      bindm = [
        "$mod, mouse:272, movewindow"   # Left click + Super to move
        "$mod, mouse:273, resizewindow" # Right click + Super to resize
      ];

      # Volume and Brightness Keys
      bindel = [
        ",XF86AudioRaiseVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+"
        ",XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"
        ",XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"
      ];
    };
  };
}