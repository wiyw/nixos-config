import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"

function QuickButton({ icon, command }) {
    return Gtk.Button({
        className: "toggle-btn",
        onClicked: () => exec(command),
        child: Gtk.Label({ label: icon })
    })
}

export default function ControlCenter() {
    const mainBox = Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 14,
        className: "control-center",
        marginTop: 10,
        marginEnd: 15,
        children: [
            // Quick Settings Row
            Gtk.Box({
                spacing: 14,
                children: [
                    // Quick Settings Pod
                    Gtk.Box({
                        orientation: Gtk.Orientation.VERTICAL,
                        spacing: 8,
                        className: "quick-settings-pod",
                        css: "padding: 12px; border-radius: 16px;",
                        children: [
                            Gtk.Box({
                                spacing: 8,
                                children: [
                                    QuickButton({ icon: "󰤮", command: "nmcli radio wifi toggle" }),
                                    QuickButton({ icon: "󰥭", command: "rfkill toggle bluetooth" }),
                                ]
                            }),
                            Gtk.Box({
                                spacing: 8,
                                children: [
                                    QuickButton({ icon: "󰝟", command: "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle" }),
                                    QuickButton({ icon: "󰌾", command: "hyprlock" }),
                                ]
                            }),
                        ]
                    }),
                    // Media Pod
                    Gtk.Box({
                        orientation: Gtk.Orientation.VERTICAL,
                        spacing: 6,
                        className: "media-pod",
                        hexpand: true,
                        css: "padding: 12px; border-radius: 16px; min-width: 140px;",
                        children: [
                            Gtk.Box({
                                halign: Gtk.Align.CENTER,
                                hexpand: true,
                                child: Gtk.Box({
                                    className: "media-cover",
                                    css: "min-width: 80px; min-height: 80px; border-radius: 12px;",
                                    child: Gtk.Label({ label: "♪", css: "font-size: 32px;" })
                                })
                            }),
                            Gtk.Label({
                                label: "No Media Playing",
                                className: "media-title",
                                halign: Gtk.Align.CENTER
                            }),
                            Gtk.Label({
                                label: "—",
                                className: "media-artist",
                                halign: Gtk.Align.CENTER
                            }),
                            Gtk.Box({
                                spacing: 8,
                                halign: Gtk.Align.CENTER,
                                homogeneous: true,
                                children: [
                                    Gtk.Button({
                                        className: "media-btn",
                                        onClicked: () => exec("playerctl previous"),
                                        child: Gtk.Label({ label: "󰒮" })
                                    }),
                                    Gtk.Button({
                                        className: "media-btn play-btn",
                                        onClicked: () => exec("playerctl play-pause"),
                                        child: Gtk.Label({ label: "▶" })
                                    }),
                                    Gtk.Button({
                                        className: "media-btn",
                                        onClicked: () => exec("playerctl next"),
                                        child: Gtk.Label({ label: "󰒭" })
                                    }),
                                ]
                            }),
                        ]
                    }),
                ]
            }),
            // Sliders Pod
            Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                spacing: 8,
                className: "sliders-pod",
                css: "padding: 14px; border-radius: 16px;",
                children: [
                    Gtk.Box({
                        spacing: 12,
                        children: [
                            Gtk.Label({ label: "🔊" }),
                            Gtk.Label({ label: "Volume" })
                        ]
                    }),
                    Gtk.Box({
                        spacing: 12,
                        children: [
                            Gtk.Label({ label: "☀" }),
                            Gtk.Label({ label: "Brightness" })
                        ]
                    }),
                ]
            }),
            // Notifications Pod
            Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                spacing: 8,
                vexpand: true,
                className: "notifications-pod",
                css: "padding: 12px; border-radius: 16px;",
                children: [
                    Gtk.Label({
                        label: "NOTIFICATIONS",
                        className: "notif-header",
                        halign: Gtk.Align.START
                    }),
                    Gtk.Label({
                        label: "No new notifications",
                        halign: Gtk.Align.CENTER
                    }),
                ]
            }),
        ]
    })

    return Gtk.Window({
        name: "control-center",
        anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT,
        layer: Astal.Layer.TOP,
        application: app,
        visible: false,
        child: mainBox
    })
}

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
