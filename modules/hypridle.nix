{ config, pkgs, ... }:

let
  # This custom script intercepts hypridle's commands.
  # It checks your hardware sensors to see if AC power is connected.
  batteryIdle = pkgs.writeShellScriptBin "battery-idle" ''
    #!/usr/bin/env bash
    
    # If ANY power supply sensor reports "1" for online, we are plugged into the wall.
    if grep -q 1 /sys/class/power_supply/*/online 2>/dev/null; then
      echo "Plugged in. Ignoring idle command."
      exit 0
    else
      # We are on battery power! Execute the command passed from hypridle.
      eval "$@"
    fi
  '';
in
{
  services.hypridle = {
    enable = true;
    
    settings = {
      general = {
        lock_cmd = "pidof hyprlock || hyprlock";
        before_sleep_cmd = "loginctl lock-session"; # Ensure it locks before suspending
        after_sleep_cmd = "hyprctl dispatch dpms on"; # Ensure screens wake up
      };

      listener = [
        # STAGE 1: Lock the screen after 5 minutes (300 seconds) on battery
        {
          timeout = 300;
          on-timeout = "${batteryIdle}/bin/battery-idle 'loginctl lock-session'";
        }
        
        # STAGE 2: Turn off the displays after 5.5 minutes (330 seconds) on battery
        {
          timeout = 330;
          on-timeout = "${batteryIdle}/bin/battery-idle 'hyprctl dispatch dpms off'";
          on-resume = "hyprctl dispatch dpms on"; # Always turn screens back on when you move the mouse
        }

        # STAGE 3: Suspend the laptop entirely after 15 minutes (900 seconds) on battery
        {
          timeout = 900;
          on-timeout = "${batteryIdle}/bin/battery-idle 'systemctl suspend'";
        }
      ];
    };
  };
}