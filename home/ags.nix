{ config, pkgs, ... }:

{
  # Install AGS and required dependencies
  home.packages = with pkgs; [
    ags
    esbuild      # REQUIRED: Compiles TS/TSX into JS on the fly
    dart-sass    # Useful if we ever switch from CSS to SCSS
    wireplumber  # For controlling audio later
  ];

  # Symlink our custom folder to the system config path
  xdg.configFile."ags".source = ./ags;
}