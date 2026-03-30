import { App } from "astal/gtk3"
import style from "./style.css"
import ControlCenter from "./ControlCenter.js"

App.start({
    css: style,
    main() {
        ControlCenter()
    },
})