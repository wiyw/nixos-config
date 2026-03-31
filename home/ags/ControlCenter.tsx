import { App, Astal, Gtk } from "astal/gtk3"
import { Variable, bind } from "astal"
import { exec, execAsync } from "astal/process"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Bluetooth from "gi://AstalBluetooth"
import Mpris from "gi://AstalMpris"
import Battery from "gi://AstalBattery"

const getBrightness = () => {
    try { return Number(exec("brightnessctl g")) / Number(exec("brightnessctl m")) } 
    catch { return 0 }
}
const brightness = Variable(getBrightness())

export default function ControlCenter() {
    const audio = Wp.get_default()?.audio
    const speaker = audio?.defaultSpeaker!
    const mic = audio?.defaultMicrophone!
    const network = Network.get_default()
    const bluetooth = Bluetooth.get_default()
    const mpris = Mpris.get_default()
    const bat = Battery.get_default()

    return (
        <window name="control-center" anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT} margin={15} visible={false} application={App}>
            {/* Main Transparent Container */}
            <box className="tn-container" vertical={true} spacing={15}>
                
                {/* HEADER: NixOS Profile */}
                <box className="tn-panel" spacing={15}>
                    <box className="tn-profile-pic" valign={Gtk.Align.CENTER}>
                        <label className="icon-large" label=" " /> {/* NixOS Snowflake */}
                    </box>
                    <box vertical={true} valign={Gtk.Align.CENTER} hexpand={true}>
                        <label className="text-header text-left" label="NixOS" />
                        <label className="text-muted text-left" label="Hyprland Session" />
                    </box>
                    <button className="tn-icon-btn destructive" onClick={() => execAsync("systemctl poweroff")}>
                        <label label=" " />
                    </button>
                </box>

                {/* QUICK TOGGLES: Even 2x2 Grid */}
                <box spacing={12} homogeneous={true}>
                    <button className={bind(network.wifi, "ssid").as(s => s ? "tn-toggle active" : "tn-toggle")}>
                        <box vertical={true} spacing={5} halign={Gtk.Align.CENTER}>
                            <label className="toggle-icon" label=" " />
                            <label className="text-bold" label={bind(network.wifi, "ssid").as(s => s || "Disconnected")} truncate={true} />
                        </box>
                    </button>
                    <button className={bind(bluetooth, "isPowered").as(p => p ? "tn-toggle active" : "tn-toggle")}>
                        <box vertical={true} spacing={5} halign={Gtk.Align.CENTER}>
                            <label className="toggle-icon" label=" " />
                            <label className="text-bold" label={bind(bluetooth, "isPowered").as(p => p ? "Bluetooth On" : "Bluetooth Off")} />
                        </box>
                    </button>
                </box>
                
                <box spacing={12} homogeneous={true}>
                    <button className={bind(mic, "mute").as(m => m ? "tn-toggle" : "tn-toggle active")} onClick={() => mic.mute = !mic.mute}>
                        <box vertical={true} spacing={5} halign={Gtk.Align.CENTER}>
                            <label className="toggle-icon" label={bind(mic, "mute").as(m => m ? "󰍭 " : "󰍬 ")} />
                            <label className="text-bold" label={bind(mic, "mute").as(m => m ? "Mic Muted" : "Mic Live")} />
                        </box>
                    </button>
                    <button className={bind(bat, "isCharging").as(c => c ? "tn-toggle active" : "tn-toggle")}>
                        <box vertical={true} spacing={5} halign={Gtk.Align.CENTER}>
                            <label className="toggle-icon" label={bind(bat, "percentage").as(p => (p || 0) > 0.8 ? "󰁹" : (p || 0) > 0.4 ? "󰁾" : "󰁺")} />
                            <label className="text-bold" label={bind(bat, "percentage").as(p => `${Math.floor((p || 0) * 100)}% Battery`)} />
                        </box>
                    </button>
                </box>

                {/* SLIDERS */}
                <box className="tn-panel" vertical={true} spacing={12}>
                    <box spacing={12}>
                        <label className="slider-icon" label="󰃠 " />
                        <slider className="tn-slider" hexpand={true} drawValue={false} value={bind(brightness)} onDragged={({ value }) => { execAsync(`brightnessctl set ${Math.floor(value * 100)}%`); brightness.set(value); }} />
                    </box>
                    <box spacing={12}>
                        <label className="slider-icon" label={bind(speaker, "volume").as(v => v > 0.5 ? "󰕾" : v > 0 ? "󰖀" : "󰝟")} />
                        <slider className="tn-slider" hexpand={true} drawValue={false} value={bind(speaker, "volume")} onDragged={({ value }) => speaker.volume = value} />
                    </box>
                </box>

                {/* MEDIA PLAYER: Centered & Clean */}
                <box className="tn-panel" vertical={true} spacing={10}>
                    <box spacing={15}>
                        <box className="tn-media-art" valign={Gtk.Align.CENTER}><label className="icon-large text-muted" label="󰎆 " /></box>
                        <box vertical={true} valign={Gtk.Align.CENTER} hexpand={true}>
                            <label className="text-header text-left" truncate={true} label={bind(mpris, "players").as(p => p[0]?.title || "Nothing Playing")} />
                            <label className="text-muted text-left" truncate={true} label={bind(mpris, "players").as(p => p[0]?.artist || "Idle")} />
                        </box>
                    </box>
                    {/* Centered Controls */}
                    <box spacing={20} halign={Gtk.Align.CENTER} margin-top={5}>
                        <button className="tn-icon-btn" onClick={() => mpris.players[0]?.previous()}>󰒮</button>
                        <button className="tn-icon-btn play-btn" onClick={() => mpris.players[0]?.play_pause()}>
                            {bind(mpris, "players").as(p => p[0]?.playbackStatus === Mpris.PlaybackStatus.PLAYING ? "󰏤" : "󰐊")}
                        </button>
                        <button className="tn-icon-btn" onClick={() => mpris.players[0]?.next()}>󰒭</button>
                    </box>
                </box>

            </box>
        </window>
    )
}