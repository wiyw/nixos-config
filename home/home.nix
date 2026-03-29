{ inputs, config, pkgs, lib, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  imports = [
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
    ./auth.nix
  ];

  home.pointerCursor = {
    name = "Bibata-Modern-Classic";
    package = pkgs.bibata-cursors;
    size = 24;
    gtk.enable = true;
    x11.enable = true;
  };

  programs.home-manager.enable = true;
  home.stateVersion = "25.11";

  # Notice the .tsx extensions!
  home.file.".config/ags/app.tsx".source = ./ags/ags-config.tsx;
  home.file.".config/ags/style.css".source = ./ags/ags-style.css;
  home.file.".config/ags/tsconfig.json".source = ./ags/tsconfig.json;
}
