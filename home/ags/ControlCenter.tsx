import { Gtk, Astal } from "ags/gtk4"
import { exec } from "ags/process"
import app from "ags/gtk4/app"

export default function ControlCenter() {
    return (
        <window 
            name="control-center" 
            class="ControlCenterWindow"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT} 
            margin={15} 
            visible={false}
            application={app}
            blur={true}
            layer={Astal.Layer.TOP}
        >
            <box class="tn-container" orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                {/* Header */}
                <box class="tn-panel" spacing={15}>
                    <box class="tn-profile-pic" valign={Gtk.Align.CENTER}>
                        <label class="icon-large" label=" " />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand={true}>
                        <label class="text-header" label="NixOS" />
                        <label class="text-muted" label="Hyprland Session" />
                    </box>
                    <button class="tn-icon-btn destructive" onClicked={() => exec("systemctl poweroff")}>
                        <label label="⏻ " />
                    </button>
                </box>
                
                {/* Toggles Row 1 */}
                <box spacing={12} homogeneous={true}>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label="📶 " />
                            <label class="text-bold" label="WiFi" />
                        </box>
                    </button>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label="📟 " />
                            <label class="text-bold" label="Bluetooth" />
                        </box>
                    </button>
                </box>
                
                {/* Toggles Row 2 */}
                <box spacing={12} homogeneous={true}>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label="🎤 " />
                            <label class="text-bold" label="Mic" />
                        </box>
                    </button>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label="🔋 " />
                            <label class="text-bold" label="Battery" />
                        </box>
                    </button>
                </box>

                {/* Sliders */}
                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={14}>
                    <box spacing={12} halign={Gtk.Align.CENTER}>
                        <label class="slider-icon" label="🔊 " />
                        <label class="text-bold" label="Volume" />
                    </box>
                    <box spacing={12} halign={Gtk.Align.CENTER}>
                        <label class="slider-icon" label="☀ " />
                        <label class="text-bold" label="Brightness" />
                    </box>
                </box>

                {/* Media */}
                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={15} halign={Gtk.Align.CENTER} hexpand={true}>
                        <box class="tn-media-art" valign={Gtk.Align.CENTER}>
                            <label class="icon-large" label="♫ " />
                        </box>
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand={true}>
                            <label class="text-header" halign={Gtk.Align.START} label="Nothing Playing" />
                            <label class="text-muted" halign={Gtk.Align.START} label="Idle" />
                        </box>
                    </box>
                    <box spacing={24} halign={Gtk.Align.CENTER}>
                        <button class="tn-icon-btn" onClicked={() => exec("playerctl previous")}>⏮</button>
                        <label class="play-btn" label="▶" />
                        <button class="tn-icon-btn" onClicked={() => exec("playerctl next")}>⏭</button>
                    </box>
                </box>
            </box>
        </window>
    )
}
