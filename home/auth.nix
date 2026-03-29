{ config, pkgs, lib, ... }:

let
  secretsFile = "/home/greyson/.config/nixos/secrets.json";
  secrets = if builtins.pathExists secretsFile then 
    builtins.fromJSON (builtins.readFile secretsFile)
  else {
    gitUsername = "placeholder";
    gitEmail = "placeholder@example.com";
  };
in
{
  programs.git = {
    enable = true;
    settings = {
      user = {
        name = secrets.gitUsername;
        email = secrets.gitEmail;
      };
      init.defaultBranch = "main";
      safe.directory = "/etc/nixos";
    };
  };
}
