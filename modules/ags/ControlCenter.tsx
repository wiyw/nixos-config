import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

let controlCenterWin: any = null

const closePopup = (name: string) => {
    const w = app.get_window(name)
    if (w) w.close()
}

const WifiWindow = () => (
    <window 
        name="wifi-popup"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={50}
        marginRight={315}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
        onKeyPressed={(self, event) => {
            if (event.get_keyval()[1] === 65307) self.close()
        }}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="WiFi" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => closePopup("wifi-popup")}>
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
        marginRight={315}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
        onKeyPressed={(self, event) => {
            if (event.get_keyval()[1] === 65307) self.close()
        }}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => closePopup("bluetooth-popup")}>
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
        marginRight={315}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
        onKeyPressed={(self, event) => {
            if (event.get_keyval()[1] === 65307) self.close()
        }}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="Night Light" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => closePopup("nightlight-popup")}>
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
        marginRight={315}
        cssClasses={["popup-window"]}
        visible
        application={app}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.TOP}
        onKeyPressed={(self, event) => {
            if (event.get_keyval()[1] === 65307) self.close()
        }}
    >
        <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box>
                <label cssClasses={["text-bold"]} label="Screenshot" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={() => closePopup("screenshot-popup")}>
                    <label label="✕" />
                </button>
            </box>
            <button cssClasses={["tn-btn"]} onClicked={() => { closePopup("screenshot-popup"); execAsync('grim -g "$(slurp)" -') }}>
                <label label="Selection" />
            </button>
            <button cssClasses={["tn-btn"]} onClicked={() => { closePopup("screenshot-popup"); execAsync('grim -') }}>
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

    const openPopup = (popup: () => any) => {
        closePopup("wifi-popup")
        closePopup("bluetooth-popup")
        closePopup("nightlight-popup")
        closePopup("screenshot-popup")
        popup()
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
                if (event.get_keyval()[1] === 65307) self.visible = false
            }}
        >
            <box cssClasses={["tn-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                <box spacing={15} valign={Gtk.Align.CENTER}>
                    <label cssClasses={["icon-large"]} label="󰒓 " valign={Gtk.Align.CENTER} />
                    <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                        <label cssClasses={["text-header"]} label="Greyson" xalign={0} />
                        <label cssClasses={["text-muted"]} label="NixOS" xalign={0} />
                    </box>
                    <button cssClasses={["tn-icon-btn", "destructive"]} onClicked={() => exec("systemctl poweroff")}>
                        <label label="󰐥 " />
                    </button>
                </box>

                <box spacing={12} homogeneous>
                    <button onClicked={() => openPopup(WifiWindow)}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰤯 " />
                            <label cssClasses={["text-bold"]} label="WiFi" />
                        </box>
                    </button>
                    <button onClicked={() => openPopup(BluetoothWindow)}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰂯 " />
                            <label cssClasses={["text-bold"]} label="Bluetooth" />
                        </box>
                    </button>
                </box>

                <box spacing={12} homogeneous>
                    <button onClicked={() => openPopup(NightLightWindow)}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰟈 " />
                            <label cssClasses={["text-bold"]} label="Night Light" />
                        </box>
                    </button>
                    <button onClicked={() => openPopup(ScreenshotWindow)}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰑮 " />
                            <label cssClasses={["text-bold"]} label="Screenshot" />
                        </box>
                    </button>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["slider-icon"]} label="󰝀 " valign={Gtk.Align.CENTER} />
                        <Gtk.Scale hexpand onValueChanged={(self) => handleVolume(self)} />
                    </box>
                    <box spacing={10} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["slider-icon"]} label="󰛨 " valign={Gtk.Align.CENTER} />
                        <Gtk.Scale hexpand onValueChanged={(self) => handleBrightness(self)} />
                    </box>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} hexpand>
                        <label cssClasses={["icon-large"]} label="󰎆 " valign={Gtk.Align.CENTER} />
                        <box orientation={Gtk.Orientation.VERTICAL} hexpand>
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
