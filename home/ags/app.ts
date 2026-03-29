import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"

const win = new Gtk.Window()
win.set_name("control-center")
win.set_anchor(Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT)
win.set_margin_top(10)
win.set_margin_end(15)
win.set_layer(Astal.Layer.TOP)
win.set_application(app)
win.set_visible(true)
win.set_default_size(360, 520)

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
