import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import { createState, bind } from "ags"
import app from "ags/gtk4/app"

type PopupType = 'wifi' | 'bluetooth' | 'nightlight' | 'screenshot' | null

const WifiPopup = ({ onClose }: { onClose: () => void }) => (
    <box cssClasses={["tn-popup"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label cssClasses={["text-bold"]} label="WiFi Networks" hexpand />
            <button cssClasses={["tn-close-btn"]} onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box cssClasses={["tn-network-item"]} spacing={12}>
            <label label="󰤨 " />
            <label cssClasses={["text-bold"]} label="Connected" />
        </box>
    </box>
)

const BluetoothPopup = ({ onClose }: { onClose: () => void }) => (
    <box cssClasses={["tn-popup"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label cssClasses={["text-bold"]} label="Bluetooth Devices" hexpand />
            <button cssClasses={["tn-close-btn"]} onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box cssClasses={["tn-device-item"]} spacing={12}>
            <label label="󰂯 " />
            <label cssClasses={["text-bold"]} label="No devices paired" />
        </box>
        <button cssClasses={["tn-btn"]} onClicked={() => exec('bluetoothctl pairable on')}>
            <label label="Enable Pairing" />
        </button>
    </box>
)

const NightLightPopup = ({ onClose }: { onClose: () => void }) => {
    const [temp, setTemp] = createState(4000)
    return (
        <box cssClasses={["tn-popup"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box spacing={8}>
                <label cssClasses={["text-bold"]} label="Night Light" hexpand />
                <button cssClasses={["tn-close-btn"]} onClicked={onClose}>
                    <label label="✕" />
                </button>
            </box>
            <scale 
                min={1000} 
                max={10000} 
                value={bind(temp)} 
                onValueChanged={(self) => setTemp(self.get_value())} 
                hexpand 
            />
        </box>
    )
}

const ScreenshotPopup = ({ onClose }: { onClose: () => void }) => (
    <box cssClasses={["tn-popup"]} orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label cssClasses={["text-bold"]} label="Screenshot" hexpand />
            <button cssClasses={["tn-close-btn"]} onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <button cssClasses={["tn-btn"]} onClicked={() => { exec('grim -g "$(slurp)" -'); onClose() }}>
            <label label="󰑮  Selection" />
        </button>
        <button cssClasses={["tn-btn"]} onClicked={() => { exec('grim -'); onClose() }}>
            <label label="󰑯  Full Screen" />
        </button>
    </box>
)

export default function ControlCenterWindow() {
    // 1. Initialize State using AGS v3 createState (SolidJS style)
    const [wifiOn, setWifiOn] = createState(true)
    const [bluetoothOn, setBluetoothOn] = createState(false)
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)
    const [activePopup, setActivePopup] = createState<PopupType>(null)

    // Helper to toggle popups
    const togglePopup = (popup: PopupType) => {
        setActivePopup(activePopup() === popup ? null : popup)
    }

    return (
        <window
            name="control-center"
            namespace="control-center"
            cssClasses={["ControlCenterWindow"]}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={15}
            marginRight={15}
            visible={true}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box cssClasses={["tn-container"]} orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                {/* Header */}
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

                {/* Quick Toggles */}
                <box spacing={12} homogeneous>
                    <button 
                        cssClasses={bind([wifiOn, activePopup], (on, popup) => 
                            ["tn-toggle", on ? "active" : "", popup === 'wifi' ? "expanded" : ""].filter(Boolean)
                        )} 
                        onClicked={() => {
                            setWifiOn(!wifiOn())
                            togglePopup('wifi')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label={bind(wifiOn).as(on => on ? "󰤯 " : "󰤮 ")} />
                            <label cssClasses={["text-bold"]} label="WiFi" />
                        </box>
                    </button>
                    
                    <button 
                        cssClasses={bind([bluetoothOn, activePopup], (on, popup) => 
                            ["tn-toggle", on ? "active" : "", popup === 'bluetooth' ? "expanded" : ""].filter(Boolean)
                        )} 
                        onClicked={() => {
                            setBluetoothOn(!bluetoothOn())
                            togglePopup('bluetooth')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label={bind(bluetoothOn).as(on => on ? "󰂯 " : "󰂲 ")} />
                            <label cssClasses={["text-bold"]} label="Bluetooth" />
                        </box>
                    </button>
                </box>

                {/* Secondary Toggles */}
                <box spacing={12} homogeneous>
                    <button 
                        cssClasses={bind(activePopup).as(p => ["tn-toggle", p === 'nightlight' ? "expanded" : ""].filter(Boolean))} 
                        onClicked={() => togglePopup('nightlight')}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰟈 " />
                            <label cssClasses={["text-bold"]} label="Night Light" />
                        </box>
                    </button>
                    <button 
                        cssClasses={bind(activePopup).as(p => ["tn-toggle", p === 'screenshot' ? "expanded" : ""].filter(Boolean))} 
                        onClicked={() => togglePopup('screenshot')}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label="󰑮 " />
                            <label cssClasses={["text-bold"]} label="Screenshot" />
                        </box>
                    </button>
                </box>

                {/* Popups Area */}
                <box cssClasses={["tn-popup-container"]}>
                    <box visible={bind(activePopup).as(p => p === 'wifi')}><WifiPopup onClose={() => setActivePopup(null)} /></box>
                    <box visible={bind(activePopup).as(p => p === 'bluetooth')}><BluetoothPopup onClose={() => setActivePopup(null)} /></box>
                    <box visible={bind(activePopup).as(p => p === 'nightlight')}><NightLightPopup onClose={() => setActivePopup(null)} /></box>
                    <box visible={bind(activePopup).as(p => p === 'screenshot')}><ScreenshotPopup onClose={() => setActivePopup(null)} /></box>
                </box>

                {/* Sliders */}
                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰝀 " />
                        <scale hexpand min={0} max={100} value={bind(volume)} onValueChanged={(self) => setVolume(self.get_value())} />
                    </box>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰛨 " />
                        <scale hexpand min={0} max={100} value={bind(brightness)} onValueChanged={(self) => setBrightness(self.get_value())} />
                    </box>
                </box>

                {/* Media */}
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