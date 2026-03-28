{ pkgs, inputs, ... }:

{
  home.packages = with pkgs; [
    # Core Apps
    inputs.zen-browser.packages.${pkgs.system}.default
    kitty
    nautilus # A clean file manager
    
    # MacOS/Over-the-top Ricing Tools
    waybar
    swaynotificationcenter # MacOS style control center
    rofi # App launcher
    hyprpaper # Wallpaper daemon
    hyprlock # Lock screen
    hypridle # Idle daemon (triggers lock screen when away)
    wl-clipboard # Required for copy/paste in Wayland

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