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

    # Custom Rebuild & Backup Command
    (writeShellScriptBin "sysbuild" ''
      echo "🛠️ Starting system rebuild..."
      cd /home/greyson/nixos-config/
      git add .
      if ! git diff --cached --quiet; then
        echo "📦 Committing changes..."
        git commit -m "Auto-rebuild: $(date +'%Y-%m-%d %H:%M:%S')"
      else
        echo "🤷 No new changes to commit."
      fi
      echo "☁️ Pushing to GitHub..."
      git push
      echo "🚀 Building flake..."
      sudo nixos-rebuild switch --flake .#iusenixbtw
      echo "✅ All done!"
    '')
  ];
}
