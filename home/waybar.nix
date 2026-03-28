{ config, pkgs, ... }:

{
  programs.waybar = {
    enable = true;
    settings = {
      mainBar = {
        layer = "top";
        position = "top";
        # Removed top margin, added slight side margins
        margin-top = 0;
        margin-left = 10;
        margin-right = 10;
        height = 34;
        spacing = 4;
        
        modules-left = [ "hyprland/workspaces" "hyprland/window" ];
        modules-center = [ "clock" ];
        modules-right = [ "mpris" "pulseaudio" "network" "battery" "custom/notification" ];

        "hyprland/workspaces" = {
          format = "{icon}";
          format-icons = {
            active = "";
            default = "";
            urgent = "";
          };
          persistent-workspaces = {
            "*" = 10; # Increased to 10
          };
        };

        "clock" = {
          format = "{:%I:%M %p}";
        };

        "pulseaudio" = {
          format = "{icon}  {volume}%";
          format-muted = " Muted";
          format-icons = {
            default = ["" "" ""];
          };
        };

        "network" = {
          format-wifi = "  {essid}";
          format-ethernet = "  Wired";
          format-disconnected = "⚠ Disconnected";
        };

        "mpris" = {
          format = "{player_icon} {title}";
          player-icons = { default = "▶"; };
        };

        "custom/notification" = {
          tooltip = false;
          format = "";
          on-click = "swaync-client -t -sw";
        };
      };
    };

    style = ''
      * {
        font-family: "JetBrainsMono Nerd Font", sans-serif;
        font-size: 13px; /* Slightly smaller text */
        font-weight: bold;
      }

      /* Unified flush top bar with rounded bottom */
      window#waybar {
        background-color: rgba(26, 27, 38, 0.4); /* Highly transparent base */
        border-bottom: 1px solid rgba(122, 162, 247, 0.3);
        border-radius: 0px 0px 14px 14px;
      }

      /* Remove individual module backgrounds so it looks like one clean bar */
      #workspaces, #window, #clock, #mpris, #pulseaudio, #network, #battery, #custom-notification {
        color: #c0caf5;
        padding: 0px 12px;
      }

      #workspaces button {
        color: #565f89;
        padding: 0 6px;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Smooth slidey animation */
      }

      #workspaces button.active {
        color: #7aa2f7; 
      }

      #workspaces button:hover {
        background: rgba(122, 162, 247, 0.3); /* The sliding blur effect behind the icon */
        color: #ffffff;
        box-shadow: 0 0 5px rgba(122, 162, 247, 0.5);
      }

      #clock {
        color: #bb9af7;
      }

      #custom-notification {
        font-size: 16px;
        padding-right: 16px;
      }
    '';
  };
}