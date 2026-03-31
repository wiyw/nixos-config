import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState, createEffect } from "ags"
import app from "ags/gtk4/app"

const WifiWindow = () => {
    return (
        <window 
            name="wifi-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={110}
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
                <box cssClasses={["network-item"]} spacing={12}>
                    <label label="󰤨 " />
                    <label cssClasses={["text-bold"]} label="Home Network" hexpand />
                    <label cssClasses={["text-muted"]} label="Connected" />
                </box>
            </box>
        </window>
    )
}

const BluetoothWindow = () => {
    return (
        <window 
            name="bluetooth-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={110}
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
            marginTop={110}
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
                    <Gtk.Scale hexpand />
                </box>
            </box>
        </window>
    )
}

const ScreenshotWindow = () => {
    const closeAndRun = (cmd: string) => {
        exec(cmd)
        app.get_window("screenshot-popup")?.close()
    }
    
    return (
        <window 
            name="screenshot-popup"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={110}
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
                <button cssClasses={["tn-btn"]} onClicked={() => closeAndRun('grim -g "$(slurp)" -')}>
                    <label label="Selection" />
                </button>
                <button cssClasses={["tn-btn"]} onClicked={() => closeAndRun('grim -')}>
                    <label label="Full Screen" />
                </button>
            </box>
        </window>
    )
}

export default function ControlCenterWindow() {
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)

    createEffect(() => {
        execAsync("wpctl get-volume @DEFAULT_AUDIO_SINK").then((out: string) => {
            const match = out.match(/(\d+)%/)
            if (match) setVolume(parseInt(match[1]))
        })
        execAsync("brightnessctl get").then((out: string) => {
            const match = out.match(/(\d+)%/)
            if (match) setBrightness(parseInt(match[1]))
        })
    })

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
                        const w = app.get_window("wifi-popup")
                        if (w) {
                            w.close()
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
                        const w = app.get_window("bluetooth-popup")
                        if (w) {
                            w.close()
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
                        const w = app.get_window("nightlight-popup")
                        if (w) {
                            w.close()
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
                        const w = app.get_window("screenshot-popup")
                        if (w) {
                            w.close()
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
}
