{ pkgs, inputs, ... }:

{
  home.packages = with pkgs; [
    # Core Apps
    inputs.zen-browser.packages.${pkgs.system}.default
    kitty
    nautilus 

    # Ricing Tools
    waybar
    mpvpaper # Live video wallpaper engine!
    hyprlock
    hypridle
    wl-clipboard
    ffmpeg # You know what this is

    # Zsh customization
    starship
    fzf
    eza
    bat
    ripgrep
    fd
    zoxide
    delta

    # Waybar Dependencies (Fixes the crash)
    playerctl # Needed for the media player module
    nerd-fonts.jetbrains-mono # Needed for the icons to render

    # AI stuff
    opencode

    # Bluetooth
    blueman

    # Screenshot tools
    grim
    slurp
    brightnessctl
  ];

  programs.home-manager.enable = true;
}
