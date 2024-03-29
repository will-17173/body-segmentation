"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
var mask_util_1 = require("../shared/calculators/mask_util");
var bodyPix = require("./impl");
var BodyPixMask = /** @class */ (function () {
    function BodyPixMask(mask) {
        this.mask = mask;
    }
    BodyPixMask.prototype.toCanvasImageSource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toHTMLCanvasElementLossy(this.mask)];
            });
        });
    };
    BodyPixMask.prototype.toImageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mask];
            });
        });
    };
    BodyPixMask.prototype.toTensor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toTensorLossy(this.mask)];
            });
        });
    };
    BodyPixMask.prototype.getUnderlyingType = function () {
        return 'imagedata';
    };
    return BodyPixMask;
}());
function singleMaskValueToLabel(maskValue) {
    mask_util_1.assertMaskValue(maskValue);
    if (maskValue !== 255) {
        throw new Error("Foreground id must be 255 but got " + maskValue);
    }
    return 'person';
}
function multiMaskValueToLabel(maskValue) {
    mask_util_1.assertMaskValue(maskValue);
    if (maskValue >= bodyPix.PART_CHANNELS.length) {
        throw new Error("Invalid body part value " + maskValue);
    }
    return bodyPix.PART_CHANNELS[maskValue];
}
/**
 * MediaPipe segmenter class.
 */
var BodyPixSegmenter = /** @class */ (function () {
    // Should not be called outside.
    function BodyPixSegmenter(model) {
        this.bodyPixModel = model;
    }
    /**
     * Segment people found in an image or video frame.
     *
     * It returns a single segmentation which contains all the detected people
     * in the input.
     *
     * @param input
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param config Optional.
     *       flipHorizontal: Optional. Default to false. When image data comes
     *       from camera, the result has to flip horizontally.
     *
     * @return An array of one `Segmentation`.
     */
    BodyPixSegmenter.prototype.segmentPeople = function (input, segmentationConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, segmentations, partSegmentations, _a, singleSegmentations, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (input instanceof ImageBitmap) {
                            canvas = document.createElement('canvas');
                            canvas.getContext('2d').drawImage(input, 0, 0);
                            input = canvas;
                        }
                        if (!segmentationConfig.segmentBodyParts) return [3 /*break*/, 5];
                        if (!segmentationConfig.multiSegmentation) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bodyPixModel.segmentMultiPersonParts(input, segmentationConfig)];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.bodyPixModel.segmentPersonParts(input, segmentationConfig)];
                    case 3:
                        _a = [_c.sent()];
                        _c.label = 4;
                    case 4:
                        partSegmentations = _a;
                        segmentations = partSegmentations.map(function (partSegmentation) {
                            var data = partSegmentation.data, width = partSegmentation.width, height = partSegmentation.height;
                            var rgbaData = new Uint8ClampedArray(width * height * 4).fill(0);
                            data.forEach(function (bodyPartLabel, i) {
                                // Background.
                                if (bodyPartLabel === -1) {
                                    rgbaData[i * 4] = bodyPix.PART_CHANNELS.length;
                                    rgbaData[i * 4 + 3] = 0;
                                }
                                else {
                                    rgbaData[i * 4] = bodyPartLabel;
                                    rgbaData[i * 4 + 3] = 255;
                                }
                            });
                            return {
                                maskValueToLabel: multiMaskValueToLabel,
                                mask: new BodyPixMask(new ImageData(rgbaData, width, height)),
                            };
                        });
                        return [3 /*break*/, 10];
                    case 5:
                        if (!segmentationConfig.multiSegmentation) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.bodyPixModel.segmentMultiPerson(input, segmentationConfig)];
                    case 6:
                        _b = _c.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.bodyPixModel.segmentPerson(input, segmentationConfig)];
                    case 8:
                        _b = [_c.sent()];
                        _c.label = 9;
                    case 9:
                        singleSegmentations = _b;
                        segmentations = singleSegmentations.map(function (singleSegmentation) {
                            var data = singleSegmentation.data, width = singleSegmentation.width, height = singleSegmentation.height;
                            var rgbaData = new Uint8ClampedArray(width * height * 4).fill(0);
                            data.forEach(function (bodyPartLabel, i) {
                                // Background.
                                if (bodyPartLabel === 0) {
                                    rgbaData[i * 4] = 0;
                                    rgbaData[i * 4 + 3] = 0;
                                }
                                else {
                                    rgbaData[i * 4] = 255;
                                    rgbaData[i * 4 + 3] = 255;
                                }
                            });
                            return {
                                maskValueToLabel: singleMaskValueToLabel,
                                mask: new BodyPixMask(new ImageData(rgbaData, width, height)),
                            };
                        });
                        _c.label = 10;
                    case 10: return [2 /*return*/, segmentations];
                }
            });
        });
    };
    BodyPixSegmenter.prototype.dispose = function () {
        this.bodyPixModel.dispose();
    };
    BodyPixSegmenter.prototype.reset = function () { };
    return BodyPixSegmenter;
}());
/**
 * Loads the BodyPix solution.
 *
 * @param modelConfig An object that contains parameters for
 * the BodyPix loading process. Please find more details of
 * each parameters in the documentation of the
 * `BodyPixModelConfig` interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bodyPix.load(modelConfig).then(function (model) { return new BodyPixSegmenter(model); })];
        });
    });
}
exports.load = load;
//# sourceMappingURL=segmenter.js.map