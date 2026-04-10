import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

let wifiWin: any = null
let btWin: any = null  
let nightWin: any = null
let ssWin: any = null
let controlWin: any = null

const createWifiPopup = () => {
    if (wifiWin) return wifiWin
    wifiWin = (
        <window 
            name="wifi-popup"
            visible={false}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={365}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Wi-Fi" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (wifiWin) wifiWin.visible = false }}>
                        <label label="✕" />
                    </button>
                </box>
                <box cssClasses={["toggle-row"]}>
                    <label label="󰤯 " />
                    <label cssClasses={["text-bold"]} label="Wi-Fi" hexpand />
                    <button onClicked={() => execAsync("nmcli radio wifi toggle").catch(() => {})}>
                        <label label="Toggle" />
                    </button>
                </box>
                <box cssClasses={["network-item"]} spacing={12}>
                    <label label="󰤨 " />
                    <label cssClasses={["text-bold"]} label="Home Network" hexpand />
                    <label cssClasses={["text-muted"]} label="Connected" />
                </box>
            </box>
        </window>
    )
    return wifiWin
}

const createBTPopup = () => {
    if (btWin) return btWin
    btWin = (
        <window 
            name="bluetooth-popup"
            visible={false}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={365}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (btWin) btWin.visible = false }}>
                        <label label="✕" />
                    </button>
                </box>
                <box cssClasses={["toggle-row"]}>
                    <label label="󰂯 " />
                    <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                    <button onClicked={() => execAsync("bluetoothctl power toggle").catch(() => {})}>
                        <label label="Toggle" />
                    </button>
                </box>
                <box cssClasses={["device-item"]} spacing={12}>
                    <label label="󰂯 " />
                    <label cssClasses={["text-bold"]} label="No devices" hexpand />
                </box>
                <button cssClasses={["tn-btn"]} onClicked={() => execAsync("bluetoothctl pairable on").catch(() => {})}>
                    <label label="Enable Pairing" />
                </button>
            </box>
        </window>
    )
    return btWin
}

const createNightPopup = () => {
    if (nightWin) return nightWin
    nightWin = (
        <window 
            name="nightlight-popup"
            visible={false}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={365}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Night Light" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (nightWin) nightWin.visible = false }}>
                        <label label="✕" />
                    </button>
                </box>
                <box cssClasses={["toggle-row"]}>
                    <label label="󰟈 " />
                    <label cssClasses={["text-bold"]} label="Night Shift" hexpand />
                    <button onClicked={() => execAsync("redshift -P -O 4500").catch(() => {})}>
                        <label label="Toggle" />
                    </button>
                </box>
            </box>
        </window>
    )
    return nightWin
}

const createSSPopup = () => {
    if (ssWin) return ssWin
    ssWin = (
        <window 
            name="screenshot-popup"
            visible={false}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={365}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box>
                    <label cssClasses={["text-bold"]} label="Screenshot" hexpand />
                    <button cssClasses={["tn-close-btn"]} onClicked={() => { if (ssWin) ssWin.visible = false }}>
                        <label label="✕" />
                    </button>
                </box>
                <button cssClasses={["tn-btn"]} onClicked={() => { if (ssWin) ssWin.visible = false; execAsync('grim -g "$(slurp)" -').catch(() => {}) }}>
                    <label label="Selection" />
                </button>
                <button cssClasses={["tn-btn"]} onClicked={() => { if (ssWin) ssWin.visible = false; execAsync('grim -').catch(() => {}) }}>
                    <label label="Full Screen" />
                </button>
            </box>
        </window>
    )
    return ssWin
}

const closeAllPopups = () => {
    if (wifiWin) wifiWin.visible = false
    if (btWin) btWin.visible = false  
    if (nightWin) nightWin.visible = false
    if (ssWin) ssWin.visible = false
}

export default function ControlCenterWindow() {
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)
    const [playerTitle, setPlayerTitle] = createState("Nothing Playing")
    const [playerStatus, setPlayerStatus] = createState("Idle")

    const handleVolume = (self: any) => {
        const val = Math.round(self.get_value() * 100)
        setVolume(val)
        execAsync(`wpctl set-volume @DEFAULT_AUDIO_SINK ${val}%`).catch(() => {})
    }
    
    const handleBrightness = (self: any) => {
        const val = Math.round(self.get_value() * 100)
        setBrightness(val)
        execAsync(`brightnessctl set ${val}%`).catch(() => {})
    }

    const toggleWifi = () => {
        closeAllPopups()
        const win = createWifiPopup()
        win.visible = !win.visible
    }

    const toggleBT = () => {
        closeAllPopups()
        const win = createBTPopup()
        win.visible = !win.visible
    }

    const toggleNight = () => {
        closeAllPopups()
        const win = createNightPopup()
        win.visible = !win.visible
    }

    const toggleSS = () => {
        closeAllPopups()
        const win = createSSPopup()
        win.visible = !win.visible
    }

    controlWin = (
        <window
            name="control-center"
            namespace="control-center"
            cssClasses={["ControlCenterWindow"]}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={50}
            marginRight={365}
            visible={false}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box cssClasses={["tn-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <box cssClasses={["module-grid"]} spacing={8} homogeneous>
                    <button onClicked={toggleWifi}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label cssClasses={["toggle-icon"]} label="󰤯" />
                            <label cssClasses={["text-bold"]} label="Wi-Fi" />
                        </box>
                    </button>
                    <button onClicked={toggleBT}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label cssClasses={["toggle-icon"]} label="󰂯" />
                            <label cssClasses={["text-bold"]} label="Bluetooth" />
                        </box>
                    </button>
                    <button onClicked={toggleNight}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label cssClasses={["toggle-icon"]} label="󰟈" />
                            <label cssClasses={["text-bold"]} label="Display" />
                        </box>
                    </button>
                    <button onClicked={toggleSS}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label cssClasses={["toggle-icon"]} label="󰑮" />
                            <label cssClasses={["text-bold"]} label="Screen" />
                        </box>
                    </button>
                </box>

                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                    <box spacing={10} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["slider-icon"]} label="󰝀" valign={Gtk.Align.CENTER} />
                        <Gtk.Scale hexpand />
                    </box>
                    <box spacing={10} valign={Gtk.Align.CENTER}>
                        <label cssClasses={["slider-icon"]} label="󰛨" valign={Gtk.Align.CENTER} />
                        <Gtk.Scale hexpand />
                    </box>
                </box>

                <box cssClasses={["player-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                    <box spacing={12} halign={Gtk.Align.CENTER} hexpand>
                        <label cssClasses={["icon-large"]} label="󰎆" valign={Gtk.Align.CENTER} />
                        <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                            <label cssClasses={["player-title"]} label="Nothing Playing" xalign={0} />
                            <label cssClasses={["player-status"]} label="No media playing" xalign={0} />
                        </box>
                    </box>
                    <box spacing={20} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("playerctl previous")}>
                            <label label="󰒮" />
                        </button>
                        <label cssClasses={["play-btn"]} label="󰐊" />
                        <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("playerctl next")}>
                            <label label="󰒭" />
                        </button>
                    </box>
                </box>

                <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                    <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("systemctl suspend")}>
                        <label label="󰌾" />
                    </button>
                    <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("sysact")}>
                        <label label="⏻" />
                    </button>
                </box>
            </box>
        </window>
    )

    return controlWin
}