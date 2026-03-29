import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"

const win = new Gtk.Window({
    name: "control-center",
    anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT,
    marginTop: 10,
    marginEnd: 15,
    layer: Astal.Layer.TOP,
    application: app,
    visible: true,
    defaultWidth: 360,
    defaultHeight: 520
})

app.start({
    css: `window { background: rgba(30,30,30,0.9); border-radius: 20px; }`,
    requestHandler(request, res) {
        const w = app.get_window("control-center")
        if (w) {
            w.visible = !w.visible
            res("Toggled")
        } else {
            res("Window not found")
        }
    },
    main() {
        app.add_window(win)
    }
})
