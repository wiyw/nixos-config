{ config, pkgs, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  # Import your modules here!
  imports = [
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
  ];

  programs.git = {
    enable = true;
    settings = {
      user = {
        name = "wiyw";
        email = "quantumdragon8@gmail.com";
      };
    };
    signing.format = null; # Silences the legacy format warning
  };

  programs.home-manager.enable = true;
  home.stateVersion = "23.11";
}