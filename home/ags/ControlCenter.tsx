import { App, Astal, Gtk } from "astal/gtk3"
import { Variable, bind } from "astal"
import { exec, execAsync } from "astal/process"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Bluetooth from "gi://AstalBluetooth"

// --- Brightness Logic ---
// We create a reactive variable that reads your screen brightness
const getBrightness = () => {
    try {
        const current = Number(exec("brightnessctl g"))
        const max = Number(exec("brightnessctl m"))
        return current / max
    } catch {
        return 0
    }
}
const brightness = Variable(getBrightness())

export default function ControlCenter() {
    // --- Initialize System Services ---
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    const network = Network.get_default()
    const bluetooth = Bluetooth.get_default()

    return (
        <window
            name="control-center"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            margin={15}
            visible={false}
            application={App}
        >
            <box className="control-center-container" vertical={true} spacing={15}>
                
                {/* Top Grid: Connectivity & Toggles */}
                <box className="module-row" spacing={15}>
                    
                    {/* Wi-Fi Card */}
                    <box className="module-card square-card" vertical={true}>
                        <label 
                            className="icon-large" 
                            label={bind(network.wifi, "ssid").as(ssid => ssid ? " " : "󰖪 ")} 
                        />
                        <label className="text-bold" label="Wi-Fi" />
                        <label 
                            className="text-sub" 
                            label={bind(network.wifi, "ssid").as(ssid => ssid || "Disconnected")} 
                        />
                    </box>

                    {/* Bluetooth Card */}
                    <box className="module-card square-card" vertical={true}>
                        <label 
                            className="icon-large" 
                            label={bind(bluetooth, "isPowered").as(on => on ? " " : "󰂲 ")} 
                        />
                        <label className="text-bold" label="Bluetooth" />
                        <label 
                            className="text-sub" 
                            label={bind(bluetooth, "isPowered").as(on => on ? "On" : "Off")} 
                        />
                    </box>
                </box>

                {/* Bottom Stack: Sliders */}
                <box className="module-card" vertical={true} spacing={15}>
                    
                    {/* Brightness Slider */}
                    <box className="slider-box" spacing={10}>
                        <label label="󰃠 " className="icon" />
                        <slider
                            className="macos-slider"
                            hexpand={true}
                            drawValue={false}
                            value={bind(brightness)}
                            onDragged={({ value }) => {
                                // Update system brightness, then update our UI variable
                                execAsync(`brightnessctl set ${Math.floor(value * 100)}%`)
                                brightness.set(value)
                            }}
                        />
                    </box>
                    
                    {/* Volume Slider */}
                    <box className="slider-box" spacing={10}>
                        <label 
                            className="icon"
                            label={bind(speaker, "volume").as(v => v > 0.5 ? "󰕾 " : v > 0 ? "󰖀 " : "󰝟 ")} 
                        />
                        <slider
                            className="macos-slider"
                            hexpand={true}
                            drawValue={false}
                            value={bind(speaker, "volume")}
                            onDragged={({ value }) => speaker.volume = value}
                        />
                    </box>
                </box>

            </box>
        </window>
    )
}