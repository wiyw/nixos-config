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
  virtualisation.docker.enable = true;

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

  # Sharing Files
  programs.kdeconnect.enable = true;
  services.upower.enable = true;
  services.power-profiles-daemon.enable=true;
  services.avahi.enable = true;
  services.avahi.nssmdns4 = true;
  services.tailscale.enable = true;

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

  programs.steam.enable = true;

  # Base System Packages
  environment.systemPackages = with pkgs; [
    bash
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
    umu-launcher
    kdePackages.powerdevil
    kdePackages.libplasma
    python3
  ];
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  # AppImage tools install
  programs.appimage = {
    enable = true;
    binfmt = true;
  };

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
    xorg.libXxf86vm
    gtk3
  ];


  # User Configuration
  users.users.greyson = {
    isNormalUser = true;
    description = "Greyson";
    extraGroups = [ "wheel" "networkmanager" "adbusers" "dialout" "libvirtd" "kvm" "docker" ];
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
