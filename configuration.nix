{ config, lib, pkgs, ... }:

{
  imports = [ 
    ./hardware-configuration.nix 
  ];

  # QEMU ALWAYS W VIRT MACHINE
  virtualisation.libvirtd = {
    enable = true;
    allowedBridges = [ "virbr0" ];
    qemu = {
      package = pkgs.qemu_kvm;
      vhostUserPackages = [ pkgs.virtiofsd ];
    };
  };
  programs.virt-manager.enable = true;

  # Sudo for startup programs
  security.sudo.extraRules = [{
    users = [ "greyson" ];
    commands = [
      { 
        command = "/run/current-system/sw/bin/wg-quick"; 
        options = [ "NOPASSWD" ]; 
      }
    ];
  }];

  # Js lemme play MCBE
  hardware.graphics = {
    enable = true;
    enable32Bit = true;
  };

  # Display Manager
  services.displayManager.sddm = {
    enable = true;
    wayland = {
      enable = true;
    };
    theme = "sddm-astronaut-theme";
    extraPackages = with pkgs; [
      sddm-astronaut
      kdePackages.qtsvg
      kdePackages.qtmultimedia
      kdePackages.qtvirtualkeyboard
    ];
  };

  nixpkgs.config.allowUnfree = true;

  # SDDM Config file
  environment.etc."sddm.conf".text = ''
    [Theme]
    ThemeDir=/run/current-system/sw/share/sddm/themes
    Current=sddm-astronaut-theme
  '';

  # Base System Packages
  environment.systemPackages = with pkgs; [
    neovim 
    wget
    sddm-astronaut
    qemu
    virt-manager
    virt-viewer
    vulkan-loader
    vulkan-tools
    mesa
    freetype
    fontconfig
    libGL
    libX11
    libXcursor
    libXi
    libXrandr
    steam-run
    winetricks
    zenity
    cabextract
    psmisc
  ];
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  # Networking
  networking.hostName = "iusenixbtw"; 
  networking.networkmanager.enable = true;

  # Time & Locale
  time.timeZone = "America/Los_Angeles";

  # Nix Package Management & Garbage Collection
  nix = {
    settings = {
      experimental-features = [ "nix-command" "flakes" ];
      auto-optimise-store = true; # Saves massive disk space
    };
    gc = {
      automatic = true;
      dates = "weekly";
      options = "--delete-older-than 7d";
    };
  };

  # Enable nix-ld so pre-compiled binaries can run
  programs.nix-ld.enable = true;
  programs.nix-ld.libraries = with pkgs; [
    stdenv.cc.cc
    openssl
    curl
    glib
  # Add other common libraries if error logs mention missing .so files
  ];


  # User Configuration
  users.users.greyson = {
    isNormalUser = true;
    description = "Greyson";
    extraGroups = [ "wheel" "networkmanager" "adbusers" "dialout" "libvirtd" "kvm" ];
    shell = pkgs.zsh;
  };

  # System-level Programs & Shell
  programs.hyprland.enable = true;
  programs.zsh.enable = true;

  # Services
  services.openssh = {
    enable = true;
    settings = {
      PasswordAuthentication = true;
      PermitRootLogin = "no";
      AllowTcpForwarding = true;
    };
  };

  # WireGuard WARP VPN
  systemd.services.warp-vpn = {
    description = "Cloudflare WARP WireGuard VPN";
    wantedBy = [ "multi-user.target" ];
    after = [ "network-online.target" ];
    wants = [ "network-online.target" ];
    script = ''
      ${pkgs.wireguard-tools}/bin/wg-quick up warp
    '';
    stopScript = ''
      ${pkgs.wireguard-tools}/bin/wg-quick down warp
    '';
  };

  # Java
  programs.java = {
    enable = true;
    package = pkgs.jdk25;
  };

  services.udev.extraRules = ''
  # Arduino UNO Q in EDL mode (Qualcomm USB)
  SUBSYSTEM=="usb", ATTR{idVendor}=="05c6", ATTR{idProduct}=="9008", MODE="0666", TAG+="uaccess"
 
  # Arduino UNO Q standard ADB/Serial mode
  SUBSYSTEM=="usb", ATTR{idVendor}=="2341", ATTR{idProduct}=="0078", MODE="0660", GROUP="dialout", TAG+="uaccess"
  '';

  # Please dont blow up
  services.thermald.enable = true;

  # Touchpad Fix
  services.libinput.enable = true;

  # Bluetooth
  hardware.bluetooth.enable = true;
  hardware.bluetooth.powerOnBoot = true;

  # DO NOT CHANGE THIS
  system.stateVersion = "25.11"; 
}
