"use strict";
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
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
// tslint:disable-next-line: no-imports-from-dist
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
var bodySegmentation = require("../index");
var mask_util_1 = require("../shared/calculators/mask_util");
var renderUtil = require("../shared/calculators/render_util");
var test_util_1 = require("../shared/test_util");
// Measured in channels.
var DIFF_IMAGE = 30;
var CanvasImageSourceMask = /** @class */ (function () {
    function CanvasImageSourceMask(mask) {
        this.mask = mask;
    }
    CanvasImageSourceMask.prototype.toCanvasImageSource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mask];
            });
        });
    };
    CanvasImageSourceMask.prototype.toImageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toImageDataLossy(this.mask)];
            });
        });
    };
    CanvasImageSourceMask.prototype.toTensor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toTensorLossy(this.mask)];
            });
        });
    };
    CanvasImageSourceMask.prototype.getUnderlyingType = function () {
        return 'canvasimagesource';
    };
    return CanvasImageSourceMask;
}());
function getSegmentation(image, config) {
    return __awaiter(this, void 0, void 0, function () {
        var segmenter, segmentations;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.BodyPix)];
                case 1:
                    segmenter = _a.sent();
                    return [4 /*yield*/, segmenter.segmentPeople(image, config)];
                case 2:
                    segmentations = _a.sent();
                    return [2 /*return*/, Promise.all(segmentations.map(function (segmentation) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = {
                                            maskValueToLabel: segmentation.maskValueToLabel
                                        };
                                        _b = CanvasImageSourceMask.bind;
                                        return [4 /*yield*/, segmentation.mask.toCanvasImageSource()];
                                    case 1: return [2 /*return*/, (
                                        // Convert to canvas image source to apply alpha-premultiplication.
                                        _a.mask = new (_b.apply(CanvasImageSourceMask, [void 0, _c.sent()]))(),
                                            _a)];
                                }
                            });
                        }); }))];
            }
        });
    });
}
function getBinaryMask(image, expectedNumSegmentations) {
    return __awaiter(this, void 0, void 0, function () {
        var segmentation, binaryMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSegmentation(image, {
                        multiSegmentation: expectedNumSegmentations != null,
                        segmentBodyParts: false
                    })];
                case 1:
                    segmentation = _a.sent();
                    if (expectedNumSegmentations != null) {
                        expect(segmentation.length).toBe(expectedNumSegmentations);
                    }
                    return [4 /*yield*/, renderUtil.toBinaryMask(segmentation, { r: 255, g: 255, b: 255, a: 255 }, { r: 0, g: 0, b: 0, a: 255 })];
                case 2:
                    binaryMask = _a.sent();
                    return [2 /*return*/, binaryMask];
            }
        });
    });
}
function getColoredMask(image, expectedNumSegmentations) {
    return __awaiter(this, void 0, void 0, function () {
        var segmentation, coloredMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSegmentation(image, {
                        multiSegmentation: expectedNumSegmentations != null,
                        segmentBodyParts: true
                    })];
                case 1:
                    segmentation = _a.sent();
                    if (expectedNumSegmentations != null) {
                        expect(segmentation.length).toBe(expectedNumSegmentations);
                    }
                    return [4 /*yield*/, renderUtil.toColoredMask(segmentation, bodySegmentation.bodyPixMaskValueToRainbowColor, { r: 255, g: 255, b: 255, a: 255 })];
                case 2:
                    coloredMask = _a.sent();
                    return [2 /*return*/, coloredMask];
            }
        });
    });
}
var WIDTH = 1049;
var HEIGHT = 861;
function expectImage(actual, imageName) {
    return __awaiter(this, void 0, void 0, function () {
        var expectedImage, mismatchedChannels;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_util_1.loadImage(imageName, WIDTH, HEIGHT)
                        .then(function (image) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, mask_util_1.toImageDataLossy(image)];
                    }); }); })];
                case 1:
                    expectedImage = _a.sent();
                    mismatchedChannels = actual.data.reduce(function (mismatched, channel, i) {
                        return mismatched + +(channel !== expectedImage.data[i]);
                    }, 0);
                    expect(mismatchedChannels).toBeLessThanOrEqual(DIFF_IMAGE);
                    return [2 /*return*/];
            }
        });
    });
}
jasmine_util_1.describeWithFlags('renderUtil', jasmine_util_1.BROWSER_ENVS, function () {
    var image;
    var timeout;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
                    return [4 /*yield*/, test_util_1.loadImage('shared/three_people.jpg', WIDTH, HEIGHT)];
                case 1:
                    image = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    it('Single Segmentation + No body parts.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var binaryMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBinaryMask(image)];
                case 1:
                    binaryMask = _a.sent();
                    return [4 /*yield*/, expectImage(binaryMask, 'shared/three_people_binary_mask.png')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Multi Segmentation + No body parts.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var binaryMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBinaryMask(image, 3)];
                case 1:
                    binaryMask = _a.sent();
                    return [4 /*yield*/, expectImage(binaryMask, 'shared/three_people_binary_mask.png')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Single Segmentation + Body parts.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var coloredMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getColoredMask(image)];
                case 1:
                    coloredMask = _a.sent();
                    return [4 /*yield*/, expectImage(coloredMask, 'shared/three_people_colored_mask.png')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Multi Segmentation + Body parts.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var coloredMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getColoredMask(image, 3)];
                case 1:
                    coloredMask = _a.sent();
                    return [4 /*yield*/, expectImage(coloredMask, 'shared/three_people_colored_mask.png')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=body_pix_test.js.map