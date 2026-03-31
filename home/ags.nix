{ inputs, config, pkgs, ... }:

{
  home.packages = with pkgs; [
    inputs.ags.packages.${pkgs.system}.default
    esbuild
    dart-sass
    wireplumber
    brightnessctl
  ];

  xdg.configFile."ags".source = ./ags;
}
