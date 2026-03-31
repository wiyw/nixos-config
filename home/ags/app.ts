import app from "ags/gtk4/app"
import ControlCenter from "./ControlCenter.js"

app.start({
    css: `
        * { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        window { background: transparent; }
        .tn-container {
            background: rgba(26, 27, 38, 0.85);
            border: 1px solid rgba(65, 72, 104, 0.8);
            border-radius: 16px;
            padding: 16px;
            min-width: 380px;
        }
        .text-header { font-weight: bold; font-size: 15px; color: #c0caf5; }
        .text-bold { font-weight: bold; font-size: 13px; color: #c0caf5; }
        .text-muted { font-size: 12px; color: #565f89; }
        .tn-panel {
            background: rgba(36, 40, 59, 0.85);
            border-radius: 12px;
            padding: 15px;
        }
        button.tn-toggle {
            background: rgba(36, 40, 59, 0.85);
            border: 1px solid transparent;
            border-radius: 12px;
            padding: 16px 10px;
        }
        button.tn-toggle:hover {
            background: rgba(41, 46, 66, 0.95);
        }
        button.tn-toggle.active {
            background: rgba(122, 162, 247, 0.1);
            border: 1px solid #7aa2f7;
        }
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
        ControlCenter()
    }
})
