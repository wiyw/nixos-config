import app from "ags/gtk4/app"
import { Gtk, Gdk, Astal } from "ags/gtk4"

const { exec, spawn } = (await import("ags/process"))

app.start({
    css: `
        * {
            font-family: "JetBrainsMono Nerd Font", sans-serif;
            font-size: 13px;
            color: #ffffff;
        }

        window#control-center {
            background-color: rgba(36, 40, 59, 0.7);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .control-center {
            padding: 16px;
        }

        .quick-settings-pod {
            background-color: rgba(30, 32, 48, 0.6);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 12px;
        }

        .toggle-btn {
            min-width: 60px;
            min-height: 50px;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            border: none;
            color: #565f89;
            font-size: 20px;
        }

        .toggle-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }

        .media-pod {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 12px;
            min-width: 140px;
        }

        .media-cover {
            border-radius: 12px;
            background-color: rgba(0, 0, 0, 0.3);
        }

        .media-title {
            font-weight: 600;
            font-size: 13px;
            color: #ffffff;
        }

        .media-artist {
            font-size: 11px;
            color: #a9b1d6;
        }

        .media-btn {
            background: none;
            border: none;
            color: #c0caf5;
            font-size: 18px;
        }

        .media-btn:hover {
            color: #ffffff;
        }

        .play-btn {
            font-size: 24px;
        }

        .sliders-pod {
            background-color: rgba(30, 32, 48, 0.6);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 16px;
        }

        .slider-row label {
            font-size: 16px;
            color: #c0caf5;
            min-width: 24px;
        }

        .notifications-pod {
            background-color: rgba(30, 32, 48, 0.6);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 12px;
        }

        .notif-header {
            font-weight: 600;
            color: #a9b1d6;
            margin-bottom: 8px;
        }

        .notification {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 10px;
        }
    `,

    main() {
        const ControlCenter = (
            <window
                name="control-center"
                anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
                margin="10 45 10 0"
                width={380}
                height={600}
                layer={Astal.Layer.TOP}
                exclusivity={Astal.Exclusivity.AUTO}
                visible={false}
                application={app}
            >
                <box class="control-center" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                    <box class="quick-settings-pod" homogeneous>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={8} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <box spacing={8}>
                                <button class="toggle-btn" onClicked={() => exec("nmcli radio wifi toggle")}>
                                    <label label="󰤯" />
                                </button>
                                <button class="toggle-btn" onClicked={() => exec("rfkill toggle bluetooth")}>
                                    <label label="󰂯" />
                                </button>
                            </box>
                            <box spacing={8}>
                                <button class="toggle-btn" onClicked={() => exec("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle")}>
                                    <label label="󰝟" />
                                </button>
                                <button class="toggle-btn" onClicked={() => exec("hyprlock")}>
                                    <label label="󰌾" />
                                </button>
                            </box>
                        </box>
                        <box class="media-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8} hexpand valign={Gtk.Align.CENTER}>
                            <box valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER} hexpand vexpand>
                                <box class="media-album">
                                    <image class="media-cover" iconName="audio-x-generic" pixelSize={80} />
                                </box>
                            </box>
                            <label class="media-title" label="No Media" maxWidthChars={20} halign={Gtk.Align.CENTER} />
                            <label class="media-artist" label="—" maxWidthChars={20} halign={Gtk.Align.CENTER} />
                            <box class="media-controls" spacing={8} halign={Gtk.Align.CENTER} homogeneous>
                                <button class="media-btn" onClicked={() => exec("playerctl previous")}>
                                    <label label="󰒮" />
                                </button>
                                <button class="media-btn play-btn" onClicked={() => exec("playerctl play-pause")}>
                                    <label label="󰐊" />
                                </button>
                                <button class="media-btn" onClicked={() => exec("playerctl next")}>
                                    <label label="󰒭" />
                                </button>
                            </box>
                        </box>
                    </box>
                    <box class="sliders-pod" orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                        <box class="slider-row volume" spacing={12} valign={Gtk.Align.CENTER}>
                            <label label="󰕿" />
                            <label label="Use volume keys" />
                        </box>
                        <box class="slider-row brightness" spacing={12} valign={Gtk.Align.CENTER}>
                            <label label="󰛨" />
                            <label label="Use brightness keys" />
                        </box>
                    </box>
                    <box class="notifications-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8} vexpand>
                        <label class="notif-header" label="Notifications" halign={Gtk.Align.START} />
                        <scrollable valign={Gtk.Align.START} hexpand vexpand>
                            <box class="notifications" orientation={Gtk.Orientation.VERTICAL} spacing={8} />
                        </scrollable>
                    </box>
                </box>
            </window>
        )

        app.add_window(ControlCenter)
    },
})
