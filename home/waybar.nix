{ config, pkgs, ... }:

{
  programs.waybar = {
    enable = true;
    settings = {
      mainBar = {
        layer = "top";
        position = "top";
        margin-top = 0;
        margin-left = 10;
        margin-right = 10;
        height = 34;
        spacing = 4;
        
        modules-left = [ "hyprland/window" "custom/apps" "custom/games" "hyprland/workspaces" ];
        modules-center = [ "clock" ];
        # Added the custom media buttons here
        modules-right = [ "custom/prev" "custom/play" "custom/next" "mpris" "pulseaudio" "network" "battery" "custom/notification" ];

        "hyprland/workspaces" = {
          format = "{icon}";
          format-icons = {
            active = "";
            default = "";
            urgent = "";
          };
          persistent-workspaces = {
            "*" = 10;
          };
        };

        "hyprland/window" = {
          format = "<b>{title}</b>";
          max-length = 20;
          separate-outputs = true;
        };

        "custom/apps" = {
          format = "Apps";
          on-click = "rofi -show drun"; # We will change this to your custom app later
        };

        "custom/games" = {
          format = "Games";
          on-click = "rofi -show run"; # We will change this to your custom app later
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
          format-wifi = " ";
          format-ethernet = " ";
          format-disconnected = "⚠";
        };

        # New Media Setup
        "custom/prev" = {
          format = "󰒮";
          on-click = "playerctl previous";
        };
        "custom/play" = {
          format = "󰐊/󰏤";
          on-click = "playerctl play-pause";
        };
        "custom/next" = {
          format = "󰒭";
          on-click = "playerctl next";
        };
        "mpris" = {
          format = "{title} - {artist}";
          format-paused = "<i>{title} - {artist}</i>";
          max-length = 35;
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
        background-color: rgba(26, 27, 38, 0.8); /* Matches your dark theme */
        border-bottom: 2px solid #7aa2f7; /* Your Hyprland border color */
        border-radius: 0px 0px 15px 15px; /* Flat top, rounded bottom */
        color: #c0caf5;
        margin: 0px;
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

      #custom-prev, #custom-play, #custom-next {
        color: #c0caf5;
        padding: 0px 6px;
        font-size: 16px;
      }
      
      #custom-play {
        color: #7aa2f7;
      }

      #custom-prev:hover, #custom-play:hover, #custom-next:hover {
        color: #bb9af7;
      }

      #mpris {
        color: #a9b1d6;
        padding-right: 12px;
        padding-left: 6px;
      }

      #window, #custom-apps, #custom-games {
        color: #c0caf5;
        padding: 0px 10px;
        font-weight: bold;
      }

      #custom-apps:hover, #custom-games:hover {
        color: #7aa2f7;
        transition: color 0.2s ease;
      }
    '';
  };
}