import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

let wifiWin: any = null
let btWin: any = null  
let nightWin: any = null
let ssWin: any = null
let controlWin: any = null

const createPopupWindow = (name: string, content: any) => {
    const existing = app.get_window(name)
    if (existing) {
        existing.visible = !existing.visible
        return existing
    }
    
    return (
        <window 
            name={name}
            visible={true}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            {content}
        </window>
    )
}

export default function ControlCenterWindow() {
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)

    const handleVolume = (val: number) => {
        const v = Math.round(val * 100)
        setVolume(v)
        execAsync(`wpctl set-volume @DEFAULT_AUDIO_SINK ${v}%`).catch(() => {})
    }
    
    const handleBrightness = (val: number) => {
        const v = Math.round(val * 100)
        setBrightness(v)
        execAsync(`brightnessctl set ${v}%`).catch(() => {})
    }

    const toggleWifi = () => {
        const win = app.get_window("wifi-popup")
        if (win) {
            win.visible = !win.visible
        } else {
            wifiWin = createPopupWindow("wifi-popup", 
                <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box>
                        <label cssClasses={["text-bold"]} label="Wi-Fi" hexpand />
                        <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("wifi-popup")?.close()}>
                            <label label="✕" />
                        </button>
                    </box>
                    <box cssClasses={["toggle-row"]}>
                        <label label="󰤯" />
                        <label cssClasses={["text-bold"]} label="Wi-Fi" hexpand />
                        <button onClicked={() => execAsync("nmcli radio wifi toggle").catch(() => {})}>
                            <label label="Toggle" />
                        </button>
                    </box>
                </box>
            )
        }
    }

    const toggleBT = () => {
        const win = app.get_window("bluetooth-popup")
        if (win) {
            win.visible = !win.visible
        } else {
            btWin = createPopupWindow("bluetooth-popup",
                <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box>
                        <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                        <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("bluetooth-popup")?.close()}>
                            <label label="✕" />
                        </button>
                    </box>
                    <box cssClasses={["toggle-row"]}>
                        <label label="󰂯" />
                        <label cssClasses={["text-bold"]} label="Bluetooth" hexpand />
                        <button onClicked={() => execAsync("bluetoothctl power toggle").catch(() => {})}>
                            <label label="Toggle" />
                        </button>
                    </box>
                </box>
            )
        }
    }

    const toggleNight = () => {
        const win = app.get_window("display-popup")
        if (win) {
            win.visible = !win.visible
        } else {
            nightWin = createPopupWindow("display-popup",
                <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box>
                        <label cssClasses={["text-bold"]} label="Display" hexpand />
                        <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("display-popup")?.close()}>
                            <label label="✕" />
                        </button>
                    </box>
                    <box cssClasses={["toggle-row"]}>
                        <label label="󰟈" />
                        <label cssClasses={["text-bold"]} label="Night Light" hexpand />
                        <button onClicked={() => execAsync("redshift -P -O 4500").catch(() => {})}>
                            <label label="Toggle" />
                        </button>
                    </box>
                </box>
            )
        }
    }

    const toggleSS = () => {
        const win = app.get_window("screenshot-popup")
        if (win) {
            win.visible = !win.visible
        } else {
            ssWin = createPopupWindow("screenshot-popup",
                <box cssClasses={["popup-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box>
                        <label cssClasses={["text-bold"]} label="Screenshot" hexpand />
                        <button cssClasses={["tn-close-btn"]} onClicked={() => app.get_window("screenshot-popup")?.close()}>
                            <label label="✕" />
                        </button>
                    </box>
                    <button cssClasses={["tn-btn"]} onClicked={() => { app.get_window("screenshot-popup")?.close(); execAsync('grim -g "$(slurp)" -').catch(() => {}) }}>
                        <label label="Selection" />
                    </button>
                    <button cssClasses={["tn-btn"]} onClicked={() => { app.get_window("screenshot-popup")?.close(); execAsync('grim -').catch(() => {}) }}>
                        <label label="Full Screen" />
                    </button>
                </box>
            )
        }
    }

    controlWin = (
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
                    <button cssClasses={["tn-icon-btn"]} onClicked={() => exec("systemctl poweroff")}>
                        <label label="⏻" />
                    </button>
                </box>
            </box>
        </window>
    )

    return controlWin
}