{ config, pkgs, ... }:

{
  home.username = "greyson";
  home.homeDirectory = "/home/greyson";

  home.packages = with pkgs; [
    kitty
    firefox

    # Custom Rebuild & Backup Command
    (writeShellScriptBin "sysbuild" ''
      echo "🛠️ Starting system rebuild..."
      cd /etc/nixos
      
      # Stage all changes
      git add .
      
      # Check if there are actually changes to commit
      if ! git diff --cached --quiet; then
        echo "📦 Committing changes..."
        git commit -m "Auto-rebuild: $(date +'%Y-%m-%d %H:%M:%S')"
      else
        echo "🤷 No new changes to commit."
      fi
      
      # Push to GitHub (Save to cloud for safety reasons [please dont blow up my drive again])
      echo "☁️ Pushing to GitHub..."
      git push
      
      # Run the rebuild
      echo "🚀 Building flake..."
      sudo nixos-rebuild switch --flake .#iusenixbtw
      
      echo "✅ All done! System rebuilt and backed up."
    '')

  ];

  wayland.windowManager.hyprland = {
    enable = true;
    settings = {
      "$mod" = "SUPER";
      bind = [
	"$mod, T, exec, kitty"
	"$mod, M, exit,"
      ];
    };
  };

  programs.git = {
    enable = true;
    userName = "wiyw"; # Replace with your actual username
    userEmail = "quantumdragon8@gmail.com"; # Replace with your GitHub email
  };

  programs.home-manager.enable = true;
  home.stateVersion = "23.11";
}
