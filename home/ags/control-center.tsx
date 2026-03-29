import { App, Astal, Gtk } from "astal/gtk3"
import { Window, Box, Button, Label } from "astal/gtk3/widget"
import { execAsync } from "astal/process"

// A helper component for our 2x2 grid buttons
function QuickButton({ icon, command }: { icon: string, command: string }) {
    return (
        <Button 
            className="toggle-btn" 
            onClicked={() => execAsync(["bash", "-c", command]).catch(print)}
        >
            <Label label={icon} />
        </Button>
    )
}

export default function ControlCenter() {
    return (
        <Window
            name="control-center"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            marginRight={15}
            marginTop={10}
            layer={Astal.Layer.TOP}
            application={App}
            visible={false} // Hidden by default, triggered by Waybar
        >
            <Box className="control-center" vertical spacing={14}>
                {/* TOP ROW: Quick Settings + Media */}
                <Box spacing={14}>
                    <Box className="quick-settings-pod" vertical spacing={8}>
                        <Box spacing={8}>
                            <QuickButton icon="󰤮" command="nmcli radio wifi toggle" />
                            <QuickButton icon="󰥭" command="rfkill toggle bluetooth" />
                        </Box>
                        <Box spacing={8}>
                            <QuickButton icon="󰝟" command="wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle" />
                            <QuickButton icon="󰌾" command="hyprlock" />
                        </Box>
                    </Box>

                    {/* Media Player Pod */}
                    <Box className="media-pod" vertical spacing={6}>
                        <Box className="media-cover" halign={Gtk.Align.CENTER}>
                            <Label label="♪" css="font-size: 32px;" />
                        </Box>
                        <Label className="media-title" label="No Media Playing" truncate />
                        <Label className="media-artist" label="—" truncate />
                        
                        <Box className="media-controls" spacing={8} halign={Gtk.Align.CENTER}>
                            <Button className="media-btn" onClicked={() => execAsync("playerctl previous")}>
                                <Label label="󰒮" />
                            </Button>
                            <Button className="media-btn play-btn" onClicked={() => execAsync("playerctl play-pause")}>
                                <Label label="▶" />
                            </Button>
                            <Button className="media-btn" onClicked={() => execAsync("playerctl next")}>
                                <Label label="󰒭" />
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* SLIDERS POD */}
                <Box className="sliders-pod" vertical spacing={8}>
                    <Box spacing={12}>
                        <Label label="🔊" />
                        <Label label="Volume" />
                    </Box>
                    <Box spacing={12}>
                        <Label label="☀" />
                        <Label label="Brightness" />
                    </Box>
                </Box>

                {/* NOTIFICATIONS POD */}
                <Box className="notifications-pod" vertical spacing={8} vexpand>
                    <Label className="notif-header" label="NOTIFICATIONS" halign={Gtk.Align.START} />
                    <Label label="No new notifications" halign={Gtk.Align.CENTER} />
                </Box>
            </Box>
        </Window>
    )
}