{ inputs, config, pkgs, lib, ... }:

{
  imports = [ inputs.sops-nix.homeManagerModules.sops ];

  sops = {
    age.keyFile = "/home/greyson/.config/sops/age/keys.txt";
    defaultSopsFile = ./secrets/secrets.yaml;
    secrets.warp_private_key = {};
  };

  home.packages = [ pkgs.wireguard-tools pkgs.wgcf ];

  systemd.user.services.warp-vpn = {
    Unit = {
      Description = "Cloudflare WARP WireGuard Tunnel";
    };
    Service = {
      Type = "oneshot";
      RemainAfterExit = true;
      ExecStart = "${pkgs.wgcf}/bin/wgcf generate > %h/.config/wireguard/warp.conf 2>/dev/null || true; /run/current-system/sw/bin/wg-quick up %h/.config/wireguard/warp.conf";
      ExecStop = "/run/current-system/sw/bin/wg-quick down %h/.config/wireguard/warp.conf";
    };
    Install = { WantedBy = [ "default.target" ]; };
  };
}
