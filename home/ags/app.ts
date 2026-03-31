import app from "ags/gtk4/app"
import ControlCenterWindow from "./ControlCenter.js"

app.start({
    css: "./style.css",
    requestHandler(request, res) {
        try {
            const win = app.get_window("control-center")
            if (win) {
                win.visible = !win.visible
                res(win.visible ? "Shown" : "Hidden")
            }
        } catch (err) {
            res("Window not registered yet.")
        }
    },
    main() {
        const win = ControlCenterWindow()
        app.add_window(win) // Critical: registers the window so requestHandler doesn't crash
    }
})