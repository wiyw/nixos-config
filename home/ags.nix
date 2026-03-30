{ config, pkgs, ... }:

{
  # Install AGS and required dependencies
  home.packages = with pkgs; [
    # Wrapped AGS with Astal modules injected so it can read system state
    (ags.override {
      extraPackages = [
        astal.network
        astal.wireplumber
        astal.bluetooth
      ];
    })
    esbuild        # REQUIRED: Compiles TS/TSX into JS on the fly
    dart-sass      # Useful if we ever switch from CSS to SCSS
    wireplumber    # For controlling audio later
    brightnessctl  # Required for the brightness slider script
  ];

  # Symlink our custom folder to the system config path
  xdg.configFile."ags".source = ./ags;
}