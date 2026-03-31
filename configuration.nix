{ config, lib, pkgs, ... }:

{
  imports = [ 
    ./hardware-configuration.nix 
  ];

  # Display Manager
  services.displayManager.sddm = {
    enable = true;
    wayland = {
      enable = true;
    };
    theme = "masa";
    extraPackages = with pkgs; [
      sddm-themes
    ];
  };

  # Base System Packages
  environment.systemPackages = with pkgs; [
    neovim 
    wget
    sddm-themes
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

  # User Configuration
  users.users.greyson = {
    isNormalUser = true;
    description = "Greyson";
    extraGroups = [ "wheel" "networkmanager" ];
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

  # Please dont blow up
  services.thermald.enable = true;

  # Bluetooth
  hardware.bluetooth.enable = true;
  hardware.bluetooth.powerOnBoot = true;

  # DO NOT CHANGE THIS
  system.stateVersion = "25.11"; 
}