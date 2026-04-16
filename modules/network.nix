{ inputs, config, ... }: {

  imports = [ inputs.sops-nix.homeManagerModules.sops ];

  sops = {
    age.keyFile = "/home/greyson/.config/sops/age/keys.txt";
    defaultSopsFile = ./secrets/secrets.yaml;
    
    # This creates a file at /run/user/1000/secrets/warp_private_key
    secrets.warp_private_key = {};
  };

  # Update your warp.conf to point to the decrypted key file
  home.file.".config/wireguard/warp.conf".text = ''
    [Interface]
    PrivateKey = ${config.sops.secrets.warp_private_key.path}
    Address = 172.16.0.2/32, 2606:4700:110:853b:f00d:78f0:f0ba:cb06/128
    DNS = 1.1.1.1
    MTU = 1280
    [Peer]
    PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
    Endpoint = ://cloudflareclient.com
    AllowedIPs = 0.0.0.0/0, ::/0
  '';

  # Install the necessary tools
  home.packages = [ pkgs.wireguard-tools ];

  # Link your config file into your home directory
  # Note: Keep the actual file out of public git repos!
  home.file.".config/wireguard/warp.conf".source = ./path/to/your/warp.conf;

  # Create a systemd user service to start WARP automatically
  systemd.user.services.warp-vpn = {
    Unit = {
      Description = "Cloudflare WARP WireGuard Tunnel";
      After = [ "network.target" ];
    };
    Service = {
      Type = "oneshot";
      RemainAfterExit = true;
      ExecStart = "sudo /run/current-system/sw/bin/wg-quick up %h/.config/wireguard/warp.conf";
      ExecStop = "sudo /run/current-system/sw/bin/wg-quick down %h/.config/wireguard/warp.conf";
    };
    Install = {
      WantedBy = [ "default.target" ];
    };
  };
}
