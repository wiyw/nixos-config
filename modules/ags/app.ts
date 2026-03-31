import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js" 

let win: any = null;

app.start({
    css: "./style.css",

    requestHandler(request, res) {
        const command = String(request).trim();
        
        if (command === "toggle-center" || command === "control-center") {
            if (win) {
                win.visible = !win.visible
                res(win.visible ? "Shown" : "Hidden")
            } else {
                res("Error: Window is null")
            }
        } else {
            res(`Unknown command: "${command}"`)
        }
    },

    main() {
        console.log("Starting AGS main()...")
        
        try {
            win = ControlCenterWindow()
            
            app.on_window_created((window: any) => {
                window.on_focus_out_event = () => {
                    if (window.name === "control-center" && window.visible) {
                        window.visible = false
                    }
                }
            })
            
            console.log("Control Center ready!")
        } catch (error) {
            console.error("FATAL ERROR:", error)
        }
    }
})
