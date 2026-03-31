{ config, pkgs, ... }:

{
  programs.rofi = {
    enable = true;
    package = pkgs.rofi;
    # Tell Home Manager to load our custom theme file!
    theme = "~/.config/rofi/interstellar.rasi";
  };

  # Write your exact Rasi theme to that custom file instead
  xdg.configFile."rofi/interstellar.rasi".text = ''
    configuration {
      modi: "drun,run";
      show-icons: true;
      display-drun: "Apps";
      display-run: "Run";
      font: "JetBrainsMono Nerd Font 12";
    }

    * {
      bg: #1a1b2699;
      bg-alt: #24283b;
      fg: #c0caf5;
      border-col: #7aa2f7;
      selected: #3d59a1;
      
      background-color: transparent;
      text-color: @fg;
      margin: 0;
      padding: 0;
    }

    window {
      width: 600px;
      background-color: @bg;
      border: 2px solid;
      border-color: @border-col;
      border-radius: 15px;
      padding: 20px;
    }

    inputbar {
      background-color: @bg-alt;
      padding: 15px;
      border-radius: 10px;
      children: [prompt, entry];
    }

    prompt {
      text-color: @border-col;
      padding: 0px 15px 0px 0px;
      font: "JetBrainsMono Nerd Font Bold 12";
    }

    entry {
      placeholder: "Search...";
      placeholder-color: #565f89;
    }

    listview {
      margin: 20px 0px 0px 0px;
      columns: 1;
      lines: 7;
      spacing: 10px;
    }

    element {
      padding: 12px;
      border-radius: 10px;
    }

    element selected {
      background-color: @selected;
      text-color: #ffffff;
    }

    element-icon {
      size: 24px;
      padding: 0px 10px 0px 0px;
    }
  '';
}