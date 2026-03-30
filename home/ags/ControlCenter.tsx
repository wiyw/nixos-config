import { App, Astal, Gtk } from "astal/gtk3"

export default function ControlCenter() {
    return (
        <window
            name="control-center"
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            margin={15}
            visible={false}
            application={App}
        >
            <box className="control-center-container" vertical={true} spacing={15}>
                
                {/* Top Grid: Connectivity & Toggles */}
                <box className="module-row" spacing={15}>
                    <box className="module-card square-card" vertical={true}>
                        <label className="icon-large" label=" " />
                        <label className="text-bold" label="Wi-Fi" />
                        <label className="text-sub" label="Connected" />
                    </box>
                    <box className="module-card square-card" vertical={true}>
                        <label className="icon-large" label=" " />
                        <label className="text-bold" label="Bluetooth" />
                        <label className="text-sub" label="On" />
                    </box>
                </box>

                {/* Bottom Stack: Sliders */}
                <box className="module-card" vertical={true} spacing={15}>
                    {/* Brightness */}
                    <box className="slider-box" spacing={10}>
                        <label label="󰃠 " className="icon" />
                        <slider
                            className="macos-slider"
                            hexpand={true}
                            drawValue={false}
                            value={0.8}
                            onDragged={({ value }) => print(`Brightness: ${value}`)}
                        />
                    </box>
                    
                    {/* Volume */}
                    <box className="slider-box" spacing={10}>
                        <label label="󰕾 " className="icon" />
                        <slider
                            className="macos-slider"
                            hexpand={true}
                            drawValue={false}
                            value={0.5}
                            onDragged={({ value }) => print(`Volume: ${value}`)}
                        />
                    </box>
                </box>

            </box>
        </window>
    )
}