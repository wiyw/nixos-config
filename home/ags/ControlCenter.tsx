import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import { createState } from "ags"
import app from "ags/gtk4/app"

type PopupType = 'wifi' | 'bluetooth' | 'nightlight' | 'screenshot' | null

const WifiPopup = ({ onClose }: { onClose: () => void }) => (
    <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label class="text-bold" label="WiFi Networks" hexpand />
            <button class="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box class="tn-network-item" spacing={12}>
            <label label="󰤨 " />
            <label class="text-bold" label="Connected" />
        </box>
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
            margin-top={15}
            margin-right={15}
            visible={false}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box class="tn-container" orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                {/* Header */}
                <box spacing={15}>
                    <box class="tn-profile-pic" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <label class="icon-large" label="󰒓 " />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                        <label class="text-header" label="Greyson" xalign={0} />
                        <label class="text-muted" label="NixOS" xalign={0} />
                    </box>
                    <button class="tn-icon-btn destructive" onClicked={() => exec("systemctl poweroff")}>
                        <label label="󰐥 " />
                    </button>
                </box>

                {/* Quick Toggles */}
                <box spacing={12} homogeneous>
                    <button 
                        class={createBinding(() => `tn-toggle ${wifiOn() ? 'active' : ''}`)} 
                        onClicked={() => {
                            setWifiOn(!wifiOn())
                            togglePopup('wifi')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label class="toggle-icon" label={createBinding(() => wifiOn() ? "󰤯 " : "󰤮 ")} />
                            <label class="text-bold" label="WiFi" />
                        </box>
                    </button>
                    
                    <button 
                        class={createBinding(() => `tn-toggle ${bluetoothOn() ? 'active' : ''}`)} 
                        onClicked={() => setBluetoothOn(!bluetoothOn())}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label class="toggle-icon" label={createBinding(() => bluetoothOn() ? "󰂯 " : "󰂲 ")} />
                            <label class="text-bold" label="Bluetooth" />
                        </box>
                    </button>
                </box>

                {/* Popups Area */}
                {createBinding(() => activePopup() === 'wifi' && <WifiPopup onClose={() => setActivePopup(null)} />)}

                {/* Sliders */}
                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10}>
                        <label class="slider-icon" label="󰝀 " />
                        <scale hexpand min={0} max={100} value={volume()} onValuePosChanged={(self) => setVolume(self.get_value())} />
                    </box>
                    <box spacing={10}>
                        <label class="slider-icon" label="󰛨 " />
                        <scale hexpand min={0} max={100} value={brightness()} onValuePosChanged={(self) => setBrightness(self.get_value())} />
                    </box>
                </box>
            </box>
        </window>
    )
}

export default ControlCenterWindow