# NixOS Ricing & Configuration Roadmap

## ✅ Completed

**System & Infrastructure**
- [x] fix sound not playing anymore when home screen (Fixed via mpvpaper background script)
- [x] make modules on waybar interactable
- [x] change the waybar so the workspaces is closer to the edge of the screen
- [x] less dramatic curve at the bottom so its a cleaner transition (Waybar flush with screen)
- [x] make waybar bigger (Adjusted font sizes and margins)
- [x] Setup weekly garbage cleanup and store optimization
- [x] add a MIT LICENSE
- [x] make a project README
- [x] add a auth module in main home directory to configure Git email/username (auth.nix)

**Visuals & Theming**
- [x] add a lock screen (Hyprlock configured with Tokyo Night theme)
- [x] add better looking zsh (Starship prompt, autosuggestions, syntax highlighting)
- [x] add a gui greeter (SDDM configured)
- [x] move interstellar.mp4 to /etc/nixos/wallpapers
- [x] frost blur so its easier to read text (Hyprland transparency rules)

**Functionality**
- [x] add a dedicated settings app to control everything (in progress via AGS)

**Wallpaper System**
- [x] Replace mpvpaper with hyprpaper for static wallpaper support
- [x] Add Stylix for automated theming (colors, fonts, cursor)
- [x] Create wallpaper toggle between hyprpaper and mpvpaper

## 🚧 In Progress

- [ ] AGS Control Center migration (from SwayNC)
- [ ] more interstellar references

## 📋 To-Do

**System & Security**
- [ ] setup better gitignore
- [ ] split up /etc/nixos/modules into multiple parts so can configure multiple themes later
- [ ] add a grub2 theme possibly or something that allows for nix rollbacks while still looking better than systemd

**Visuals & Theming**
- [ ] bold current window showing more
- [ ] configure Stylix to use custom color palette
- [ ] add fallback wallpapers for offline mode
- [ ] test wallpaper toggle keybinding (SUPER + W)

**Wallpaper System**
- [ ] Configure automatic wallpaper refresh (hourly/daily)
- [ ] Add more wallpaper sources beyond Unsplash
- [ ] Create local wallpaper collection for rotation

**Documentation**
- [ ] Add troubleshooting section to README
- [ ] Document the wallpaper toggle mechanism
- [ ] Create wallpapers folder with fallback images

## 🎯 Future Ideas

- Custom Hyprland animations
- More workspace layouts (tabbed, dendrite)
- System monitoring dashboard
- Media server integration
- Backup/restore scripts