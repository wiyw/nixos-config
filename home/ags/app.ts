import app from "ags/gtk4/app"
import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"

function ControlCenter() {
    return (
        <window visible name="control-center" anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT} marginTop={10} marginEnd={15} layer={Astal.Layer.TOP} defaultWidth={360} defaultHeight={520}>
            <box orientation={Gtk.Orientation.VERTICAL} spacing={14} margin={14}>
                <box homogeneous spacing={14}>
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={8} css="background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px;">
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
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={6} hexpand css="background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px; min-width: 140px;">
                        <box halign={Gtk.Align.CENTER} hexpand>
                            <label label="♪" css="font-size: 32px;" />
                        </box>
                        <label label="No Media Playing" halign={Gtk.Align.CENTER} css="font-weight: bold;" />
                        <label label="—" halign={Gtk.Align.CENTER} css="color: #a0a0a0;" />
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
                <box orientation={Gtk.Orientation.VERTICAL} spacing={8} css="background: rgba(40,40,50,0.8); border-radius: 16px; padding: 14px;">
                    <box spacing={12}>
                        <label label="🔊" />
                        <label label="Volume" />
                    </box>
                    <box spacing={12}>
                        <label label="☀" />
                        <label label="Brightness" />
                    </box>
                </box>
                <box orientation={Gtk.Orientation.VERTICAL} spacing={8} vexpand css="background: rgba(40,40,50,0.8); border-radius: 16px; padding: 12px;">
                    <label label="NOTIFICATIONS" halign={Gtk.Align.START} css="color: #a0a0a0; font-weight: bold; font-size: 11px;" />
                    <label label="No new notifications" halign={Gtk.Align.CENTER} css="color: #808080;" />
                </box>
            </box>
        </window>
    )
}

app.start({
    css: `* { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: white; } window { background: rgba(30,30,30,0.9); border-radius: 20px; }`,
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
        ControlCenter()
    }
})
