{ config, pkgs, lib, inputs, ... }:

{
  imports = [ inputs.stylix.homeModules.stylix ];

  stylix = {
    enable = true;

    image = "${pkgs.stylix.images.tokyo-night}/share/stylix/images/tokyo-night.png";

    base16Scheme = "${pkgs.stylix.base16Scheme}/share/themes/tokyo-night.yaml";

    fonts = {
      sansSerif = {
        package = pkgs.jetbrains-mono;
        name = "JetBrains Mono";
      };
      serif = {
        package = pkgs.jetbrains-mono;
        name = "JetBrains Mono";
      };
      monospace = {
        package = pkgs.jetbrains-mono;
        name = "JetBrains Mono";
      };
    };

    cursor = {
      package = pkgs.bibata-cursors;
      name = "Bibata-Modern-Classic";
      size = 24;
    };

    polarity = "dark";
  };
}