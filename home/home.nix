{ config, pkgs, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  # Import your modules here!
  imports = [
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
    ./secrets.nix
  ];

  home.pointerCursor = {
    name = "Bibata-Modern-Classic";
    package = pkgs.bibata-cursors;
    size = 24;
    gtk.enable = true;
    x11.enable = true;
  };

  { config, pkgs, lib, ... }:

let
  secretsFile = ./secrets.nix;
  secrets = if builtins.pathExists secretsFile then import secretsFile else {
    gitUsername = "Default User";
    gitEmail = "default@example.com";
  };
in
{
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
}

  programs.home-manager.enable = true;
  home.stateVersion = "23.11";
}