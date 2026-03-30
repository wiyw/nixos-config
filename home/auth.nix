{ config, pkgs, lib, ... }:

{
  programs.git = {
    enable = true;
    
    # The new, updated syntax for Git settings
    settings = {
      user = {
        name = "wiyw";
        email = "quantumdragon8@gmail.com";
      };
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