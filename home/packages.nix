{ pkgs, inputs, ... }:

{
  home.packages = with pkgs; [
    # Core Apps
    inputs.zen-browser.packages.${pkgs.system}.default
    kitty
    nautilus 
    
    # Ricing Tools
    waybar
    swaynotificationcenter
    rofi # Renamed as requested
    mpvpaper # Live video wallpaper engine!
    hyprlock
    hypridle
    wl-clipboard 

    # Waybar Dependencies (Fixes the crash)
    playerctl # Needed for the media player module
    nerd-fonts.jetbrains-mono # Needed for the icons to render

    # Custom Rebuild & Backup Command
    (writeShellScriptBin "sysbuild" ''
      echo "🛠️ Starting system rebuild..."
      cd /etc/nixos
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