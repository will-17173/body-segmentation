"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyPixMaskValueToRainbowColor = void 0;
var mask_util_1 = require("../shared/calculators/mask_util");
var RAINBOW_PART_COLORS = [
    [110, 64, 170], [143, 61, 178], [178, 60, 178], [210, 62, 167],
    [238, 67, 149], [255, 78, 125], [255, 94, 99], [255, 115, 75],
    [255, 140, 56], [239, 167, 47], [217, 194, 49], [194, 219, 64],
    [175, 240, 91], [135, 245, 87], [96, 247, 96], [64, 243, 115],
    [40, 234, 141], [28, 219, 169], [26, 199, 194], [33, 176, 213],
    [47, 150, 224], [65, 125, 224], [84, 101, 214], [99, 81, 195]
];
function bodyPixMaskValueToRainbowColor(maskValue) {
    mask_util_1.assertMaskValue(maskValue);
    if (maskValue < RAINBOW_PART_COLORS.length) {
        var _a = RAINBOW_PART_COLORS[maskValue], r = _a[0], g = _a[1], b = _a[2];
        return { r: r, g: g, b: b, a: 255 };
    }
    throw new Error("Mask value must be in range [0, " + RAINBOW_PART_COLORS.length + ")");
}
exports.bodyPixMaskValueToRainbowColor = bodyPixMaskValueToRainbowColor;
//# sourceMappingURL=constants.js.map