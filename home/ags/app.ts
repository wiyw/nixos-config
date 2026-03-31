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
            background: rgba(20, 20, 30, 0.85);
            border: 1px solid rgba(100, 100, 150, 0.2);
            border-radius: 20px;
            padding: 18px;
            min-width: 380px;
        }
        
        .text-header { font-weight: bold; font-size: 16px; color: #ffffff; }
        .text-bold { font-weight: bold; font-size: 14px; color: #ffffff; }
        .text-muted { font-size: 13px; color: #8888aa; }
        
        .tn-panel {
            background: rgba(40, 40, 60, 0.6);
            border-radius: 14px;
            padding: 14px;
        }
        
        button.tn-toggle {
            background: rgba(50, 50, 70, 0.7);
            border: 1px solid rgba(80, 80, 120, 0.3);
            border-radius: 14px;
            padding: 14px 12px;
            min-width: 100px;
        }
        
        button.tn-toggle:hover {
            background: rgba(70, 70, 100, 0.9);
        }
        
        button.tn-toggle.active {
            background: rgba(80, 130, 255, 0.35);
            border: 1px solid rgba(102, 153, 255, 0.6);
        }

        button.tn-toggle.expanded {
            background: rgba(80, 130, 255, 0.35);
            border: 1px solid rgba(102, 153, 255, 0.6);
        }
        
        .toggle-icon, .slider-icon { color: #ffffff; font-size: 22px; }
        
        button.tn-icon-btn { 
            color: #cccccc; 
            background: transparent; 
            border: none; 
            font-size: 18px; 
            padding: 8px;
            border-radius: 8px;
        }
        
        button.tn-icon-btn:hover { 
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff; 
        }
        
        button.tn-close-btn {
            color: #8888aa;
            background: transparent;
            border: none;
            font-size: 14px;
            padding: 4px 8px;
            border-radius: 4px;
            margin-left: auto;
        }

        button.tn-close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }
        
        button.tn-btn {
            background: rgba(80, 130, 255, 0.3);
            border: 1px solid rgba(102, 153, 255, 0.4);
            border-radius: 8px;
            padding: 10px 14px;
            color: #ffffff;
            font-size: 13px;
        }

        button.tn-btn:hover {
            background: rgba(80, 130, 255, 0.5);
        }
        
        .play-btn { color: #6699ff; font-size: 24px; }
        .destructive { color: #ff6688; }
        
        .tn-profile-pic, .tn-media-art {
            background: rgba(60, 60, 80, 0.8);
            border-radius: 10px;
            min-width: 48px; min-height: 48px;
        }
        
        .icon-large { color: #6699ff; font-size: 22px; }
        
        scale {
            min-height: 6px;
            color: #6699ff;
        }
        
        scale trough {
            background: rgba(80, 80, 120, 0.5);
            border-radius: 3px;
        }
        
        scale highlight {
            background: linear-gradient(90deg, #6699ff, #bb9af7);
            border-radius: 3px;
        }

        .tn-popup-container {
            animation: slideDown 0.2s ease;
        }

        .tn-popup {
            background: rgba(30, 30, 50, 0.95);
            border: 1px solid rgba(80, 80, 120, 0.3);
            border-radius: 14px;
            padding: 14px;
        }

        .tn-network-item, .tn-device-item {
            background: rgba(50, 50, 70, 0.5);
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
