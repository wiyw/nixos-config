import Widget from "resource:///com/github/Aylur/ags/widget.js";

export default () => (
    <Widget.Window
        name="control-center"
        anchor={["top", "right"]}   // Snap to top right
        margins={[10, 15]}          // Push it away from the screen edges
        exclusivity="normal"
        keymode="on-demand"
        visible={false}             // Keep it hidden until Waybar calls it
    >
        <Widget.Box
            className="control-center-container"
            vertical={true}
        >
            <Widget.Label
                className="header"
                label="Control Center"
            />
            
            {/* Volume Slider Section */}
            <Widget.Box className="slider-box">
                <Widget.Label label="󰕾 " className="icon" />
                <Widget.Slider
                    className="volume-slider"
                    hexpand={true}
                    drawValue={false}
                    min={0}
                    max={100}
                    value={50}
                    onChange={({ value }) => print(`Slider moved to ${value}`)}
                />
            </Widget.Box>
        </Widget.Box>
    </Widget.Window>
);