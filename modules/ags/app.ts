import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.tsx" 

let controlWin: any = null;

app.start({
    css: "./style.css",

    requestHandler(request, res) {
        const command = String(request).trim();
        
        if (command === "toggle-center" || command === "control-center") {
            if (controlWin) {
                controlWin.visible = !controlWin.visible
                res(controlWin.visible ? "Shown" : "Hidden")
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
            const windows = ControlCenterWindow()
            controlWin = app.get_window("control-center")
            
            setTimeout(() => {
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
