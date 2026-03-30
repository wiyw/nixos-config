{ config, pkgs, ... }:

{
  programs.waybar = {
    enable = true;
    settings = {
      mainBar = {
        layer = "top";
        position = "top";
        margin = "0"; 
        
        modules-left = [ "custom/os_button" "hyprland/window" "hyprland/workspaces" ]; 
        modules-center = [ ];
        modules-right = [ "custom/media" "custom/prev" "custom/play" "custom/next" "network" "pulseaudio" "battery" "custom/control-center" "clock" ];
        
        "custom/os_button" = {
          format = ""; 
          tooltip = false;
          on-click = "rofi -show drun"; 
        };

        "hyprland/window" = {
          format = "{class}"; 
          max-length = 50;
          separate-outputs = true;
          rewrite = {
            "kitty" = "Kitty";
            "zen" = "Zen Browser";
            "zen-beta" = "Zen Browser";
            "org.gnome.Nautilus" = "Files";
            "" = ""; 
          };
        };

        "custom/media" = {
          format = "{}";
          max-length = 40;
          escape = true;
          exec = "playerctl metadata --format '{{title}} - {{artist}}' 2>/dev/null";
          interval = 2;
          on-click = "playerctl play-pause";
        };

        "hyprland/workspaces" = {
          format = "{icon}";
          format-icons = {
            active = "";    # Currently focused
            visible = "";   # On screen, but not focused (The Fix!)
            default = "";   # Empty/Hidden
            urgent = "";
          };
          persistent-workspaces = {
            "DP-4" = [ 1 2 3 4 5 6 7 8 9 10 ];
            "eDP-1" = [ 11 12 13 14 15 16 17 18 19 20 ];
          };
        };
        
        "clock" = {
          format = "{:%a %b %e  %I:%M %p}";
        };

        "pulseaudio" = {
          format = "{icon}  {volume}%";
          format-muted = " Muted";
          format-icons = {
            default = ["" "" ""];
          };
          on-click = "pavucontrol";
        };

        "network" = {
          format-wifi = " ";
          format-ethernet = " ";
          format-disconnected = "⚠";
        };

        "battery" = {
          states = {
            warning = 30;
            critical = 15;
          };
          format = "{icon}  {capacity}%";
          format-charging = "󰂄  {capacity}%";
          format-plugged = "  {capacity}%";
          format-icons = ["" "" "" "" ""];
        };

        "custom/prev" = { format = "󰒮"; on-click = "playerctl previous"; };
        "custom/play" = { format = "󰐊"; on-click = "playerctl play-pause"; };
        "custom/next" = { format = "󰒭"; on-click = "playerctl next"; };

        "custom/control-center" = {
          tooltip = false;
          format = " ";
          on-click = "ags request toggle-control-center";
        };
      };
    };

    style = ''
      * {
        font-family: "JetBrainsMono Nerd Font", sans-serif;
        font-size: 15px;
        font-weight: bold;
      }

      window#waybar {
        background-color: rgba(26, 27, 38, 0.65); 
        color: #ffffff;
        margin: 0px;
        min-height: 38px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      #custom-os_button { font-size: 20px; color: #c0caf5; padding: 0px 16px; }

      #window { color: #ffffff; padding-left: 10px; padding-right: 15px; }
      #window.empty { margin: 0px; padding: 0px; min-width: 0px; border: none; }

      #workspaces { 
        padding-left: 4px;
        padding-right: 8px;
        border-radius: 50px;
        border: 2px solid rgba(255, 255, 255, 0.1);
        margin-right: 8px;
      }
      #workspaces button {
        color: #565f89;
        padding: 0 4px;
        transition: all 0.3s ease;
      }
      #workspaces button.active { color: #ffffff; }

      #clock, #pulseaudio, #network, #battery, #custom-control-center {
          color: #ffffff;
          padding: 0px 10px;
      }
      #clock { padding-right: 16px; padding-left: 10px; }
      #custom-prev, #custom-play, #custom-next { color: #ffffff; padding: 0px 6px; font-size: 18px; }
      #custom-media { color: #a9b1d6; padding-right: 12px; padding-left: 6px; }
    '';
  };
}