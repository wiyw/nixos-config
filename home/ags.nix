{ config, pkgs, ... }:

{
  wayland.windowManager.hyprland.settings.exec-once = [
    "ags -t control-center"
  ];

  programs.ags = {
    enable = true;
    package = pkgs.ags;
    config = {
      windows = {
        control-center = {
          anchor = "top right";
          margin = "10 45 10 0";
          width = 380;
          height = 600;
          exclusivity = "auto";
          layer = "top";
          blur = true;
          transition = "slide_down";
        };
      };

      widgets = {
        mainWidget = {
          type = "box";
          class = "control-center";
          properties = {
            orientation = "vertical";
            spacing = 12;
            valign = "start";
            halign = "end";
          };
          children = [
            {
              type = "box";
              class = "quick-settings-pod";
              properties = {
                orientation = "horizontal";
                spacing = 8;
                homogeneous = true;
              };
              children = [
                {
                  type = "box";
                  class = "toggle-grid";
                  properties = {
                    orientation = "grid";
                    row_spacing = 8;
                    column_spacing = 8;
                    halign = "center";
                    valign = "center";
                  };
                  children = [
                    {
                      type = "button";
                      class = "toggle-btn";
                      properties = {
                        label = "󰤯";
                        on_clicked = "nm-connection-editor";
                        tooltip_text = "WiFi";
                      };
                    }
                    {
                      type = "button";
                      class = "toggle-btn";
                      properties = {
                        label = "󰂯";
                        on_clicked = "rfkill toggle bluetooth";
                        tooltip_text = "Bluetooth";
                      };
                    }
                    {
                      type = "button";
                      class = "toggle-btn";
                      properties = {
                        label = "󰝟";
                        on_clicked = "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle";
                        tooltip_text = "Mute";
                      };
                    }
                    {
                      type = "button";
                      class = "toggle-btn";
                      properties = {
                        label = "󰌾";
                        on_clicked = "hyprlock";
                        tooltip_text = "Lock";
                      };
                    }
                  ];
                }
                {
                  type = "box";
                  class = "media-pod";
                  properties = {
                    orientation = "vertical";
                    spacing = 8;
                    valign = "center";
                    halign = "center";
                    hexpand = true;
                  };
                  children = [
                    {
                      type = "box";
                      class = "media-album";
                      properties = {
                        valign = "center";
                        halign = "center";
                        vexpand = true;
                        hexpand = true;
                      };
                      children = [
                        {
                          type = "image";
                          class = "media-cover";
                          properties = {
                            pixel_size = 80;
                          };
                          bind = "mpv";
                        }
                      ];
                    }
                    {
                      type = "label";
                      class = "media-title";
                      properties = {
                        label = "No Media";
                        max_width_chars = 20;
                        truncate = "end";
                        ellipsize = "middle";
                        halign = "center";
                      };
                      bind = "mpv";
                    }
                    {
                      type = "label";
                      class = "media-artist";
                      properties = {
                        label = "—";
                        max_width_chars = 20;
                        truncate = "end";
                        ellipsize = "middle";
                        halign = "center";
                      };
                      bind = "mpv";
                    }
                    {
                      type = "box";
                      class = "media-controls";
                      properties = {
                        orientation = "horizontal";
                        spacing = 8;
                        halign = "center";
                        homogeneous = true;
                      };
                      children = [
                        {
                          type = "button";
                          class = "media-btn";
                          properties = {
                            label = "󰒮";
                            on_clicked = "playerctl previous";
                          };
                        }
                        {
                          type = "button";
                          class = "media-btn play-btn";
                          properties = {
                            label = "󰐊";
                            on_clicked = "playerctl play-pause";
                          };
                        }
                        {
                          type = "button";
                          class = "media-btn";
                          properties = {
                            label = "󰒭";
                            on_clicked = "playerctl next";
                          };
                        }
                      ];
                    }
                  ];
                }
              ];
            }
            {
              type = "box";
              class = "sliders-pod";
              properties = {
                orientation = "vertical";
                spacing = 12;
                valign = "start";
              };
              children = [
                {
                  type = "box";
                  class = "slider-row volume";
                  properties = {
                    orientation = "horizontal";
                    spacing = 12;
                    valign = "center";
                  };
                  children = [
                    {
                      type = "label";
                      properties = { label = "󰕿"; };
                    }
                    {
                      type = "scale";
                      class = "volume-slider";
                      properties = {
                        min = 0;
                        max = 100;
                        value = 50;
                        halign = "fill";
                        hexpand = true;
                      };
                      bind = "pulseaudio";
                    }
                  ];
                }
                {
                  type = "box";
                  class = "slider-row brightness";
                  properties = {
                    orientation = "horizontal";
                    spacing = 12;
                    valign = "center";
                  };
                  children = [
                    {
                      type = "label";
                      properties = { label = "󰛨"; };
                    }
                    {
                      type = "scale";
                      class = "brightness-slider";
                      properties = {
                        min = 0;
                        max = 100;
                        value = 100;
                        halign = "fill";
                        hexpand = true;
                      };
                      bind = "brightness";
                    }
                  ];
                }
              ];
            }
            {
              type = "box";
              class = "notifications-pod";
              properties = {
                orientation = "vertical";
                spacing = 8;
                valign = "start";
                vexpand = true;
              };
              children = [
                {
                  type = "label";
                  class = "notif-header";
                  properties = {
                    label = "Notifications";
                    halign = "start";
                  };
                }
                {
                  type = "scrollable";
                  class = "notifications-list";
                  properties = {
                    valign = "start";
                    hexpand = true;
                    vexpand = true;
                  };
                  children = [
                    {
                      type = "box";
                      class = "notifications";
                      properties = {
                        orientation = "vertical";
                        spacing = 8;
                      };
                      bind = "notifications";
                    }
                  ];
                }
              ];
            }
          ];
        };
      };

      style = ''
        * {
          font-family: "JetBrainsMono Nerd Font", sans-serif;
          font-size: 13px;
          color: #ffffff;
        }

        window#control-center {
          background-color: rgba(36, 40, 59, 0.7);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .control-center {
          padding: 16px;
        }

        .quick-settings-pod {
          background-color: rgba(30, 32, 48, 0.6);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px;
        }

        .toggle-grid {
          min-width: 140px;
        }

        .toggle-btn {
          min-width: 60px;
          min-height: 50px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: none;
          color: #565f89;
          font-size: 20px;
          transition: all 0.2s ease;
        }

        .toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .media-pod {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 12px;
          min-width: 140px;
        }

        .media-cover {
          border-radius: 12px;
          background-color: rgba(0, 0, 0, 0.3);
        }

        .media-title {
          font-weight: 600;
          font-size: 13px;
          color: #ffffff;
        }

        .media-artist {
          font-size: 11px;
          color: #a9b1d6;
        }

        .media-controls {
          margin-top: 8px;
        }

        .media-btn {
          background: none;
          border: none;
          color: #c0caf5;
          font-size: 18px;
          padding: 4px 12px;
        }

        .media-btn:hover {
          color: #ffffff;
        }

        .play-btn {
          font-size: 24px;
        }

        .sliders-pod {
          background-color: rgba(30, 32, 48, 0.6);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px;
        }

        .slider-row label {
          font-size: 16px;
          color: #c0caf5;
          min-width: 24px;
        }

        scale {
          min-height: 24px;
          min-width: 200px;
        }

        scale slider {
          min-width: 20px;
          min-height: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          border: none;
        }

        scale slider:hover {
          background-color: #7aa2f7;
        }

        scale trough {
          min-height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        scale highlight {
          background: linear-gradient(90deg, #7aa2f7, #bb9af7);
          border-radius: 4px;
        }

        .notifications-pod {
          background-color: rgba(30, 32, 48, 0.6);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px;
        }

        .notif-header {
          font-weight: 600;
          color: #a9b1d6;
          margin-bottom: 8px;
        }

        .notification {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px;
        }

        .notification:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      '';
    };
  };
}
