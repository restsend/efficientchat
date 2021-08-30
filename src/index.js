

import { createAppUI } from "./components/wacrm/index"
import { defaultConfig } from "./config"
import Clip from "./services/clip"
import "./styles/base.css"

const appID = "restsend_app"

class RestSendApp {
    constructor() {
        this.clip = null
    }

    init(container) {
        const oldApp = document.getElementById('rsapp-container');
        if (oldApp) {
            oldApp.remove();
        }

        this.clip = new Clip()
        let waChatView = this.updateWALayout()
        if (waChatView) {
            const chatRightView = document.createElement("div");
            chatRightView.className = 'rsapp-container'
            chatRightView.id = 'rsapp-container'
            container = chatRightView
            waChatView.after(chatRightView)
        }
        this.insertDOM(container);
    }

    updateWALayout() {
        const waAppRrapper = document.querySelector('#app .app-wrapper-web')
        if (!waAppRrapper) {
            return
        }

        const waChatView = waAppRrapper.querySelector('div .two')
        waAppRrapper.style.display = 'flex';
        waAppRrapper.style.justifyContent = "center";
        waChatView.style.margin = 0;
        return waChatView
    }

    insertDOM(container) {
        const restsend_app = document.createElement("div");
        restsend_app.id = appID;
        const box = container || document.body;
        box.insertBefore(restsend_app, box.firstChild);

        const slot = document.createElement("div");
        restsend_app.insertBefore(slot, restsend_app.firstChild);

        createAppUI(slot, defaultConfig, this.clip);
    }
}

const restSendAppInst = new RestSendApp();

if (window.waAPI && window.waAPI.isReady) {
    let cid = setInterval(() => {
        const waChatView = document.querySelector('#app div .two')
        if (waChatView) {
            clearInterval(cid);
            restSendAppInst.init();
        }
    }, 500)
} else {
    restSendAppInst.init();
}

window.rsInst = restSendAppInst
export default restSendAppInst;