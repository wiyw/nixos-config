{ config, pkgs, ... }:

{
  programs.waybar = {
    enable = true;
    settings = {
      mainBar = {
        layer = "top";
        position = "top";
        margin = "0"; # Forces the bar to touch the left/right edges
        
        # Removed "custom/apps" and "custom/games"
        modules-left = [ "hyprland/window" "hyprland/workspaces" ]; 
        
        "hyprland/window" = {
          format = "{class}"; 
          max-length = 50;
          separate-outputs = true;
          # This makes the raw class names look nice and polished
          rewrite = {
            "kitty" = "Kitty";
            "zen" = "Zen Browser";
            "zen-alpha" = "Zen Browser";
            "org.gnome.Nautilus" = "Files";
            "" = ""; # Keeps it completely blank when nothing is open
          };
        };

        # ... (keep your other modules exactly the same) ...

        "mpris" = {
          format = "{title} - {artist}";
          format-paused = "<i>{title} - {artist}</i>";
          max-length = 35;
          # This stops the browser from crashing Waybar!
          ignored-players = [ "zen" "zen-alpha" "firefox" "chromium" ]; 
        };

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
        font-size: 15px; /* 1. Increased base size to make Waybar bigger */
      }

      window#waybar {
        background-color: rgba(26, 27, 38, 0.85);
        border-radius: 0px 0px 8px 8px; /* 2. Less dramatic curve */
        color: #c0caf5;
        margin: 0px;
        min-height: 42px; /* 3. Makes the bar itself thicker */
      }

      #window {
        font-weight: 900; 
        color: #ffffff;
        margin-left: 15px;  /* Pushes title from the left edge when open */
        margin-right: 15px; /* Keeps the title from crowding the workspaces */
      }

      /* This completely obliterates the module when no apps are open */
      #window.empty {
        margin: 0px;
        padding: 0px;
        min-width: 0px;
        border: none;
      }

      /* Adjusting the workspaces so they hug the left wall when empty */
      #workspaces {
        padding-left: 4px; /* Tiny padding so it doesn't hard-clip the screen edge */
        padding-right: 12px;
      }

      /* Removed #workspaces and #window from this group */
      #clock, #mpris, #pulseaudio, #network, #battery, #custom-notification {
        color: #c0caf5;
        padding: 0px 12px;
      }

      #workspaces button {
        color: #565f89;
        padding: 0 6px;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      #workspaces button.active {
        color: #7aa2f7; 
      }

      #workspaces button:hover {
        background: rgba(122, 162, 247, 0.3);
        color: #ffffff;
        box-shadow: 0 0 5px rgba(122, 162, 247, 0.5);
      }

      #clock { color: #bb9af7; }
      #custom-notification { font-size: 18px; padding-right: 16px; }
      #custom-prev, #custom-play, #custom-next { color: #c0caf5; padding: 0px 6px; font-size: 18px; }
      #custom-play { color: #7aa2f7; }
      #custom-prev:hover, #custom-play:hover, #custom-next:hover { color: #bb9af7; }
      #mpris { color: #a9b1d6; padding-right: 12px; padding-left: 6px; }
    '';
  };
}