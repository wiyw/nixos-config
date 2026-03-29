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
            // Quick Settings Pod
            new Gtk.Box({
                homogeneous: true,
                spacing: 14,
                children: [
                    new Gtk.Box({
                        orientation: Gtk.Orientation.VERTICAL,
                        spacing: 8,
                        css: "background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px;",
                        children: [
                            new Gtk.Box({
                                spacing: 8,
                                children: [
                                    new Gtk.Button({
                                        label: "󰤮",
                                        css: "background: rgba(60,60,70,0.8); border-radius: 12px; min-width: 50px; min-height: 50px;",
                                        onClicked: () => exec("nmcli radio wifi toggle")
                                    }),
                                    new Gtk.Button({
                                        label: "󰥭",
                                        css: "background: rgba(60,60,70,0.8); border-radius: 12px; min-width: 50px; min-height: 50px;",
                                        onClicked: () => exec("rfkill toggle bluetooth")
                                    }),
                                ]
                            }),
                            new Gtk.Box({
                                spacing: 8,
                                children: [
                                    new Gtk.Button({
                                        label: "󰝟",
                                        css: "background: rgba(60,60,70,0.8); border-radius: 12px; min-width: 50px; min-height: 50px;",
                                        onClicked: () => exec("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle")
                                    }),
                                    new Gtk.Button({
                                        label: "󰌾",
                                        css: "background: rgba(60,60,70,0.8); border-radius: 12px; min-width: 50px; min-height: 50px;",
                                        onClicked: () => exec("hyprlock")
                                    }),
                                ]
                            }),
                        ]
                    }),
                    // Media Pod
                    new Gtk.Box({
                        orientation: Gtk.Orientation.VERTICAL,
                        spacing: 6,
                        hexpand: true,
                        css: "background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px; min-width: 140px;",
                        children: [
                            new Gtk.Box({
                                halign: Gtk.Align.CENTER,
                                hexpand: true,
                                child: new Gtk.Label({
                                    label: "♪",
                                    css: "font-size: 32px;"
                                })
                            }),
                            new Gtk.Label({
                                label: "No Media Playing",
                                halign: Gtk.Align.CENTER,
                                css: "font-weight: bold;"
                            }),
                            new Gtk.Label({
                                label: "—",
                                halign: Gtk.Align.CENTER,
                                css: "color: #a0a0a0;"
                            }),
                            new Gtk.Box({
                                spacing: 8,
                                halign: Gtk.Align.CENTER,
                                homogeneous: true,
                                children: [
                                    new Gtk.Button({
                                        label: "󰒮",
                                        onClicked: () => exec("playerctl previous")
                                    }),
                                    new Gtk.Button({
                                        label: "▶",
                                        css: "background: #007AFF; border-radius: 50%;",
                                        onClicked: () => exec("playerctl play-pause")
                                    }),
                                    new Gtk.Button({
                                        label: "󰒭",
                                        onClicked: () => exec("playerctl next")
                                    }),
                                ]
                            }),
                        ]
                    }),
                ]
            }),
            // Sliders Pod
            new Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                spacing: 8,
                css: "background: rgba(40,40,50,0.8); border-radius: 16px; padding: 14px;",
                children: [
                    new Gtk.Box({
                        spacing: 12,
                        children: [
                            new Gtk.Label({ label: "🔊" }),
                            new Gtk.Label({ label: "Volume" })
                        ]
                    }),
                    new Gtk.Box({
                        spacing: 12,
                        children: [
                            new Gtk.Label({ label: "☀" }),
                            new Gtk.Label({ label: "Brightness" })
                        ]
                    }),
                ]
            }),
            // Notifications Pod
            new Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                spacing: 8,
                vexpand: true,
                css: "background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px;",
                children: [
                    new Gtk.Label({
                        label: "NOTIFICATIONS",
                        halign: Gtk.Align.START,
                        css: "color: #a0a0a0; font-weight: bold; font-size: 11px;"
                    }),
                    new Gtk.Label({
                        label: "No new notifications",
                        halign: Gtk.Align.CENTER,
                        css: "color: #808080;"
                    }),
                ]
            }),
        ]
    })
})

app.start({
    css: `
        * { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: white; }
        window { background: rgba(30,30,30,0.85); border-radius: 18px; border: 1px solid rgba(255,255,255,0.1); }
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
