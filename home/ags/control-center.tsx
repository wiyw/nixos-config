import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"

function QuickButton({ icon, command }: { icon: string, command: string }) {
    return (
        <button 
            className="toggle-btn" 
            onClicked={() => exec(command)}
        >
            <label label={icon} />
        </button>
    )
}

export default function ControlCenter() {
    return (
        <window
            name="control-center"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginRight={15}
            marginTop={10}
            layer={Astal.Layer.TOP}
            application={app}
            visible={false}
        >
            <box className="control-center" orientation={Gtk.Orientation.VERTICAL} spacing={14}>
                <box spacing={14}>
                    <box className="quick-settings-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                        <box spacing={8}>
                            <QuickButton icon="󰤮" command="nmcli radio wifi toggle" />
                            <QuickButton icon="󰥭" command="rfkill toggle bluetooth" />
                        </box>
                        <box spacing={8}>
                            <QuickButton icon="󰝟" command="wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle" />
                            <QuickButton icon="󰌾" command="hyprlock" />
                        </box>
                    </box>

                    <box className="media-pod" orientation={Gtk.Orientation.VERTICAL} spacing={6}>
                        <box className="media-cover" halign={Gtk.Align.CENTER}>
                            <label label="♪" css="font-size: 32px;" />
                        </box>
                        <label className="media-title" label="No Media Playing" truncate />
                        <label className="media-artist" label="—" truncate />
                        
                        <box className="media-controls" spacing={8} halign={Gtk.Align.CENTER}>
                            <button className="media-btn" onClicked={() => exec("playerctl previous")}>
                                <label label="󰒮" />
                            </button>
                            <button className="media-btn play-btn" onClicked={() => exec("playerctl play-pause")}>
                                <label label="▶" />
                            </button>
                            <button className="media-btn" onClicked={() => exec("playerctl next")}>
                                <label label="󰒭" />
                            </button>
                        </box>
                    </box>
                </box>

                <box className="sliders-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                    <box spacing={12}>
                        <label label="🔊" />
                        <label label="Volume" />
                    </box>
                    <box spacing={12}>
                        <label label="☀" />
                        <label label="Brightness" />
                    </box>
                </box>

                <box className="notifications-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8} vexpand>
                    <label className="notif-header" label="NOTIFICATIONS" halign={Gtk.Align.START} />
                    <label label="No new notifications" halign={Gtk.Align.CENTER} />
                </box>
            </box>
        </window>
    )
}
