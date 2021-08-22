"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Starfall = void 0;
class Starfall {
    /**
     * Shower some Starfall in your Visual Studio Code 🌃
     * @param color Color of starfall shower ✨
     * @param f Star twinkle frequency 🌠
     */
    constructor(color, f) {
        console.log({ tick: Math.pow(f, -1), hue: color });
    }
    iInstall(iLove) {
        if (iLove) {
            return "ext install material-starfall";
        }
        return undefined;
    }
    iLove() {
        console.log("echo 'starfall --emoji 💜'");
    }
}
exports.Starfall = Starfall;
//# sourceMappingURL=example.js.map