import app from "ags/gtk4/app"
import ControlCenter from "./ControlCenter.js"

app.start({
    css: `
        * { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        window { background: transparent; }
        .tn-container {
            background: rgba(20, 20, 30, 0.95);
            border: 1px solid rgba(100, 100, 150, 0.3);
            border-radius: 20px;
            padding: 18px;
            min-width: 400px;
        }
        .text-header { font-weight: bold; font-size: 16px; color: #ffffff; }
        .text-bold { font-weight: bold; font-size: 14px; color: #ffffff; }
        .text-muted { font-size: 13px; color: #8888aa; }
        .tn-panel {
            background: rgba(40, 40, 60, 0.9);
            border-radius: 14px;
            padding: 14px;
        }
        button.tn-toggle {
            background: rgba(50, 50, 70, 0.9);
            border: 1px solid rgba(80, 80, 120, 0.4);
            border-radius: 14px;
            padding: 14px 12px;
        }
        button.tn-toggle:hover {
            background: rgba(70, 70, 100, 0.95);
        }
        button.tn-toggle.active {
            background: rgba(80, 130, 255, 0.3);
            border: 1px solid #6699ff;
        }
        .toggle-icon, .slider-icon { color: #ffffff; font-size: 22px; }
        button.tn-icon-btn { color: #cccccc; background: transparent; border: none; }
        button.tn-icon-btn:hover { color: #ffffff; }
        .play-btn { color: #6699ff; font-size: 26px; }
        .destructive { color: #ff6688; }
        .tn-profile-pic, .tn-media-art {
            background: rgba(60, 60, 80, 0.9);
            border-radius: 10px;
            min-width: 44px; min-height: 44px;
        }
        .icon-large { color: #6699ff; font-size: 24px; }
    `,
    requestHandler(request, res) {
        const win = app.get_window("control-center")
        if (win) {
            win.visible = !win.visible
            res(win.visible ? "Shown" : "Hidden")
        } else {
            res("No window")
        }
    },
    main() {
        const win = ControlCenter()
        app.add_window(win)
    }
})
