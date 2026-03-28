{ config, pkgs, ... }:

{
  programs.waybar = {
    enable = true;
    settings = {
      mainBar = {
        layer = "top";
        position = "top";
        margin-top = 10;
        margin-left = 20;
        margin-right = 20;
        height = 36;
        spacing = 10;
        
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
            "*" = 5;
          };
        };

        "clock" = {
          format = "{:%I:%M %p}";
          tooltip-format = "<big>{:%Y %B}</big>\n<tt><small>{calendar}</small></tt>";
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
          format-wifi = "  {essid}";
          format-ethernet = "  Wired";
          format-disconnected = "⚠ Disconnected";
        };

        "mpris" = {
          format = "{player_icon} {title} - {artist}";
          format-paused = "{status_icon} <i>{title} - {artist}</i>";
          player-icons = {
            default = "▶";
            mpv = "🎵";
          };
          status-icons = {
            paused = "⏸";
          };
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
        font-size: 14px;
        font-weight: bold;
        border-radius: 12px;
      }

      window#waybar {
        background-color: transparent;
      }

      /* Frosted glass pill modules */
      #workspaces, #window, #clock, #mpris, #pulseaudio, #network, #battery, #custom-notification {
        background-color: rgba(26, 27, 38, 0.7); /* Tokyonight dark base, highly transparent */
        color: #c0caf5; /* Tokyonight text */
        padding: 0px 16px;
        margin-top = 2px;
        margin-bottom = 2px;
        border: 1px solid rgba(122, 162, 247, 0.3); /* Subtle blue glow border */
      }

      #workspaces button {
        color: #565f89;
        padding: 0 4px;
      }

      #workspaces button.active {
        color: #7aa2f7; /* Interstellar/Tokyonight Blue */
      }

      #workspaces button:hover {
        background: transparent;
        color: #bb9af7;
      }

      #clock {
        color: #7aa2f7;
      }

      #custom-notification {
        font-size: 18px;
        padding-right: 20px;
        padding-left: 12px;
      }
    '';
  };
}