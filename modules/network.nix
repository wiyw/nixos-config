{ inputs, config, pkgs, ... }: {

  # Use the flake input directly
  imports = [ inputs.sops-nix.homeManagerModules.sops ];

  sops = {
    age.keyFile = "/home/greyson/.config/sops/age/keys.txt";
    defaultSopsFile = ./secrets/secrets.yaml;
    secrets.warp_private_key = {};
  };

  # 1. We define the file ONCE and use the path from SOPS
  home.file.".config/wireguard/warp.conf".text = ''
    [Interface]
    # This path is managed by sops-nix
    PrivateKey = $(cat ${config.sops.secrets.warp_private_key.path})
    Address = 172.16.0.2/32, 2606:4700:110:853b:f00d:78f0:f0ba:cb06/128
    DNS = 1.1.1.1
    MTU = 1280
    [Peer]
    PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
    Endpoint = ://cloudflareclient.com
    AllowedIPs = 0.0.0.0/0, ::/0
  '';

  home.packages = [ pkgs.wireguard-tools ];

  systemd.user.services.warp-vpn = {
    Unit = {
      Description = "Cloudflare WARP WireGuard Tunnel";
      After = [ "network.target" ];
    };
    Service = {
      Type = "oneshot";
      RemainAfterExit = true;
      # 2. Note: Executing wg-quick as a user usually requires 
      # specific sudo rules in your NixOS configuration.
      ExecStart = "${pkgs.sudo}/bin/sudo ${pkgs.wireguard-tools}/bin/wg-quick up %h/.config/wireguard/warp.conf";
      ExecStop = "${pkgs.sudo}/bin/sudo ${pkgs.wireguard-tools}/bin/wg-quick down %h/.config/wireguard/warp.conf";
    };
    Install = { WantedBy = [ "default.target" ]; };
  };
}
