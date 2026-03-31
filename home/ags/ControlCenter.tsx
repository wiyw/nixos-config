import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import { createState, createBinding } from "ags"
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

const BluetoothPopup = ({ onClose }: { onClose: () => void }) => (
    <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label class="text-bold" label="Bluetooth Devices" hexpand />
            <button class="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box class="tn-device-item" spacing={12}>
            <label label="󰂯 " />
            <label class="text-bold" label="No devices paired" />
        </box>
        <button class="tn-btn" onClicked={() => exec('bluetoothctl pairable on')}>
            <label label="Enable Pairing" />
        </button>
    </box>
)

const NightLightPopup = ({ onClose }: { onClose: () => void }) => {
    const [temp, setTemp] = createState(4000)
    return (
        <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
            <box spacing={8}>
                <label class="text-bold" label="Night Light" hexpand />
                <button class="tn-close-btn" onClicked={onClose}>
                    <label label="✕" />
                </button>
            </box>
            <scale min={1000} max={10000} value={temp()} onValuePosChanged={(self) => setTemp(self.get_value())} hexpand />
        </box>
    )
}

const ScreenshotPopup = ({ onClose }: { onClose: () => void }) => (
    <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label class="text-bold" label="Screenshot" hexpand />
            <button class="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <button onClicked={() => { exec('grim -g "$(slurp)" -'); onClose() }}>
            <label label="󰑮  Selection" />
        </button>
        <button onClicked={() => { exec('grim -'); onClose() }}>
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

    const renderPopup = () => {
        const popup = activePopup()
        if (!popup) return null
        const popupProps = { onClose: () => setActivePopup(null) }
        switch (popup) {
            case 'wifi': return <WifiPopup {...popupProps} />
            case 'bluetooth': return <BluetoothPopup {...popupProps} />
            case 'nightlight': return <NightLightPopup {...popupProps} />
            case 'screenshot': return <ScreenshotPopup {...popupProps} />
            default: return null
        }
    }

    return (
        <window
            name="control-center"
            namespace="control-center"
            class="ControlCenterWindow"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            margin-top={15}
            margin-right={15}
            visible={true} // Starts visible immediately
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
                        class={createBinding(() => `tn-toggle ${wifiOn() ? 'active' : ''} ${activePopup() === 'wifi' ? 'expanded' : ''}`)} 
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
                        class={createBinding(() => `tn-toggle ${bluetoothOn() ? 'active' : ''} ${activePopup() === 'bluetooth' ? 'expanded' : ''}`)} 
                        onClicked={() => {
                            setBluetoothOn(!bluetoothOn())
                            togglePopup('bluetooth')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label class="toggle-icon" label={createBinding(() => bluetoothOn() ? "󰂯 " : "󰂲 ")} />
                            <label class="text-bold" label="Bluetooth" />
                        </box>
                    </button>
                </box>

                {/* Secondary Toggles */}
                <box spacing={12} homogeneous>
                    <button class={createBinding(() => `tn-toggle ${activePopup() === 'nightlight' ? 'expanded' : ''}`)} onClicked={() => togglePopup('nightlight')}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label class="toggle-icon" label="󰟈 " />
                            <label class="text-bold" label="Night Light" />
                        </box>
                    </button>
                    <button class={createBinding(() => `tn-toggle ${activePopup() === 'screenshot' ? 'expanded' : ''}`)} onClicked={() => togglePopup('screenshot')}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label class="toggle-icon" label="󰑮 " />
                            <label class="text-bold" label="Screenshot" />
                        </box>
                    </button>
                </box>

                {/* Popups Area */}
                <box class="tn-popup-container">
                    {createBinding(() => renderPopup())}
                </box>

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

                {/* Media */}
                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} hexpand>
                        <box class="tn-media-art" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label class="icon-large" label="󰎆 " />
                        </box>
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                            <label class="text-header" label="Nothing Playing" xalign={0} />
                            <label class="text-muted" label="Idle" xalign={0} />
                        </box>
                    </box>
                    <box spacing={24} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <button class="tn-icon-btn" onClicked={() => exec("playerctl previous")}>
                            <label label="󰒮 " />
                        </button>
                        <label class="play-btn" label="󰐊 " />
                        <button class="tn-icon-btn" onClicked={() => exec("playerctl next")}>
                            <label label="󰒭 " />
                        </button>
                    </box>
                </box>
            </box>
        </window>
    )
}

export default ControlCenterWindow