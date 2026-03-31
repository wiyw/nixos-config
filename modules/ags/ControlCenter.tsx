import { Gtk, Astal, Gdk } from "ags/gtk4"
import { exec } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

const WifiWindow = () => {
    const [networks] = createState([
        { name: "Home Network", icon: "󰤨", connected: true },
        { name: "Office WiFi", icon: "󰤨", connected: false },
    ])
    
    return (
        <window 
            name="wifi-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={120}
            marginRight={15}
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
                    <switch active />
                </box>
                {networks.as((nets: any) => nets.map((net: any) => (
                    <box cssClasses={["network-item"]} spacing={12}>
                        <label label={net.icon} />
                        <label cssClasses={["text-bold"]} label={net.name} hexpand />
                        {net.connected && <label cssClasses={["text-muted"]} label="Connected" />}
                    </box>
                )))}
            </box>
        </window>
    )
}

const BluetoothWindow = () => {
    return (
        <window 
            name="bluetooth-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={120}
            marginRight={180}
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
                    <switch />
                </box>
                <box cssClasses={["device-item"]} spacing={12}>
                    <label label="󰂯 " />
                    <label cssClasses={["text-bold"]} label="No devices" hexpand />
                </box>
                <button cssClasses={["tn-btn"]} onClicked={() => exec('bluetoothctl pairable on')}>
                    <label label="Enable Pairing" />
                </button>
            </box>
        </window>
    )
}

const NightLightWindow = () => {
    return (
        <window 
            name="nightlight-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={120}
            marginRight={180}
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
                    <switch />
                </box>
                <box spacing={8}>
                    <label cssClasses={["text-muted"]} label="Warmth" />
                    <Gtk.Scale hexpand onValueChanged={(self) => console.log(self.get_value())} />
                </box>
            </box>
        </window>
    )
}

const ScreenshotWindow = () => {
    return (
        <window 
            name="screenshot-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={120}
            marginRight={180}
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
                <button cssClasses={["tn-btn"]} onClicked={() => exec('grim -g "$(slurp)" -')}>
                    <label label="󰑮  Selection" />
                </button>
                <button cssClasses={["tn-btn"]} onClicked={() => exec('grim -')}>
                    <label label="󰑯  Full Screen" />
                </button>
                <button cssClasses={["tn-btn"]} onClicked={() => exec('grim -g "$(slurp)" - | wl-copy')}>
                    <label label="󰑰  Copy to Clipboard" />
                </button>
            </box>
        </window>
    )
}

export default function ControlCenterWindow() {
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)

    return (
        <window
            name="control-center"
            namespace="control-center"
            cssClasses={["ControlCenterWindow"]}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={15}
            visible={true}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
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
                    <button onClicked={() => {
                        if (app.get_window("wifi-popup")) {
                            app.get_window("wifi-popup")?.close()
                        } else {
                            WifiWindow()
                        }
                    }}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰤯 " />
                            <label cssClasses={["text-bold"]} label="WiFi" />
                        </box>
                    </button>
                    
                    <button onClicked={() => {
                        if (app.get_window("bluetooth-popup")) {
                            app.get_window("bluetooth-popup")?.close()
                        } else {
                            BluetoothWindow()
                        }
                    }}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰂯 " />
                            <label cssClasses={["text-bold"]} label="Bluetooth" />
                        </box>
                    </button>
                </box>

                <box spacing={12} homogeneous>
                    <button onClicked={() => {
                        if (app.get_window("nightlight-popup")) {
                            app.get_window("nightlight-popup")?.close()
                        } else {
                            NightLightWindow()
                        }
                    }}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰟈 " />
                            <label cssClasses={["text-bold"]} label="Night Light" />
                        </box>
                    </button>
                    <button onClicked={() => {
                        if (app.get_window("screenshot-popup")) {
                            app.get_window("screenshot-popup")?.close()
                        } else {
                            ScreenshotWindow()
                        }
                    }}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰑮 " />
                            <label cssClasses={["text-bold"]} label="Screenshot" />
                        </box>
                    </button>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰝀 " />
                        <Gtk.Scale hexpand onValueChanged={(self) => {
                            setVolume(self.get_value())
                            exec(`wpctl set-volume @DEFAULT_AUDIO_SINK ${self.get_value()}%`)
                        }} />
                    </box>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰛨 " />
                        <Gtk.Scale hexpand onValueChanged={(self) => {
                            setBrightness(self.get_value())
                            exec(`brightnessctl set ${self.get_value()}%`)
                        }} />
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
}
