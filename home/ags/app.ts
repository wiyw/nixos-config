import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"

app.start({
    main() {
        const win = Gtk.Window.new()
        win.set_default_size(360, 520)
        win.set_visible(true)
        app.add_window(win)
    }
})
