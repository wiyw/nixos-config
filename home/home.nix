{ inputs, config, pkgs, lib, secrets, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  imports = [
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
    ./auth.nix
    inputs.ags.homeManagerModules.default
  ];

  programs.ags = {
    enable = true;
    configDir = ./ags-config.js;
  };

  home.pointerCursor = {
    name = "Bibata-Modern-Classic";
    package = pkgs.bibata-cursors;
    size = 24;
    gtk.enable = true;
    x11.enable = true;
  };

  programs.home-manager.enable = true;
  home.stateVersion = "25.11";
}
