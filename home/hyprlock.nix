{ config, pkgs, ... }:

{
  programs.hyprlock = {
    enable = true;
    
    settings = {
      general = {
        disable_loading_bar = true;
        hide_cursor = true;
        grace = 0;
        no_fade_in = false;
      };

      background = [
        {
          monitor = "";
          path = "screenshot";   # Takes a snapshot of your current desktop/video
          blur_passes = 3;       # Frosty blur
          blur_size = 8;
          color = "rgba(26, 27, 38, 0.8)"; # Tokyo Night background fallback
        }
      ];

      input-field = [
        {
          monitor = "";
          size = "300, 50";
          outline_thickness = 2;
          dots_size = 0.2;
          dots_spacing = 0.2;
          dots_center = true;
          outer_color = "rgba(122, 162, 247, 1)"; # Tokyo Night Blue (#7aa2f7)
          inner_color = "rgba(26, 27, 38, 0.5)";  # Semi-transparent Tokyo Night Dark
          font_color = "rgba(192, 202, 245, 1)";  # Tokyo Night Text (#c0caf5)
          fade_on_empty = false;
          placeholder_text = "<i>󰌾  Enter Password...</i>";
          hide_input = false;
          position = "0, -120";
          halign = "center";
          valign = "center";
        }
      ];

      label = [
        # 1. The Giant Clock
        {
          monitor = "";
          text = "cmd[update:1000] echo \"<b>$(date +\"%H:%M\")</b>\"";
          color = "rgba(192, 202, 245, 1)"; # #c0caf5
          font_size = 120;
          font_family = "JetBrainsMono Nerd Font";
          position = "0, 150";
          halign = "center";
          valign = "center";
        }
        
        # 2. The Date
        {
          monitor = "";
          text = "cmd[update:1000] echo \"$(date +\"%A, %B %d\")\"";
          color = "rgba(122, 162, 247, 1)"; # #7aa2f7
          font_size = 25;
          font_family = "JetBrainsMono Nerd Font";
          position = "0, 40";
          halign = "center";
          valign = "center";
        }
        
        # 3. The Greeting
        {
          monitor = "";
          text = "Welcome back, $USER";
          color = "rgba(192, 202, 245, 1)"; # #c0caf5
          font_size = 18;
          font_family = "JetBrainsMono Nerd Font";
          position = "0, -50";
          halign = "center";
          valign = "center";
        }
      ];
    };
  };
}