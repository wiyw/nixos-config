import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"

const ControlCenter = new Gtk.Window({
    name: "control-center",
    anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT,
    marginEnd: 15,
    marginTop: 10,
    layer: Astal.Layer.TOP,
    application: app,
    visible: true,
    defaultWidth: 360,
    defaultHeight: 520,
    child: new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 14,
        margin: 14,
        children: [
            new Gtk.Box({
                homogeneous: true,
                spacing: 14,
                children: [
                    new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 8 }),
                    new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 6, hexpand: true }),
                ]
            }),
            new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 8 }),
            new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 8, vexpand: true }),
        ]
    })
})

app.start({
    css: `
        * { font-family: -apple-system, sans-serif; color: white; }
        window { background: rgba(30,30,30,0.9); border-radius: 20px; }
    `,
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
        app.add_window(ControlCenter)
    }
})
