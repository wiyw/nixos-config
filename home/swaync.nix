{ config, pkgs, ... }:

{
  services.swaync = {
    enable = true;
    settings = {
      positionX = "right";
      positionY = "top";
      layer = "overlay";
      control-center-layer = "top";
      layer-shell = true;
      cssPriority = "application";
      control-center-margin-top = 10;
      control-center-margin-bottom = 10;
      control-center-margin-right = 10;
      control-center-margin-left = 10;
      notification-2d-margin = 10;
      notification-icon-size = 64;
      control-center-width = 380;
      fit-to-screen = false;
      
      # Added buttons-grid right at the top!
      widgets = [
        "buttons-grid"
        "volume"
        "mpris"
        "dnd"
        "title"
        "notifications"
      ];
      
      widget-config = {
        title = {
          text = "Notifications";
          clear-all-button = true;
          button-text = "Clear All";
        };
        dnd = {
          text = "Do Not Disturb";
        };
        mpris = {
          image-size = 96;
          image-radius = 12;
        };
        
        # The new macOS style Quick Settings buttons
        buttons-grid = {
          actions = [
            {
              label = " ";
              command = "nm-connection-editor";
            }
            {
              label = " ";
              command = "blueman-manager";
            }
            {
              label = " ";
              command = "pavucontrol";
            }
            {
              label = " ";
              command = "hyprlock"; # Or whatever lock screen you use
            }
          ];
        };
      };
    };

    style = ''
      * {
        font-family: "JetBrainsMono Nerd Font", sans-serif;
        font-weight: bold;
      }

      /* The main Control Center panel */
      .control-center {
        background: rgba(26, 27, 38, 0.85);
        border: 2px solid rgba(122, 162, 247, 0.3);
        border-radius: 16px;
        color: #c0caf5;
      }

      /* Individual Notification Cards */
      .notification {
        background: rgba(36, 40, 59, 0.8);
        border-radius: 12px;
        margin: 6px 12px;
        padding: 0;
      }

      /* Widget Pods (Volume, Media, DND, and the new Grid) */
      .widget-dnd,
      .widget-mpris,
      .widget-volume,
      .widget-title,
      .widget-buttons-grid {
        background: rgba(36, 40, 59, 0.8);
        border-radius: 12px;
        margin: 8px 12px;
        padding: 10px;
      }

      /* Styling the grid buttons specifically to look like macOS toggles */
      .widget-buttons-grid > flowbox > flowboxchild > button {
        background: rgba(26, 27, 38, 0.8);
        border-radius: 12px;
        min-width: 70px;
        min-height: 70px;
        font-size: 28px;
        color: #c0caf5;
        margin: 4px;
        box-shadow: none;
        border: none;
      }

      .widget-buttons-grid > flowbox > flowboxchild > button:hover {
        background: rgba(122, 162, 247, 0.4);
        color: #ffffff;
        text-shadow: 0 0 5px rgba(192, 202, 245, 0.5);
      }

      /* Sliders (Volume) */
      scale trough {
        background: rgba(26, 27, 38, 0.8);
        border-radius: 8px;
        min-height: 12px;
      }

      scale highlight {
        background: #7aa2f7;
        border-radius: 8px;
      }

      /* Do Not Disturb Toggle */
      switch {
        background: rgba(26, 27, 38, 0.8);
        border-radius: 12px;
      }
      switch:checked {
        background: #7aa2f7;
      }

      /* Buttons */
      button {
        background: rgba(26, 27, 38, 0.5);
        border-radius: 8px;
        color: #c0caf5;
        border: none;
      }
      button:hover {
        background: rgba(122, 162, 247, 0.4);
        text-shadow: 0 0 5px rgba(192, 202, 245, 0.5);
      }
    '';
  };
}