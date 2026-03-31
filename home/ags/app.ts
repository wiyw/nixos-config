import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js" // Note the .js extension!

// 1. Create a global variable so the window is NEVER garbage collected
let win: any = null;

app.start({
    css: "./style.css", // Make sure this points to your CSS

    // 2. We use this handler to toggle the window safely
    requestHandler(request, res) {
        // .trim() removes invisible newlines or spaces from terminal commands
        const command = String(request).trim();
        
        if (command === "toggle-center" || command === "control-center") {
            if (win) {
                win.visible = !win.visible;
                res(win.visible ? "Shown" : "Hidden");
            } else {
                res("Error: Window not assigned to variable");
            }
        } else {
            res(`I received: "${command}", but I don't know what to do with it.`);
        }
    },

    main() {
        // 3. Assign the window to our global variable
        win = ControlCenterWindow();
    }
})