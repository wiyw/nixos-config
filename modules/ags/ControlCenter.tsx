import { Gtk, Astal } from "ags/gtk4"
import { exec, execAsync } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

const WifiPopup = ({ visible }: { visible: boolean }) => (
    <window 
        name="wifi-popup"
        visible={visible}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={200}
        marginRight={15}
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
                <button onClicked={() => execAsync("nmcli radio wifi toggle")}>
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

const BTPopup = ({ visible }: { visible: boolean }) => (
    <window 
        name="bluetooth-popup"
        visible={visible}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={200}
        marginRight={15}
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
                <button onClicked={() => execAsync("bluetoothctl power toggle")}>
                    <label label="Toggle" />
                </button>
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

const NightPopup = ({ visible }: { visible: boolean }) => (
    <window 
        name="nightlight-popup"
        visible={visible}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={200}
        marginRight={15}
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
                <button onClicked={() => execAsync("gammastep -t 4500:3500")}>
                    <label label="Toggle" />
                </button>
            </box>
        </box>
    </window>
)

const SSPopup = ({ visible }: { visible: boolean }) => (
    <window 
        name="screenshot-popup"
        visible={visible}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        marginTop={200}
        marginRight={15}
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
            <button cssClasses={["tn-btn"]} onClicked={() => { app.get_window("screenshot-popup")?.close(); execAsync('grim -g "$(slurp)" -') }}>
                <label label="Selection" />
            </button>
            <button cssClasses={["tn-btn"]} onClicked={() => { app.get_window("screenshot-popup")?.close(); execAsync('grim -') }}>
                <label label="Full Screen" />
            </button>
        </box>
    </window>
)

export default function ControlCenterWindow() {
    const [wifiVisible, setWifiVisible] = createState(false)
    const [btVisible, setBtVisible] = createState(false)
    const [nightVisible, setNightVisible] = createState(false)
    const [ssVisible, setSsVisible] = createState(false)
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)
    const [playerTitle, setPlayerTitle] = createState("Nothing Playing")
    const [playerStatus, setPlayerStatus] = createState("Idle")

    execAsync("wpctl get-volume @DEFAULT_AUDIO_SINK").then((out: string) => {
        const match = out.match(/(\d+)%/)
        if (match) setSsVisible(parseInt(match[1]))
    }).catch(() => {})

    execAsync("brightnessctl get").then((out: string) => {
        execAsync("brightnessctl max").then((max: string) => {
            const current = parseInt(out.trim())
            const maxVal = parseInt(max.trim())
            if (maxVal > 0) setBrightness(Math.round((current / maxVal) * 100))
        }).catch(() => {})
    }).catch(() => {})

    const updatePlayerStatus = () => {
        execAsync("playerctl status").then((status: string) => {
            setPlayerStatus(status.trim())
            if (status.trim() === "Playing") {
                execAsync("playerctl metadata title").then((title: string) => {
                    setPlayerTitle(title.trim() || "Unknown")
                }).catch(() => setPlayerTitle("Unknown"))
            } else {
                setPlayerTitle("Nothing Playing")
            }
        }).catch(() => {
            setPlayerTitle("Nothing Playing")
            setPlayerStatus("Idle")
        })
    }

    setInterval(updatePlayerStatus, 2000)

    const handleVolume = (self: any, scrollType: any, value: number) => {
        const val = Math.round(value * 100)
        setVolume(val)
        execAsync(`wpctl set-volume @DEFAULT_AUDIO_SINK ${val}%`)
    }
    
    const handleBrightness = (self: any, scrollType: any, value: number) => {
        const val = Math.round(value * 100)
        setBrightness(val)
        execAsync(`brightnessctl set ${val}%`)
    }

    const toggleWifi = () => {
        setBtVisible(false)
        setNightVisible(false)
        setSsVisible(false)
        setWifiVisible(v => !v)
    }

    const toggleBT = () => {
        setWifiVisible(false)
        setNightVisible(false)
        setSsVisible(false)
        setBtVisible(v => !v)
    }

    const toggleNight = () => {
        setWifiVisible(false)
        setBtVisible(false)
        setSsVisible(false)
        setNightVisible(v => !v)
    }

    const toggleSS = () => {
        setWifiVisible(false)
        setBtVisible(false)
        setNightVisible(false)
        setSsVisible(v => !v)
    }

    return (
        <>
            <WifiPopup visible={wifiVisible.as((v: boolean) => v)} />
            <BTPopup visible={btVisible.as((v: boolean) => v)} />
            <NightPopup visible={nightVisible.as((v: boolean) => v)} />
            <SSPopup visible={ssVisible.as((v: boolean) => v)} />
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
                            <Gtk.Scale hexpand value={volume.as((v: number) => v / 100)} onChangeValue={handleVolume} />
                        </box>
                        <box spacing={10} valign={Gtk.Align.CENTER}>
                            <label cssClasses={["slider-icon"]} label="󰛨 " valign={Gtk.Align.CENTER} />
                            <Gtk.Scale hexpand value={brightness.as((v: number) => v / 100)} onChangeValue={handleBrightness} />
                        </box>
                    </box>

                    <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                        <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} hexpand>
                            <label cssClasses={["icon-large"]} label="󰎆 " valign={Gtk.Align.CENTER} />
                            <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                                <label cssClasses={["text-header"]} label={playerTitle.as((v: string) => v)} xalign={0} />
                                <label cssClasses={["text-muted"]} label={playerStatus.as((v: string) => v)} xalign={0} />
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
        </>
    )
}