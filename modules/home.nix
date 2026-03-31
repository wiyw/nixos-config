{ inputs, config, pkgs, lib, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  imports = [
    ./stylix.nix
    ./wallpaper-manager.nix
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
    ./auth.nix
    ./zsh.nix
    ./hyprlock.nix
    ./hypridle.nix
    ./ags.nix
  ];

  programs.home-manager.enable = true;
  home.stateVersion = "25.11";
}