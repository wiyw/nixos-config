import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

let controlCenterWin: any = null

const closeControlCenter = () => {
    if (controlCenterWin) {
        controlCenterWin.visible = false
    }
}

const WifiWindow = () => (
    <window 
        name="wifi-popup"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={50}
        marginRight={350}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="WiFi" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("wifi-popup")?.close()}>
                    <label label="✕" />
                </button>
            </box>
            <box cssClasses={["toggle-row"]}>
                <label label="󰤯 " />
                <label cssClasses={["text-bold"]} label="Wi-Fi" hexpand />
                <switch onClicked={() => execAsync("nmcli radio wifi off")} />
            </box>
            <box cssClasses={["network-item"]} spacing={12}>
                <label label="󰤨 " />
                <label cssClasses={["text-bold"]} label="Home Network" hexpand />
                <label cssClasses={["text-muted"]} label="Connected" />
            </box>
        </box>
    </window>
)

const BluetoothWindow = () => (
    <window 
        name="bluetooth-popup"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={50}
        marginRight={350}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("bluetooth-popup")?.close()}>
                    <label label="✕" />
                </button>
            </box>
            <box cssClasses={["toggle-row"]}>
                <label label="󰂯 " />
                <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                <switch onClicked={() => execAsync("bluetoothctl power off")} />
            </box>
            <box cssClasses={["device-item"]} spacing={12}>
                <label label="󰂯 " />
                <label cssClasses={["text-bold"]} label="No devices" hexpand />
            </box>
            <button cssClasses={["tn-btn"]} onClicked={() => execAsync("bluetoothctl pairable on")}>
                <label label="Enable Pairing" />
            </button>
        </box>
    </window>
)

const NightLightWindow = () => (
    <window 
        name="nightlight-popup"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={50}
        marginRight={350}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="Night Light" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("nightlight-popup")?.close()}>
                    <label label="✕" />
                </button>
            </box>
            <box cssClasses={["toggle-row"]}>
                <label label="󰟈 " />
                <label cssClasses={["text-bold"]} label="Night Shift" hexpand />
                <switch onClicked={() => execAsync("gammastep -t 4500:3500")} />
            </box>
        </box>
    </window>
)

const ScreenshotWindow = () => (
    <window 
        name="screenshot-popup"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={50}
        marginRight={350}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="Screenshot" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("screenshot-popup")?.close()}>
                    <label label="✕" />
                </button>
            </box>
            <button cssClasses={["tn-btn"]} onClicked={() => execAsync('grim -g "$(slurp)" -')}>
                <label label="Selection" />
            </button>
            <button cssClasses={["tn-btn"]} onClicked={() => execAsync('grim -')}>
                <label label="Full Screen" />
            </button>
        </box>
    </window>
)

export default function ControlCenterWindow() {
    const [, setVolume] = createState(50)
    const [, setBrightness] = createState(80)

    const handleVolume = (self: Gtk.Scale) => {
        const val = Math.round(self.get_value())
        setVolume(val)
        execAsync(`wpctl set-volume @DEFAULT_AUDIO_SINK ${val}%`)
    }
    
    const handleBrightness = (self: Gtk.Scale) => {
        const val = Math.round(self.get_value())
        setBrightness(val)
        execAsync(`brightnessctl set ${val}%`)
    }

    controlCenterWin = (
        <window
            name="control-center"
            namespace="control-center"
            cssClasses={["ControlCenterWindow"]}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={15}
            visible={false}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
            onKeyPressed={(self, event) => {
                if (event.get_keyval()[1] === 65307) {
                    self.visible = false
                }
            }}
        >
            <box cssClasses={["tn-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                <box spacing={15}>
                    <box cssClasses={["tn-profile-pic"]} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["icon-large"]} label="󰒓 " />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                        <label cssClasses={["text-header"]} label="Greyson" xalign={0} />
                        <label cssClasses={["text-muted"]} label="NixOS" xalign={0} />
                    </box>
                    <button cssClasses={["tn-icon-btn", "destructive"]} onClicked={() => exec("systemctl poweroff")}>
                        <label label="󰐥 " />
                    </button>
                </box>

                <box spacing={12} homogeneous>
                    <button onClicked={() => WifiWindow()}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰤯 " />
                            <label cssClasses={["text-bold"]} label="WiFi" />
                        </box>
                    </button>
                    <button onClicked={() => BluetoothWindow()}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰂯 " />
                            <label cssClasses={["text-bold"]} label="Bluetooth" />
                        </box>
                    </button>
                </box>

                <box spacing={12} homogeneous>
                    <button onClicked={() => NightLightWindow()}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰟈 " />
                            <label cssClasses={["text-bold"]} label="Night Light" />
                        </box>
                    </button>
                    <button onClicked={() => ScreenshotWindow()}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰑮 " />
                            <label cssClasses={["text-bold"]} label="Screenshot" />
                        </box>
                    </button>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰝀 " />
                        <Gtk.Scale hexpand onValueChanged={(self) => handleVolume(self)} />
                    </box>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰛨 " />
                        <Gtk.Scale hexpand onValueChanged={(self) => handleBrightness(self)} />
                    </box>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} hexpand>
                        <box cssClasses={["tn-media-art"]} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label cssClasses={["icon-large"]} label="󰎆 " />
                        </box>
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                            <label cssClasses={["text-header"]} label="Nothing Playing" xalign={0} />
                            <label cssClasses={["text-muted"]} label="Idle" xalign={0} />
                        </box>
                    </box>
                    <box spacing={24} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("playerctl previous")}>
                            <label label="󰒮 " />
                        </button>
                        <label cssClasses={["play-btn"]} label="󰐊 " />
                        <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("playerctl next")}>
                            <label label="󰒭 " />
                        </button>
                    </box>
                </box>
            </box>
        </window>
    )
    
    return controlCenterWin
}

export function toggleControlCenter() {
    if (controlCenterWin) {
        controlCenterWin.visible = !controlCenterWin.visible
    }
}
