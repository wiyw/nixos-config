import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js"

app.start({
    css: `
        /* In GTK4, use specific ID selectors (#) instead of !important */
        window#control-center {
            background-color: transparent;
            background-image: none;
            box-shadow: none;
        }

        .tn-container {
            background-color: rgba(26, 27, 38, 0.92);
            border: 1px solid rgba(122, 162, 247, 0.15);
            border-radius: 20px;
            padding: 18px;
            min-width: 380px;
        }

        /* Target the button gadget directly to override Adwaita */
        window#control-center button {
            background-image: none;
            box-shadow: none;
            text-shadow: none;
            -gtk-icon-shadow: none;
            background-color: rgba(48, 54, 75, 0.8);
            border: 1px solid rgba(122, 162, 247, 0.15);
            border-radius: 14px;
            padding: 14px 12px;
            color: #c0caf5;
        }

        window#control-center button:hover {
            background-color: rgba(69, 77, 102, 0.9);
        }

        /* Specific classes for active states */
        window#control-center button.active, 
        window#control-center button.expanded {
            background-color: rgba(122, 162, 247, 0.25);
            border: 1px solid rgba(122, 162, 247, 0.5);
        }

        .tn-panel {
            background-color: rgba(36, 40, 59, 0.7);
            border-radius: 14px;
            padding: 14px;
        }

        .text-header { font-weight: bold; font-size: 16px; color: #a9b1d6; }
        .text-bold { font-weight: bold; font-size: 14px; color: #c0caf5; }
        .text-muted { font-size: 13px; color: #565f89; }
        .toggle-icon { color: #7aa2f7; font-size: 22px; }
        
        scale trough { background-color: rgba(48, 54, 75, 0.8); border-radius: 3px; }
        scale highlight { background-color: #7aa2f7; border-radius: 3px; }
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
        ControlCenterWindow()
    }
})