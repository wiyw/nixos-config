import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js"

// 1. Create a global variable so the window is NEVER garbage collected
let win: any = null;

app.start({
    css: "./style.css", // Make sure this points to your CSS

    // 2. We use this handler to toggle the window safely
    requestHandler(request, res) {
        // This will print to the terminal so we can see what command it actually received
        console.log(`Received request: "${request}"`);

        // If it asks for toggle-center, or just "control-center", toggle it.
        if (request === "toggle-center" || request === "control-center") {
            if (win) {
                win.visible = !win.visible;
                res(win.visible ? "Shown" : "Hidden");
            } else {
                res("Error: Window not assigned to variable");
            }
        } else {
            res(`I received: ${request}, but I don't know what to do with it.`);
        }
    },

    main() {
        // 3. Assign the window to our global variable
        win = ControlCenterWindow();
        
        // In GTK4, passing application={app} in the TSX usually registers it.
        // We do not need app.add_window(win) here if it was causing issues.
    }
})