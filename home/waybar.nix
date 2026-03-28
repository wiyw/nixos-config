{ config, pkgs, ... }:

{
  programs.waybar = {
    enable = true;
    settings = {
      mainBar = {
        layer = "top";
        position = "top";
        margin = "0"; 
        
        modules-left = [ "hyprland/window" "hyprland/workspaces" ]; 
        modules-center = [ "clock" ];
        modules-right = [ "custom/media" "custom/prev" "custom/play" "custom/next" "pulseaudio" "network" "battery" "custom/swaync" ];
        
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

        "custom/swaync" = {
          tooltip = false;
          format = "{icon}";
          format-icons = {
            notification = " <span foreground='red'><sup></sup></span>";
            none = " ";
            dnd-notification = " <span foreground='red'><sup></sup></span>";
            dnd-none = " ";
          };
          return-type = "json";
          exec-if = "which swaync-client";
          exec = "swaync-client -swb";
          on-click = "swaync-client -t -sw";
          on-click-right = "swaync-client -d -sw";
          escape = true;
        };
      };
    };

    style = ''
      * {
        font-family: "JetBrainsMono Nerd Font", sans-serif;
        font-size: 15px; 
      }

      window#waybar {
        background-color: rgba(26, 27, 38, 0.85);
        border-radius: 0px 0px 8px 8px; 
        color: #c0caf5;
        margin: 0px;
        min-height: 42px; 
      }

      #window {
        font-weight: 900; 
        color: #ffffff;
        margin-left: 15px;  
        margin-right: 15px; 
      }

      #window.empty {
        margin: 0px;
        padding: 0px;
        min-width: 0px;
        border: none;
      }

      #workspaces {
        padding-left: 4px; 
        padding-right: 12px;
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
      
      #custom-prev, #custom-play, #custom-next { color: #c0caf5; padding: 0px 6px; font-size: 18px; }
      #custom-play { color: #7aa2f7; }
      #custom-prev:hover, #custom-play:hover, #custom-next:hover { color: #bb9af7; }
      #custom-media { color: #a9b1d6; padding-right: 12px; padding-left: 6px; }

      /* ======================================= */
      /* macOS Pill Styling for the right side   */
      /* ======================================= */
      
      #pulseaudio,
      #network,
      #battery,
      #custom-swaync {
          background-color: rgba(36, 40, 59, 0.8);
          color: #c0caf5;
          padding: 0px 12px;
          margin: 6px 0px 6px 0px;
      }

      /* Left edge of the pill */
      #pulseaudio {
          border-radius: 16px 0px 0px 16px;
          margin-left: 10px;
      }

      /* Right edge of the pill */
      #custom-swaync {
          border-radius: 0px 16px 16px 0px;
          margin-right: 15px;
          font-size: 16px;
      }

      /* Hover effects */
      #pulseaudio:hover,
      #network:hover,
      #battery:hover,
      #custom-swaync:hover {
          background-color: rgba(61, 89, 161, 0.8);
          transition: all 0.2s ease;
      }
    '';
  };
}