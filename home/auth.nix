{ config, pkgs, lib, ... }:

let
  secrets = import ./secrets.nix;
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
