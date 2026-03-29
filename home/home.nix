{ config, pkgs, lib, ... }:

let
  secretsFile = "/etc/nixos/home/secrets.nix";
  secrets = if builtins.pathExists secretsFile then import secretsFile else {
    gitUsername = "Default User";
    gitEmail = "default@example.com";
  };
in
{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  imports = [
    ./packages.nix
    ./hyprland.nix
    ./waybar.nix
    ./rofi.nix
  ];

  home.pointerCursor = {
    name = "Bibata-Modern-Classic";
    package = pkgs.bibata-cursors;
    size = 24;
    gtk.enable = true;
    x11.enable = true;
  };

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
  home.stateVersion = "25.11";

  home.file.".config/ags/config.js".source = ./ags-config.js;
}
