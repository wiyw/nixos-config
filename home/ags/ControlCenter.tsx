import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import { createBinding, createState } from "ags"
import app from "ags/gtk4/app"

type PopupType = 'wifi' | 'bluetooth' | 'nightlight' | 'screenshot' | null

const WifiPopup = ({ onClose }: { onClose: () => void }) => (
    <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label class="text-bold" label="WiFi Networks" />
            <button class="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <box class="tn-network-item" spacing={12}>
            <label label="󰤨 " />
            <label class="text-bold" label="Home Network" />
            <label class="text-muted" label="Connected" />
        </box>
        <box class="tn-network-item" spacing={12}>
            <label label="󰤨 " />
            <label class="text-bold" label="Office WiFi" />
        </box>
        <box class="tn-network-item" spacing={12}>
            <label label="󰤨 " />
            <label class="text-bold" label="Guest Network" />
        </box>
    </box>
)

const BluetoothPopup = ({ onClose }: { onClose: () => void }) => (
    <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label class="text-bold" label="Bluetooth Devices" />
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
                <label class="text-bold" label="Night Light" />
                <button class="tn-close-btn" onClicked={onClose}>
                    <label label="✕" />
                </button>
            </box>
            <box spacing={12}>
                <label class="slider-icon" label="󰭿 " />
                <label class="text-bold" label="Temperature" />
                <label class="text-muted" label={`${temp()}K`} />
            </box>
            <scale min={1000} max={10000} value={temp()} onChange={(self) => setTemp(Math.round(self.value))} hexpand={true} />
            <button class="tn-btn" onClicked={() => exec('hyprctl keyword plugin "nightlight enabled true"')}>
                <label label="Enable" />
            </button>
        </box>
    )
}

const ScreenshotPopup = ({ onClose }: { onClose: () => void }) => (
    <box class="tn-popup" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
        <box spacing={8}>
            <label class="text-bold" label="Screenshot" />
            <button class="tn-close-btn" onClicked={onClose}>
                <label label="✕" />
            </button>
        </box>
        <button class="tn-btn" onClicked={() => { exec('grim -g "$(slurp)" -'); onClose() }}>
            <label label="󰑮  Selection" />
        </button>
        <button class="tn-btn" onClicked={() => { exec('grim -'); onClose() }}>
            <label label="󰑯  Full Screen" />
        </button>
        <button class="tn-btn" onClicked={() => { exec('wayrecorder'); onClose() }}>
            <label label="󰑱  Record" />
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
            margin={15}
            visible={true}
            application={app}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.TOP}
        >
            <box class="tn-container" orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                <box spacing={15} hexpand={true}>
                    <box class="tn-profile-pic" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                        <label class="icon-large" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} label="󰒓 " />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand={true}>
                        <label class="text-header" label="Greyson" />
                        <label class="text-muted" label="NixOS" />
                    </box>
                    <button class="tn-icon-btn destructive" halign={Gtk.Align.END} valign={Gtk.Align.CENTER} onClicked={() => exec("systemctl poweroff")}>
                        <label label="󰐥 " />
                    </button>
                </box>

                <box spacing={12} homogeneous={true}>
                    <button class={`tn-toggle ${wifiOn() ? 'active' : ''} ${activePopup() === 'wifi' ? 'expanded' : ''}`} onClicked={() => {
                        const newVal = !wifiOn()
                        setWifiOn(newVal)
                        exec(newVal ? 'nmcli radio wifi on' : 'nmcli radio wifi off')
                        togglePopup('wifi')
                    }}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" halign={Gtk.Align.CENTER} label={wifiOn() ? "󰤯 " : "󰤮 "} />
                            <label class="text-bold" label="WiFi" />
                        </box>
                    </button>
                    <button class={`tn-toggle ${bluetoothOn() ? 'active' : ''} ${activePopup() === 'bluetooth' ? 'expanded' : ''}`} onClicked={() => {
                        const newVal = !bluetoothOn()
                        setBluetoothOn(newVal)
                        exec(newVal ? 'bluetoothctl power on' : 'bluetoothctl power off')
                        togglePopup('bluetooth')
                    }}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" halign={Gtk.Align.CENTER} label={bluetoothOn() ? "󰂯 " : "󰂲 "} />
                            <label class="text-bold" label="Bluetooth" />
                        </box>
                    </button>
                </box>

                <box spacing={12} homogeneous={true}>
                    <button class={`tn-toggle ${activePopup() === 'nightlight' ? 'expanded' : ''}`} onClicked={() => togglePopup('nightlight')}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" halign={Gtk.Align.CENTER} label="󰟈 " />
                            <label class="text-bold" label="Night Light" />
                        </box>
                    </button>
                    <button class={`tn-toggle ${activePopup() === 'screenshot' ? 'expanded' : ''}`} onClicked={() => togglePopup('screenshot')}>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" halign={Gtk.Align.CENTER} label="󰑮 " />
                            <label class="text-bold" label="Screenshot" />
                        </box>
                    </button>
                </box>

                {activePopup() && (
                    <box class="tn-popup-container">
                        {renderPopup()}
                    </box>
                )}

                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={14}>
                    <box spacing={12}>
                        <label class="slider-icon" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} label="󰝀 " />
                        <label class="text-bold" halign={Gtk.Align.START} label="Volume" />
                        <label class="text-muted" halign={Gtk.Align.END} label={`${volume()}%`} />
                    </box>
                    <scale min={0} max={100} value={volume()} onChange={(self) => {
                        const val = Math.round(self.value)
                        setVolume(val)
                        exec(`wpctl set-volume @DEFAULT_AUDIO_SINK@ ${val}%`)
                    }} hexpand={true} />
                    
                    <box spacing={12}>
                        <label class="slider-icon" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} label="󰛨 " />
                        <label class="text-bold" halign={Gtk.Align.START} label="Brightness" />
                        <label class="text-muted" halign={Gtk.Align.END} label={`${brightness()}%`} />
                    </box>
                    <scale min={0} max={100} value={brightness()} onChange={(self) => {
                        const val = Math.round(self.value)
                        setBrightness(val)
                        exec(`brightnessctl set ${val}%`)
                    }} hexpand={true} />
                </box>

                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={15} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} hexpand={true}>
                        <box class="tn-media-art" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <label class="icon-large" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} label="󰎆 " />
                        </box>
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand={true}>
                            <label class="text-header" halign={Gtk.Align.START} label="Nothing Playing" />
                            <label class="text-muted" halign={Gtk.Align.START} label="Idle" />
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
