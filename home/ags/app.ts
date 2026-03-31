import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js"

app.start({
    css: `
        * { font-family: "JetBrains Mono Nerd Font", -apple-system, sans-serif; }
        
        window {
            background: transparent;
            border-radius: 20px;
        }
        
        .tn-container {
            background: rgba(26, 27, 38, 0.92);
            border: 1px solid rgba(122, 162, 247, 0.15);
            border-radius: 20px;
            padding: 18px;
            min-width: 380px;
        }
        
        .text-header { font-weight: bold; font-size: 16px; color: #a9b1d6; }
        .text-bold { font-weight: bold; font-size: 14px; color: #c0caf5; }
        .text-muted { font-size: 13px; color: #565f89; }
        
        .tn-panel {
            background: rgba(36, 40, 59, 0.7);
            border-radius: 14px;
            padding: 14px;
        }
        
        button.tn-toggle {
            background: rgba(48, 54, 75, 0.8);
            border: 1px solid rgba(122, 162, 247, 0.15);
            border-radius: 14px;
            padding: 14px 12px;
            min-width: 100px;
        }
        
        button.tn-toggle:hover {
            background: rgba(69, 77, 102, 0.9);
        }
        
        button.tn-toggle.active {
            background: rgba(122, 162, 247, 0.25);
            border: 1px solid rgba(122, 162, 247, 0.5);
        }

        button.tn-toggle.expanded {
            background: rgba(122, 162, 247, 0.25);
            border: 1px solid rgba(122, 162, 247, 0.5);
        }
        
        .toggle-icon, .slider-icon { color: #7aa2f7; font-size: 22px; }
        
        button.tn-icon-btn { 
            color: #9aa5ce; 
            background: transparent; 
            border: none; 
            font-size: 18px; 
            padding: 8px;
            border-radius: 8px;
        }
        
        button.tn-icon-btn:hover { 
            background: rgba(122, 162, 247, 0.15);
            color: #c0caf5; 
        }
        
        button.tn-close-btn {
            color: #565f89;
            background: transparent;
            border: none;
            font-size: 14px;
            padding: 4px 8px;
            border-radius: 4px;
        }

        button.tn-close-btn:hover {
            background: rgba(122, 162, 247, 0.15);
            color: #c0caf5;
        }
        
        button.tn-btn {
            background: rgba(122, 162, 247, 0.2);
            border: 1px solid rgba(122, 162, 247, 0.35);
            border-radius: 8px;
            padding: 10px 14px;
            color: #c0caf5;
            font-size: 13px;
        }

        button.tn-btn:hover {
            background: rgba(122, 162, 247, 0.35);
        }
        
        .play-btn { color: #7aa2f7; font-size: 24px; }
        .destructive { color: #f7768e; }
        
        .tn-profile-pic, .tn-media-art {
            background: rgba(48, 54, 75, 0.9);
            border-radius: 10px;
            min-width: 48px; min-height: 48px;
        }
        
        .icon-large { color: #7dcfff; font-size: 22px; }
        
        scale {
            min-height: 6px;
            color: #7aa2f7;
        }
        
        scale trough {
            background: rgba(48, 54, 75, 0.8);
            border-radius: 3px;
        }
        
        scale highlight {
            background: linear-gradient(90deg, #7aa2f7, #bb9af7);
            border-radius: 3px;
        }

        .tn-popup-container {
            animation: slideDown 0.2s ease;
        }

        .tn-popup {
            background: rgba(26, 27, 38, 0.98);
            border: 1px solid rgba(122, 162, 247, 0.2);
            border-radius: 14px;
            padding: 14px;
        }

        .tn-network-item, .tn-device-item {
            background: rgba(48, 54, 75, 0.6);
            border-radius: 8px;
            padding: 10px;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `,
    requestHandler(request, res) {
        const wins = app.get_windows()
        const win = wins.find(w => w.name === "control-center")
        if (win) {
            win.visible = !win.visible
            res(win.visible ? "Shown" : "Hidden")
        } else {
            res("No window")
        }
    },
    main() {
        const win = ControlCenterWindow()
        app.add_window(win)
    }
})
