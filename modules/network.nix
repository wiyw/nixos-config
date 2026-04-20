{ inputs, config, pkgs, lib, ... }:

{
  imports = [ inputs.sops-nix.homeManagerModules.sops ];

  sops = {
    age.keyFile = "/home/greyson/.config/sops/age/keys.txt";
    defaultSopsFile = ./secrets/secrets.yaml;
    secrets.warp_private_key = {};
  };

  home.packages = [ pkgs.wireguard-tools pkgs.wgcf ];
}
