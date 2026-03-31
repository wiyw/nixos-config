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
            
            setTimeout(() => {
                const controlWin = app.get_window("control-center")
                if (controlWin) {
                    controlWin.on_focus_out_event = () => {
                        controlWin.visible = false
                    }
                }
            }, 100)
            
            console.log("Control Center ready!")
        } catch (error) {
            console.error("FATAL ERROR:", error)
        }
    }
})
