{ config, pkgs, lib, ... }:

let
  # Handle Git secrets safely
  secretsFile = "/etc/nixos/home/secrets.nix";
  secrets = if builtins.pathExists secretsFile then import secretsFile else {
    gitUsername = "Default User";
    gitEmail = "default@example.com";
  };
in
{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  # Import your modules
  imports = [
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
  ];

  # Cursor Config
  home.pointerCursor = {
    name = "Bibata-Modern-Classic";
    package = pkgs.bibata-cursors;
    size = 24;
    gtk.enable = true;
    x11.enable = true;
  };

  # Git Configuration (Merged here for simplicity)
  programs.git = {
    enable = true;
    userName = secrets.gitUsername;
    userEmail = secrets.gitEmail;
    signing.format = null;
    extraConfig = {
      init.defaultBranch = "main";
      safe.directory = "/etc/nixos";
    };
  };

  programs.home-manager.enable = true;
  home.stateVersion = "25.11"; # Updated to match your system stateVersion

  home.file.".config/ags/config.js" = {
    text = ''
      import { Widget, Astal, App, Gdk, GLib } from 'ags';

      App({
        style: `
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

          .toggle-btn {
            min-width: 60px;
            min-height: 50px;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            border: none;
            color: #565f89;
            font-size: 20px;
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

          .media-btn {
            background: none;
            border: none;
            color: #c0caf5;
            font-size: 18px;
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

          scale trough {
            min-height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
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
        `,
        windows: [
          Widget.Window({
            name: 'control-center',
            anchor: 'top right',
            margin: '10 45 10 0',
            width: 380,
            height: 600,
            layer: 'top',
            exclusivity: 'auto',
            visible: false,
            child: Widget.Box({
              class: 'control-center',
              vertical: true,
              spacing: 12,
              children: [
                // Quick Settings Row
                Widget.Box({
                  class: 'quick-settings-pod',
                  children: [
                    // Toggle Grid
                    Widget.Box({
                      class: 'toggle-grid',
                      vertical: true,
                      spacing: 8,
                      hexpand: true,
                      vpack: 'center',
                      children: [
                        Widget.Box({
                          spacing: 8,
                          children: [
                            Widget.Button({
                              class: 'toggle-btn',
                              onClicked: () => {
                                // WiFi toggle - uses nmcli
                                GLib.spawn_command_line_async('nmcli radio wifi toggle');
                              },
                              child: Widget.Label({ label: '󰤯' }),
                            }),
                            Widget.Button({
                              class: 'toggle-btn',
                              onClicked: () => {
                                GLib.spawn_command_line_async('rfkill toggle bluetooth');
                              },
                              child: Widget.Label({ label: '󰂯' }),
                            }),
                          ],
                        }),
                        Widget.Box({
                          spacing: 8,
                          children: [
                            Widget.Button({
                              class: 'toggle-btn',
                              onClicked: () => {
                                GLib.spawn_command_line_async('wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle');
                              },
                              child: Widget.Label({ label: '󰝟' }),
                            }),
                            Widget.Button({
                              class: 'toggle-btn',
                              onClicked: () => {
                                GLib.spawn_command_line_async('hyprlock');
                              },
                              child: Widget.Label({ label: '󰌾' }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    // Media Pod
                    Widget.Box({
                      class: 'media-pod',
                      vertical: true,
                      spacing: 8,
                      hexpand: true,
                      vpack: 'center',
                      children: [
                        Widget.Box({
                          vpack: 'center',
                          hpack: 'center',
                          hexpand: true,
                          vexpand: true,
                          child: Widget.Box({
                            class: 'media-album',
                            child: Widget.Icon({
                              class: 'media-cover',
                              icon: 'audio-x-generic',
                              size: 80,
                              binds: [['icon', App.getWindow('control-center'), 'icon', player => {
                                const mpris = Astal.Mpris.get_default();
                                return mpris?.player?.coverUrl || 'audio-x-generic';
                              }]],
                            }),
                          }),
                        }),
                        Widget.Label({
                          class: 'media-title',
                          label: 'No Media',
                          maxWidthChars: 20,
                          truncate: 'end',
                          ellipsize: 'middle',
                          halign: 'center',
                          binds: [['label', App.getWindow('control-center'), 'label', player => {
                            const mpris = Astal.Mpris.get_default();
                            return mpris?.player?.title || 'No Media';
                          }]],
                        }),
                        Widget.Label({
                          class: 'media-artist',
                          label: '—',
                          maxWidthChars: 20,
                          truncate: 'end',
                          ellipsize: 'middle',
                          halign: 'center',
                          binds: [['label', App.getWindow('control-center'), 'label', player => {
                            const mpris = Astal.Mpris.get_default();
                            return mpris?.player?.artist || '—';
                          }]],
                        }),
                        Widget.Box({
                          class: 'media-controls',
                          spacing: 8,
                          halign: 'center',
                          homogeneous: true,
                          children: [
                            Widget.Button({
                              class: 'media-btn',
                              onClicked: () => {
                                GLib.spawn_command_line_async('playerctl previous');
                              },
                              child: Widget.Label({ label: '󰒮' }),
                            }),
                            Widget.Button({
                              class: 'media-btn play-btn',
                              onClicked: () => {
                                GLib.spawn_command_line_async('playerctl play-pause');
                              },
                              child: Widget.Label({ label: '󰐊' }),
                            }),
                            Widget.Button({
                              class: 'media-btn',
                              onClicked: () => {
                                GLib.spawn_command_line_async('playerctl next');
                              },
                              child: Widget.Label({ label: '󰒭' }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Sliders
                Widget.Box({
                  class: 'sliders-pod',
                  vertical: true,
                  spacing: 12,
                  children: [
                    Widget.Box({
                      class: 'slider-row volume',
                      spacing: 12,
                      valign: 'center',
                      children: [
                        Widget.Label({ label: '󰕿' }),
                        Widget.Scale({
                          min: 0,
                          max: 100,
                          value: 50,
                          halign: 'fill',
                          hexpand: true,
                          onChanged: (self) => {
                            GLib.spawn_command_line_async(`wpctl set-volume @DEFAULT_AUDIO_SINK@ ${self.value}%`);
                          },
                        }),
                      ],
                    }),
                    Widget.Box({
                      class: 'slider-row brightness',
                      spacing: 12,
                      valign: 'center',
                      children: [
                        Widget.Label({ label: '󰛨' }),
                        Widget.Scale({
                          min: 0,
                          max: 100,
                          value: 100,
                          halign: 'fill',
                          hexpand: true,
                          onChanged: (self) => {
                            GLib.spawn_command_line_async(`brightnessctl set ${self.value}%`);
                          },
                        }),
                      ],
                    }),
                  ],
                }),
                // Notifications
                Widget.Box({
                  class: 'notifications-pod',
                  vertical: true,
                  spacing: 8,
                  vexpand: true,
                  children: [
                    Widget.Label({
                      class: 'notif-header',
                      label: 'Notifications',
                      halign: 'start',
                    }),
                    Widget.Scrollable({
                      valign: 'start',
                      hexpand: true,
                      vexpand: true,
                      child: Widget.Box({
                        class: 'notifications',
                        vertical: true,
                        spacing: 8,
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
    '';
  };
}