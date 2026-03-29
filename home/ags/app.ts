import { App } from "astal/gtk3";
import ControlCenter from "./control-center";

App.start({
    style: "./style.css",
    requestHandler(request, res) {
        if (request === "toggle-control-center") {
            const win = App.get_window("control-center")
            if (win) {
                win.visible = !win.visible
                res("Toggled window")
            } else {
                res("Window not found")
            }
        }
    },
    main() {
        ControlCenter()
    }
})