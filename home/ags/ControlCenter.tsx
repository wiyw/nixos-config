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
            visible={true}
            application={app}
        >
            <box class="tn-container" orientation={Gtk.Orientation.VERTICAL} spacing={15}>
                <box class="tn-panel" spacing={15}>
                    <box class="tn-profile-pic" valign={Gtk.Align.CENTER}>
                        <label class="icon-large" label=" " />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand={true}>
                        <label class="text-header" label="NixOS" />
                        <label class="text-muted" label="Hyprland Session" />
                    </box>
                    <button class="tn-icon-btn destructive" onClicked={() => exec("systemctl poweroff")}>
                        <label label=" " />
                    </button>
                </box>
                
                <box spacing={12} homogeneous={true}>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={5} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label=" " />
                            <label class="text-bold" label="WiFi" />
                        </box>
                    </button>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={5} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label=" " />
                            <label class="text-bold" label="Bluetooth" />
                        </box>
                    </button>
                </box>
                
                <box spacing={12} homogeneous={true}>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={5} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label="󰍭 " />
                            <label class="text-bold" label="Mic" />
                        </box>
                    </button>
                    <button class="tn-toggle">
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={5} halign={Gtk.Align.CENTER}>
                            <label class="toggle-icon" label="󰁹" />
                            <label class="text-bold" label="Battery" />
                        </box>
                    </button>
                </box>

                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box spacing={12}>
                        <label class="slider-icon" label="󰃠 " />
                    </box>
                    <box spacing={12}>
                        <label class="slider-icon" label="󰕾" />
                    </box>
                </box>

                <box class="tn-panel" orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                    <box spacing={15}>
                        <box class="tn-media-art" valign={Gtk.Align.CENTER}><label class="icon-large text-muted" label="󰎆 " /></box>
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand={true}>
                            <label class="text-header" label="Nothing Playing" />
                            <label class="text-muted" label="Idle" />
                        </box>
                    </box>
                    <box spacing={20} halign={Gtk.Align.CENTER}>
                        <button class="tn-icon-btn" onClicked={() => exec("playerctl previous")}>󰒮</button>
                        <button class="tn-icon-btn play-btn" onClicked={() => exec("playerctl play-pause")}>󰐊</button>
                        <button class="tn-icon-btn" onClicked={() => exec("playerctl next")}>󰒭</button>
                    </box>
                </box>
            </box>
        </window>
    )
}
