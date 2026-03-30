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
    ./zsh.nix
    ./hyprlock.nix
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
}