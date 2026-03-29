{ config, pkgs, lib, secrets, ... }:

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
