import app from "ags/gtk4/app"
import ControlCenter from "./control-center"

app.start({
    css: `./style.css`,
    requestHandler(request, res) {
        if (request === "toggle-control-center") {
            const win = app.get_window("control-center")
            if (win) {
                win.visible = !win.visible
                res("Toggled window")
            } else {
                res("Window not found")
            }
        }
    },
    main() {
        ControlCenter()
    }
})
