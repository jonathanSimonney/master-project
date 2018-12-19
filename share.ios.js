import OriginalShare from "./src/components/share.js";

export default class Share extends OriginalShare{
	getPlatform(): * {
		return "ios"
	}
}