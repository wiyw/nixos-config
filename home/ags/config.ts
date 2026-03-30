import App from "resource:///com/github/Aylur/ags/app.js";
import ControlCenter from "./ControlCenter.js"; // Always import as .js, even if the file is .tsx!

export default {
    style: App.configDir + "/style.css",
    windows: [
        ControlCenter(), // Initialize our slide-out window
    ],
};