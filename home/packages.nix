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
    my-ags

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

let
  my-ags = inputs.ags.lib.bundle {
    inherit pkgs;
    src = ./ags; # <--- IMPORTANT: Point this to your actual AGS source directory!
    name = "my-ags";
    entry = "app.ts"; # The main entry point of your config
    gtk4 = false;     # Tells the bundler to strictly use gtk3

    # Explicitly list the Astal modules your TypeScript code imports
    extraPackages = [
      inputs.ags.packages.${pkgs.system}.astal3
      inputs.ags.packages.${pkgs.system}.apps
      inputs.ags.packages.${pkgs.system}.hyprland
      inputs.ags.packages.${pkgs.system}.network
      inputs.ags.packages.${pkgs.system}.tray
      inputs.ags.packages.${pkgs.system}.wireplumber
      # Add any others you use (like battery, mpris, etc.)
    ];
  };
in