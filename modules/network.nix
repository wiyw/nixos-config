{ inputs, config, pkgs, lib, ... }:

{
  imports = [ inputs.sops-nix.homeManagerModules.sops ];

  sops = {
    age.keyFile = "/home/greyson/.config/sops/age/keys.txt";
    defaultSopsFile = ./secrets/secrets.yaml;
    secrets.warp_private_key = {};
  };

  home.file.".config/wireguard/warp.conf".text = ''
    [Interface]
    PrivateKey = $(cat ${config.sops.secrets.warp_private_key.path})
    Address = 172.16.0.2/32, 2606:4700:110:853b:f00d:78f0:f0ba:cb06/128
    DNS = 1.1.1.1
    MTU = 1280
    [Peer]
    PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
    Endpoint = ://cloudflareclient.com
    AllowedIPs = 0.0.0.0/0, ::/0
  '';

  home.packages = [ pkgs.wireguard-tools pkgs.wgcf ];

  systemd.user.services.warp-vpn = {
    Unit = {
      Description = "Cloudflare WARP WireGuard Tunnel";
      After = [ "network-online.target" ];
      Wants = [ "network-online.target" ];
    };
    Service = {
      Type = "oneshot";
      RemainAfterExit = true;
      ExecStart = "${pkgs.wireguard-tools}/bin/wg-quick up %h/.config/wireguard/warp.conf";
      ExecStop = "${pkgs.wireguard-tools}/bin/wg-quick down %h/.config/wireguard/warp.conf";
    };
    Install = { WantedBy = [ "default.target" ]; };
  };
}
