{ pkgs, inputs, ... }:

{
  # 1. Import the official AGS Home Manager module
  imports = [ inputs.ags.homeManagerModules.default ];

  # 2. Configure AGS and inject the Astal libraries into its runtime
  programs.ags = {
    enable = true;
    extraPackages = with inputs.ags.packages.${pkgs.system}; [
      astal3
      apps
      hyprland
      network
      tray
      wireplumber
      # Add any others you use here!
    ];
  };

  # 3. Tell Home Manager to symlink your config safely
  xdg.configFile."ags".source = ./ags; 

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

    # Waybar Dependencies (Fixes the crash)
    playerctl # Needed for the media player module
    nerd-fonts.jetbrains-mono # Needed for the icons to render
    ffmpeg # You know what this is

    # AI stuff
    opencode

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