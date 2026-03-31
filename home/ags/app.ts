import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js"

app.start({
    css: `
        /* Destroy default GTK4 Adwaita styling */
        window#control-center {
            background-color: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
        }

        .tn-container {
            background: rgba(26, 27, 38, 0.92) !important;
            border: 1px solid rgba(122, 162, 247, 0.15);
            border-radius: 20px;
            padding: 18px;
            min-width: 380px;
        }

        /* Nuke White Buttons */
        button, .button {
            background-image: none !important;
            box-shadow: none !important;
            text-shadow: none !important;
            -gtk-icon-shadow: none !important;
        }

        button.tn-toggle {
            background: rgba(48, 54, 75, 0.8) !important;
            border: 1px solid rgba(122, 162, 247, 0.15);
            border-radius: 14px;
            padding: 14px 12px;
            min-width: 100px;
            color: #c0caf5;
        }

        button.tn-toggle:hover {
            background: rgba(69, 77, 102, 0.9) !important;
        }

        button.tn-toggle.active, button.tn-toggle.expanded {
            background: rgba(122, 162, 247, 0.25) !important;
            border: 1px solid rgba(122, 162, 247, 0.5) !important;
        }

        .tn-panel {
            background: rgba(36, 40, 59, 0.7);
            border-radius: 14px;
            padding: 14px;
        }

        .text-header { font-weight: bold; font-size: 16px; color: #a9b1d6; }
        .text-bold { font-weight: bold; font-size: 14px; color: #c0caf5; }
        .text-muted { font-size: 13px; color: #565f89; }
        .toggle-icon { color: #7aa2f7; font-size: 22px; }
        
        scale trough { background: rgba(48, 54, 75, 0.8); border-radius: 3px; }
        scale highlight { background: #7aa2f7; border-radius: 3px; }
    `,
    requestHandler(request, res) {
        const win = app.get_window("control-center")
        if (win) {
            win.visible = !win.visible
            res(win.visible ? "Shown" : "Hidden")
        } else {
            res("Window not found")
        }
    },
    main() {
        // Just calling the function creates the window instance
        ControlCenterWindow()
    }
})