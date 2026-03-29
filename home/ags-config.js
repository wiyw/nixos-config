import app from "ags/gtk4/app"
import { Gtk, Gdk, Astal } from "ags/gtk4"

const { exec, spawn } = (await import("ags/process"))

app.start({
    requestHandler(request) {
        const win = app.get_window("control-center")
        if (win) {
            win.visible = !win.visible
        }
    },
    css: `
        * {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 13px;
            color: #ffffff;
        }

        window#control-center {
            background-color: rgba(30, 30, 30, 0.85);
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .control-center {
            padding: 14px;
        }

        .quick-settings-pod {
            background: linear-gradient(135deg, rgba(60, 60, 60, 0.9), rgba(40, 40, 40, 0.9));
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 10px;
        }

        .toggle-btn {
            background: linear-gradient(180deg, rgba(80, 80, 80, 0.8), rgba(60, 60, 60, 0.8));
            border-radius: 12px;
            border: none;
            color: #ffffff;
            font-size: 18px;
            padding: 8px;
        }

        .toggle-btn:hover {
            background: linear-gradient(180deg, rgba(100, 100, 100, 0.9), rgba(80, 80, 80, 0.9));
        }

        .toggle-btn.active {
            background: linear-gradient(180deg, #007AFF, #0056CC);
        }

        .media-pod {
            background: linear-gradient(180deg, rgba(70, 70, 70, 0.9), rgba(50, 50, 50, 0.9));
            border-radius: 14px;
            padding: 12px;
            min-width: 130px;
        }

        .media-cover {
            border-radius: 10px;
            background: linear-gradient(45deg, #2a2a2a, #3a3a3a);
            min-width: 80px;
            min-height: 80px;
        }

        .media-title {
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
        }

        .media-artist {
            font-size: 12px;
            color: #a0a0a0;
        }

        .media-btn {
            background: transparent;
            border: none;
            color: #ffffff;
            font-size: 16px;
            padding: 6px 10px;
            border-radius: 20px;
        }

        .media-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .play-btn {
            font-size: 22px;
            background: #007AFF;
            border-radius: 50%;
            margin: 0 4px;
        }

        .play-btn:hover {
            background: #0056CC;
        }

        .sliders-pod {
            background: linear-gradient(135deg, rgba(60, 60, 60, 0.9), rgba(40, 40, 40, 0.9));
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 14px;
        }

        .slider-row {
            padding: 6px 0;
        }

        .slider-row label {
            font-size: 18px;
            color: #ffffff;
            min-width: 28px;
        }

        .notifications-pod {
            background: linear-gradient(135deg, rgba(60, 60, 60, 0.9), rgba(40, 40, 40, 0.9));
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 12px;
        }

        .notif-header {
            font-weight: 600;
            font-size: 12px;
            color: #a0a0a0;
            margin-bottom: 10px;
        }

        .notification {
            background: rgba(50, 50, 50, 0.6);
            border-radius: 10px;
            padding: 10px;
        }
    `,

    main() {
        const ControlCenter = (
            <window
                name="control-center"
                anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
                margin="10 45 10 0"
                defaultWidth={360}
                defaultHeight={520}
                layer={Astal.Layer.TOP}
                exclusivity={Astal.Exclusivity.AUTO}
                visible={true}
                application={app}
            >
                <box class="control-center" orientation={Gtk.Orientation.VERTICAL} spacing={14}>
                    <box class="quick-settings-pod" homogeneous>
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={8} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                            <box spacing={8}>
                                <button class="toggle-btn" onClicked={() => exec("nmcli radio wifi toggle")}>
                                    <label label="󰤮" />
                                </button>
                                <button class="toggle-btn" onClicked={() => exec("rfkill toggle bluetooth")}>
                                    <label label="󰥭" />
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
                        <box class="media-pod" orientation={Gtk.Orientation.VERTICAL} spacing={6} hexpand valign={Gtk.Align.CENTER}>
                            <box class="media-cover" halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
                                <label label="♪" font_size={32} />
                            </box>
                            <label class="media-title" label="No Media Playing" maxWidthChars={18} truncate ellipsize="middle" halign={Gtk.Align.CENTER} />
                            <label class="media-artist" label="— " maxWidthChars={18} truncate ellipsize="middle" halign={Gtk.Align.CENTER} />
                            <box class="media-controls" spacing={4} halign={Gtk.Align.CENTER} homogeneous>
                                <button class="media-btn" onClicked={() => exec("playerctl previous")}>
                                    <label label="󰒮" />
                                </button>
                                <button class="media-btn play-btn" onClicked={() => exec("playerctl play-pause")}>
                                    <label label="▶" />
                                </button>
                                <button class="media-btn" onClicked={() => exec("playerctl next")}>
                                    <label label="󰒭" />
                                </button>
                            </box>
                        </box>
                    </box>
                    <box class="sliders-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                        <box class="slider-row" orientation={Gtk.Orientation.HORIZONTAL} spacing={12} valign={Gtk.Align.CENTER}>
                            <label label="🔊" />
                            <label label="Volume" hexpand halign={Gtk.Align.START} />
                        </box>
                        <box class="slider-row" orientation={Gtk.Orientation.HORIZONTAL} spacing={12} valign={Gtk.Align.CENTER}>
                            <label label="☀" />
                            <label label="Brightness" hexpand halign={Gtk.Align.START} />
                        </box>
                    </box>
                    <box class="notifications-pod" orientation={Gtk.Orientation.VERTICAL} spacing={8} vexpand>
                        <label class="notif-header" label="NOTIFICATIONS" halign={Gtk.Align.START} />
                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
                            <label label="No new notifications" color="rgba(160,160,160,0.8)" halign={Gtk.Align.CENTER} />
                        </box>
                    </box>
                </box>
            </window>
        )

        app.add_window(ControlCenter)
    },
})
