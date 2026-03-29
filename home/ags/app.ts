import app from "ags/gtk4/app"
import ControlCenter from "./control-center"

app.start({
    css: `./style.css`,
    requestHandler(request, res) {
        const win = app.get_window("control-center")
        if (win) {
            win.visible = !win.visible
            res("Toggled")
        } else {
            res("Window not found")
        }
    },
    main() {
        const window = ControlCenter()
        app.add_window(window)
    }
})
