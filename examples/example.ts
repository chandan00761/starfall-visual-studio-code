export class Starfall {
	/**
	 * Shower some Starfall in your Visual Studio Code 🌃
	 * @param color Color of starfall shower ✨
	 * @param f Star twinkle frequency 🌠
	 */
	public constructor(color: string, f: number) {
		console.log({ tick: Math.pow(f, -1), hue: color });         
	}

	iInstall(iLove: boolean) {
		if (iLove) {
			return "ext install material-starfall";
		}

		return undefined;
	}

	iLove() {
		console.log("echo 'starfall --emoji 💜'");
	}
}
