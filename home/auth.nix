{ config, pkgs, lib, ... }:

{
  programs.git = {
    enable = true;
    userName = "wiyw";
    userEmail = "quantumdragon8@gmail.com";
    
    extraConfig = {
      init.defaultBranch = "main";
      safe.directory = "/etc/nixos";
      
      # The Tokyo Night Delta Config
      core.pager = "delta";
      interactive.diffFilter = "delta --color-only";
      delta = {
        navigate = true;
        light = false;
        side-by-side = true;
        line-numbers = true;
      };
      merge.conflictstyle = "diff3";
    };
  };
}