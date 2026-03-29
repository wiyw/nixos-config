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

  # AGS v2 Configuration Files
  home.file.".config/ags/app.ts".source = ./ags/app.ts;
  home.file.".config/ags/control-center.tsx".source = ./ags/control-center.tsx;
  home.file.".config/ags/style.css".source = ./ags/style.css;
  home.file.".config/ags/tsconfig.json".source = ./ags/tsconfig.json;
}
