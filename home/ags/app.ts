import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js"

// 1. Create a global variable so the window is NEVER garbage collected
let win: any = null;

app.start({
    css: "./style.css", // Make sure this points to your CSS

    // 2. We use this handler to toggle the window safely
    requestHandler(request, res) {
        if (request === "toggle-center") {
            if (win) {
                win.visible = !win.visible;
                res(win.visible ? "Shown" : "Hidden");
            } else {
                res("Error: Window exists but is not assigned");
            }
        } else {
            res("Unknown command");
        }
    },

    main() {
        // 3. Assign the window to our global variable
        win = ControlCenterWindow();
        
        // In GTK4, passing application={app} in the TSX usually registers it.
        // We do not need app.add_window(win) here if it was causing issues.
    }
})