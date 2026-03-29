{ inputs, config, pkgs, lib, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  imports = [
    inputs.ags.homeManagerModules.default # <-- 1. IMPORT THE AGS MODULE
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
    ./auth.nix
  ];

  # <-- 2. CONFIGURE AGS WITH ASTAL3 -->
  programs.ags = {
    enable = true;
    configDir = ./ags; # <--- This tells AGS to automatically bundle your entire folder!
    
    extraPackages = with inputs.ags.packages.${pkgs.system}; [
      astal3
      io
      battery
      mpris
      network
      wireplumber 
    ];
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