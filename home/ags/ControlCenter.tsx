import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import { Variable, bind } from "ags"
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
    const temp = Variable(4000)
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
                onValueChanged={(self) => temp.set(self.get_value())} 
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
    // 1. Initialize State using standard Astal Variables
    const wifiOn = Variable(true)
    const bluetoothOn = Variable(false)
    const volume = Variable(50)
    const brightness = Variable(80)
    const activePopup = Variable<PopupType>(null)

    // Helper to toggle popups
    const togglePopup = (popup: PopupType) => {
        activePopup.set(activePopup.get() === popup ? null : popup)
    }

    // 2. Derive complex CSS classes so GTK gets a clean Array of Strings
    const wifiClasses = Variable.derive([wifiOn, activePopup], (on, popup) => 
        ["tn-toggle", on ? "active" : "", popup === 'wifi' ? "expanded" : ""].filter(Boolean)
    )
    
    const btClasses = Variable.derive([bluetoothOn, activePopup], (on, popup) => 
        ["tn-toggle", on ? "active" : "", popup === 'bluetooth' ? "expanded" : ""].filter(Boolean)
    )

    return (
        <window
            name="control-center"
            namespace="control-center"
            cssClasses={["ControlCenterWindow"]}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginTop={15}
            marginRight={15}
            visible={true} // Still leaving this true so we can verify it renders instantly
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
                        cssClasses={bind(wifiClasses)} 
                        onClicked={() => {
                            wifiOn.set(!wifiOn.get())
                            togglePopup('wifi')
                        }}
                    >
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <label cssClasses={["toggle-icon"]} label={bind(wifiOn).as(on => on ? "󰤯 " : "󰤮 ")} />
                            <label cssClasses={["text-bold"]} label="WiFi" />
                        </box>
                    </button>
                    
                    <button 
                        cssClasses={bind(btClasses)} 
                        onClicked={() => {
                            bluetoothOn.set(!bluetoothOn.get())
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
                    <box visible={bind(activePopup).as(p => p === 'wifi')}><WifiPopup onClose={() => activePopup.set(null)} /></box>
                    <box visible={bind(activePopup).as(p => p === 'bluetooth')}><BluetoothPopup onClose={() => activePopup.set(null)} /></box>
                    <box visible={bind(activePopup).as(p => p === 'nightlight')}><NightLightPopup onClose={() => activePopup.set(null)} /></box>
                    <box visible={bind(activePopup).as(p => p === 'screenshot')}><ScreenshotPopup onClose={() => activePopup.set(null)} /></box>
                </box>

                {/* Sliders */}
                <box cssClasses={["tn-panel"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰝀 " />
                        <scale hexpand min={0} max={100} value={bind(volume)} onValueChanged={(self) => volume.set(self.get_value())} />
                    </box>
                    <box spacing={10}>
                        <label cssClasses={["slider-icon"]} label="󰛨 " />
                        <scale hexpand min={0} max={100} value={bind(brightness)} onValueChanged={(self) => brightness.set(self.get_value())} />
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