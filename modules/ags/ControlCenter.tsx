import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

let wifiPopup: any = null
let btPopup: any = null
let nightPopup: any = null
let ssPopup: any = null

const createWifiPopup = () => {
    if (wifiPopup) return wifiPopup
    wifiPopup = (
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
            onKeyPressed={(self: any, event: any) => {
                if (event.get_keyval()[1] === 65307) self.visible = false
            }}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="WiFi" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (wifiPopup) wifiPopup.visible = false }}>
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
    return wifiPopup
}

const createBTPopup = () => {
    if (btPopup) return btPopup
    btPopup = (
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
            onKeyPressed={(self: any, event: any) => {
                if (event.get_keyval()[1] === 65307) self.visible = false
            }}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (btPopup) btPopup.visible = false }}>
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
    return btPopup
}

const createNightPopup = () => {
    if (nightPopup) return nightPopup
    nightPopup = (
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
            onKeyPressed={(self: any, event: any) => {
                if (event.get_keyval()[1] === 65307) self.visible = false
            }}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Night Light" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (nightPopup) nightPopup.visible = false }}>
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
    return nightPopup
}

const createSSPopup = () => {
    if (ssPopup) return ssPopup
    ssPopup = (
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
            onKeyPressed={(self: any, event: any) => {
                if (event.get_keyval()[1] === 65307) self.visible = false
            }}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Screenshot" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (ssPopup) ssPopup.visible = false }}>
                        <label label="✕" />
                    </button>
                </box>
                <button cssClasses={["tn-btn"]} onClicked={() => { 
                    if (ssPopup) ssPopup.visible = false
                    execAsync('grim -g "$(slurp)" -') 
                }}>
                    <label label="Selection" />
                </button>
                <button cssClasses={["tn-btn"]} onClicked={() => { 
                    if (ssPopup) ssPopup.visible = false
                    execAsync('grim -') 
                }}>
                    <label label="Full Screen" />
                </button>
            </box>
        </window>
    )
    return ssPopup
}

const closeAllPopups = () => {
    if (wifiPopup) wifiPopup.visible = false
    if (btPopup) btPopup.visible = false
    if (nightPopup) nightPopup.visible = false
    if (ssPopup) ssPopup.visible = false
}

export default function ControlCenterWindow() {
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)

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

    const toggleWifi = () => {
        closeAllPopups()
        const popup = createWifiPopup()
        popup.visible = !popup.visible
    }

    const toggleBT = () => {
        closeAllPopups()
        const popup = createBTPopup()
        popup.visible = !popup.visible
    }

    const toggleNight = () => {
        closeAllPopups()
        const popup = createNightPopup()
        popup.visible = !popup.visible
    }

    const toggleSS = () => {
        closeAllPopups()
        const popup = createSSPopup()
        popup.visible = !popup.visible
    }

    return (
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
            onKeyPressed={(self: any, event: any) => {
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
                    <button onClicked={toggleWifi}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰤯 " />
                            <label cssClasses={["text-bold"]} label="WiFi" />
                        </box>
                    </button>
                    <button onClicked={toggleBT}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰂯 " />
                            <label cssClasses={["text-bold"]} label="Bluetooth" />
                        </box>
                    </button>
                </box>

                <box spacing={12} homogeneous>
                    <button onClicked={toggleNight}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰟈 " />
                            <label cssClasses={["text-bold"]} label="Night Light" />
                        </box>
                    </button>
                    <button onClicked={toggleSS}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰑮 " />
                            <label cssClasses={["text-bold"]} label="Screenshot" />
                        </box>
                    </button>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["slider-icon"]} label="󰝀 " valign={Gtk.Align.CENTER} />
                        <Gtk.Scale hexpand onValueChanged={handleVolume} />
                    </box>
                    <box spacing={10} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["slider-icon"]} label="󰛨 " valign={Gtk.Align.CENTER} />
                        <Gtk.Scale hexpand onValueChanged={handleBrightness} />
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
}