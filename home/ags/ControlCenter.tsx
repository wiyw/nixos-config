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
            <box className="cc-container" vertical={true} spacing={15}>
                
                {/* TOP SECTION: Split Columns */}
                <box spacing={15}>
                    
                    {/* Left Column: 3 Pills */}
                    <box vertical={true} spacing={10} hexpand={true}>
                        {/* Wi-Fi Pill */}
                        <button className={bind(network.wifi, "ssid").as(s => s ? "cc-pill active" : "cc-pill inactive")}>
                            <box spacing={10}>
                                <box className="icon-circle" valign={Gtk.Align.CENTER}><label label=" " /></box>
                                <box vertical={true} valign={Gtk.Align.CENTER}>
                                    <label className="text-bold text-left" label="Wi-Fi" />
                                    <label className="text-sub text-left" label={bind(network.wifi, "ssid").as(s => s || "Disconnected")} />
                                </box>
                            </box>
                        </button>

                        {/* Bluetooth Pill */}
                        <button className={bind(bluetooth, "isPowered").as(p => p ? "cc-pill active" : "cc-pill inactive")}>
                            <box spacing={10}>
                                <box className="icon-circle" valign={Gtk.Align.CENTER}><label label=" " /></box>
                                <box vertical={true} valign={Gtk.Align.CENTER}>
                                    <label className="text-bold text-left" label="Bluetooth" />
                                    <label className="text-sub text-left" label={bind(bluetooth, "isPowered").as(p => p ? "On" : "Off")} />
                                </box>
                            </box>
                        </button>

                        {/* Battery Pill (Replaced AirDrop) */}
                        <button className={bind(bat, "isCharging").as(c => c ? "cc-pill active" : "cc-pill inactive")}>
                            <box spacing={10}>
                                <box className="icon-circle" valign={Gtk.Align.CENTER}>
                                    <label label={bind(bat, "percentage").as(p => p > 0.8 ? "󰁹" : p > 0.4 ? "󰁾" : "󰁺")} />
                                </box>
                                <box vertical={true} valign={Gtk.Align.CENTER}>
                                    <label className="text-bold text-left" label="Battery" />
                                    <label className="text-sub text-left" label={bind(bat, "percentage").as(p => `${Math.floor(p * 100)}%`)} />
                                </box>
                            </box>
                        </button>
                    </box>

                    {/* Right Column: Media & Small Toggles */}
                    <box vertical={true} spacing={10} hexpand={true}>
                        {/* Media Square */}
                        <box className="cc-card media-card" vertical={true} vexpand={true}>
                            <box className="media-art" halign={Gtk.Align.START} />
                            <label className="text-bold text-left" margin-top={10} truncate={true} label={bind(mpris, "players").as(p => p[0]?.title || "Not Playing")} />
                            <label className="text-sub text-left" truncate={true} label={bind(mpris, "players").as(p => p[0]?.artist || "")} />
                            <box spacing={15} halign={Gtk.Align.CENTER} margin-top={10}>
                                <button className="media-btn" onClick={() => mpris.players[0]?.previous()}>󰒮</button>
                                <button className="media-btn" onClick={() => mpris.players[0]?.play_pause()}>
                                    {bind(mpris, "players").as(p => p[0]?.playbackStatus === Mpris.PlaybackStatus.PLAYING ? "󰏤" : "󰐊")}
                                </button>
                                <button className="media-btn" onClick={() => mpris.players[0]?.next()}>󰒭</button>
                            </box>
                        </box>

                        {/* 2 Small Toggles (Replaced Placeholders) */}
                        <box spacing={10}>
                            {/* Mic Toggle */}
                            <button 
                                className={bind(mic, "mute").as(m => m ? "cc-circle-btn inactive" : "cc-circle-btn active")} 
                                hexpand={true}
                                onClick={() => mic.mute = !mic.mute}
                            >
                                <label label={bind(mic, "mute").as(m => m ? "󰍭 " : "󰍬 ")} />
                            </button>

                            {/* Settings / Terminal Launcher */}
                            <button 
                                className="cc-circle-btn inactive" 
                                hexpand={true}
                                onClick={() => execAsync("kitty").catch(print)} 
                            >
                                <label label="󰒓 " />
                            </button>
                        </box>
                    </box>
                </box>

                {/* MIDDLE SECTION: Power Row (Replaced Focus/DND) */}
                <box spacing={10}>
                    <button className="cc-circle-btn inactive" onClick={() => execAsync("systemctl suspend")}><label label="󰤄 " /></button>
                    <button className="cc-circle-btn inactive" onClick={() => execAsync("loginctl lock-session")}><label label="󰌾 " /></button>
                    <button className="cc-pill inactive" hexpand={true} onClick={() => execAsync("systemctl poweroff")}>
                        <box spacing={10}>
                            <box className="icon-circle" valign={Gtk.Align.CENTER}><label label="󰐥 " /></box>
                            <box vertical={true} valign={Gtk.Align.CENTER}>
                                <label className="text-bold text-left" label="Shut Down" />
                                <label className="text-sub text-left" label="System" />
                            </box>
                        </box>
                    </button>
                </box>

                {/* BOTTOM SECTION: Sliders */}
                <box className="cc-card slider-card" vertical={true} spacing={5}>
                    <label className="text-bold text-left" label="Display" />
                    <box spacing={10}>
                        <label label="󰃠 " className="slider-icon" />
                        <slider className="apple-slider" hexpand={true} drawValue={false} value={bind(brightness)} onDragged={({ value }) => { execAsync(`brightnessctl set ${Math.floor(value * 100)}%`); brightness.set(value); }} />
                        <label label="󰃠 " className="slider-icon" />
                    </box>
                </box>

                <box className="cc-card slider-card" vertical={true} spacing={5}>
                    <label className="text-bold text-left" label="Sound" />
                    <box spacing={10}>
                        <label className="slider-icon" label={bind(speaker, "volume").as(v => v > 0.5 ? "󰕾" : v > 0 ? "󰖀" : "󰝟")} />
                        <slider className="apple-slider" hexpand={true} drawValue={false} value={bind(speaker, "volume")} onDragged={({ value }) => speaker.volume = value} />
                        <label label="󰂚 " className="slider-icon" />
                    </box>
                </box>

            </box>
        </window>
    )
}