import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import { createState } from "ags" // Removed createBinding
import app from "ags/gtk4/app"

type PopupType = 'wifi' | 'bluetooth' | 'nightlight' | 'screenshot' | null

const WifiPopup = ({ onClose }: { onClose: () => void }) => (
    <box className="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label className="text-bold" label="WiFi Networks" hexpand />
            <button className="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box className="tn-network-item" spacing={12}>
            <label label="󰤨 " />
            <label className="text-bold" label="Connected" />
        </box>
    </box>
)

const BluetoothPopup = ({ onClose }: { onClose: () => void }) => (
    <box className="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label className="text-bold" label="Bluetooth Devices" hexpand />
            <button className="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box className="tn-device-item" spacing={12}>
            <label label="󰂯 " />
            <label className="text-bold" label="No devices paired" />
        </box>
        <button className="tn-btn" onClicked={() => exec('bluetoothctl pairable on')}>
            <label label="Enable Pairing" />
        </button>
    </box>
)

const NightLightPopup = ({ onClose }: { onClose: () => void }) => {
    const [temp, setTemp] = createState(4000)
    return (
        <box className="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box spacing={8}>
                <label className="text-bold" label="Night Light" hexpand />
                <button className="tn-close-btn" onClicked={onClose}>
                    <label label="✕" />
                </button>
            </box>
            <scale min={1000} max={10000} value={temp()} onValuePosChanged={(self) => setTemp(self.get_value())} hexpand />
        </box>
    )
}

const ScreenshotPopup = ({ onClose }: { onClose: () => void }) => (
    <box className="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label className="text-bold" label="Screenshot" hexpand />
            <button className="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <button className="tn-btn" onClicked={() => { exec('grim -g "$(slurp)" -'); onClose() }}>
            <label label="󰑮  Selection" />
        </button>
        <button className="tn-btn" onClicked={() => { exec('grim -'); onClose() }}>
            <label label="󰑯  Full Screen" />
        </button>
    </box>
)

const ControlCenterWindow = () => {
    const [wifiOn, setWifiOn] = createState(true)
    const [bluetoothOn, setBluetoothOn] = createState(false)
    const [volume, setVolume] = createState(50)
    const [brightness, setBrightness] = createState(80)
    const [activePopup, setActivePopup] = createState<PopupType>(null)

    const togglePopup = (popup: PopupType) => {
        setActivePopup(activePopup() === popup ? null : popup)
    }

    return (
        <window
            name="control-center"
            namespace="control-center"
            className="ControlCenterWindow"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={15}
            marginRight={15}
            visible={true} // Starts visible immediately so you can see it on `ags run`
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box className="tn-container" orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                {/* Header */}
                <box spacing={15}>
                    <box className="tn-profile-pic" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <label className="icon-large" label="󰒓 " />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                        <label className="text-header" label="Greyson" xalign={0} />
                        <label className="text-muted" label="NixOS" xalign={0} />
                    </box>
                    <button className="tn-icon-btn destructive" onClicked={() => exec("systemctl poweroff")}>
                        <label label="󰐥 " />
                    </button>
                </box>

                {/* Quick Toggles */}
                <box spacing={12} homogeneous>
                    <button 
                        className={() => `tn-toggle ${wifiOn() ? 'active' : ''} ${activePopup() === 'wifi' ? 'expanded' : ''}`} 
                        onClicked={() => {
                            setWifiOn(!wifiOn())
                            togglePopup('wifi')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label className="toggle-icon" label={() => wifiOn() ? "󰤯 " : "󰤮 "} />
                            <label className="text-bold" label="WiFi" />
                        </box>
                    </button>
                    
                    <button 
                        className={() => `tn-toggle ${bluetoothOn() ? 'active' : ''} ${activePopup() === 'bluetooth' ? 'expanded' : ''}`} 
                        onClicked={() => {
                            setBluetoothOn(!bluetoothOn())
                            togglePopup('bluetooth')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label className="toggle-icon" label={() => bluetoothOn() ? "󰂯 " : "󰂲 "} />
                            <label className="text-bold" label="Bluetooth" />
                        </box>
                    </button>
                </box>

                {/* Secondary Toggles */}
                <box spacing={12} homogeneous>
                    <button className={() => `tn-toggle ${activePopup() === 'nightlight' ? 'expanded' : ''}`} onClicked={() => togglePopup('nightlight')}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label className="toggle-icon" label="󰟈 " />
                            <label className="text-bold" label="Night Light" />
                        </box>
                    </button>
                    <button className={() => `tn-toggle ${activePopup() === 'screenshot' ? 'expanded' : ''}`} onClicked={() => togglePopup('screenshot')}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label className="toggle-icon" label="󰑮 " />
                            <label className="text-bold" label="Screenshot" />
                        </box>
                    </button>
                </box>

                {/* Popups Area - AGS v3 Fix: Render all, toggle visibility */}
                <box className="tn-popup-container">
                    <box visible={() => activePopup() === 'wifi'}><WifiPopup onClose={() => setActivePopup(null)} /></box>
                    <box visible={() => activePopup() === 'bluetooth'}><BluetoothPopup onClose={() => setActivePopup(null)} /></box>
                    <box visible={() => activePopup() === 'nightlight'}><NightLightPopup onClose={() => setActivePopup(null)} /></box>
                    <box visible={() => activePopup() === 'screenshot'}><ScreenshotPopup onClose={() => setActivePopup(null)} /></box>
                </box>

                {/* Sliders */}
                <box className="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10}>
                        <label className="slider-icon" label="󰝀 " />
                        <scale hexpand min={0} max={100} value={volume()} onValuePosChanged={(self) => setVolume(self.get_value())} />
                    </box>
                    <box spacing={10}>
                        <label className="slider-icon" label="󰛨 " />
                        <scale hexpand min={0} max={100} value={brightness()} onValuePosChanged={(self) => setBrightness(self.get_value())} />
                    </box>
                </box>

                {/* Media */}
                <box className="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} hexpand>
                        <box className="tn-media-art" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label className="icon-large" label="󰎆 " />
                        </box>
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                            <label className="text-header" label="Nothing Playing" xalign={0} />
                            <label className="text-muted" label="Idle" xalign={0} />
                        </box>
                    </box>
                    <box spacing={24} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <button className="tn-icon-btn" onClicked={() => exec("playerctl previous")}>
                            <label label="󰒮 " />
                        </button>
                        <label className="play-btn" label="󰐊 " />
                        <button className="tn-icon-btn" onClicked={() => exec("playerctl next")}>
                            <label label="󰒭 " />
                        </button>
                    </box>
                </box>
            </box>
        </window>
    )
}

export default ControlCenterWindow