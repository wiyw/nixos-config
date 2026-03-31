import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js" 

let win: any = null;

app.start({
    css: "./style.css",

    requestHandler(request, res) {
        const command = String(request).trim();
        
        if (command === "toggle-center" || command === "control-center") {
            if (win) {
                win.visible = !win.visible;
                res(win.visible ? "Shown" : "Hidden");
            } else {
                res("Error: Window is null. Check the terminal for the crash log!");
            }
        } else {
            res(`Unknown command: "${command}"`);
        }
    },

    main() {
        console.log("Starting AGS main()...");
        
        try {
            win = ControlCenterWindow();
            console.log("✅ Control Center window assigned successfully!");
        } catch (error) {
            console.error("❌ FATAL ERROR while building Control Center:", error);
        }
    }
})