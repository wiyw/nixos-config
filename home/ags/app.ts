import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"

function ControlCenter() {
    return (
        <window anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT} marginTop={10} marginEnd={15} layer={Astal.Layer.TOP} visible={true}>
            <box orientation={Gtk.Orientation.VERTICAL} spacing={14} margin={14}>
                <box homogeneous spacing={14}>
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={8} class="quick-settings-pod">
                        <box spacing={8}>
                            <button onClicked={() => exec("nmcli radio wifi toggle")}>
                                <label label="󰤮" />
                            </button>
                            <button onClicked={() => exec("rfkill toggle bluetooth")}>
                                <label label="󰥭" />
                            </button>
                        </box>
                        <box spacing={8}>
                            <button onClicked={() => exec("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle")}>
                                <label label="󰝟" />
                            </button>
                            <button onClicked={() => exec("hyprlock")}>
                                <label label="󰌾" />
                            </button>
                        </box>
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={6} hexpand class="media-pod">
                        <box halign={Gtk.Align.CENTER} hexpand>
                            <label label="♪" class="music-icon" />
                        </box>
                        <label label="No Media Playing" class="media-title" />
                        <label label="—" class="media-artist" />
                        <box spacing={8} halign={Gtk.Align.CENTER} homogeneous>
                            <button onClicked={() => exec("playerctl previous")}>
                                <label label="󰒮" />
                            </button>
                            <button onClicked={() => exec("playerctl play-pause")}>
                                <label label="▶" />
                            </button>
                            <button onClicked={() => exec("playerctl next")}>
                                <label label="󰒭" />
                            </button>
                        </box>
                    </box>
                </box>
                <box orientation={Gtk.Orientation.VERTICAL} spacing={8} class="sliders-pod">
                    <box spacing={12}>
                        <label label="🔊" />
                        <label label="Volume" />
                    </box>
                    <box spacing={12}>
                        <label label="☀" />
                        <label label="Brightness" />
                    </box>
                </box>
                <box orientation={Gtk.Orientation.VERTICAL} spacing={8} vexpand class="notifications-pod">
                    <label label="NOTIFICATIONS" class="notif-header" />
                    <label label="No new notifications" />
                </box>
            </box>
        </window>
    )
}

app.start({
    css: `
        * { font-family: -apple-system, sans-serif; color: white; }
        window { background: rgba(30,30,30,0.9); border-radius: 20px; }
        .quick-settings-pod, .media-pod, .sliders-pod, .notifications-pod { background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px; }
        .music-icon { font-size: 32px; }
        .media-title { font-weight: bold; }
        .media-artist { color: #a0a0a0; }
        .notif-header { color: #a0a0a0; font-weight: bold; font-size: 11px; }
    `,
    requestHandler(request, res) {
        const wins = app.get_windows()
        if (wins.length > 0) {
            wins[0].visible = !wins[0].visible
            res("Toggled")
        } else {
            res("No windows")
        }
    },
    main() {
        ControlCenter()
    }
})
