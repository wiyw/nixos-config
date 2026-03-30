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
            <box className="control-center-container" vertical={true}>
                <label className="header" label="Control Center" />
                
                {/* Volume Slider Section */}
                <box className="slider-box">
                    <label label="󰕾 " className="icon" />
                    <slider
                        className="volume-slider"
                        hexpand={true}
                        drawValue={false}
                        value={0.5}
                        onDragged={({ value }) => print(`Slider moved: ${value}`)}
                    />
                </box>
            </box>
        </window>
    )
}