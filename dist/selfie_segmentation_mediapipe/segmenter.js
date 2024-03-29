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
var selfieSegmentation = require("@mediapipe/selfie_segmentation");
var tf = require("@tensorflow/tfjs-core");
var mask_util_1 = require("../shared/calculators/mask_util");
var segmenter_utils_1 = require("./segmenter_utils");
var MediaPipeSelfieSegmentationMediaPipeMask = /** @class */ (function () {
    function MediaPipeSelfieSegmentationMediaPipeMask(mask) {
        this.mask = mask;
    }
    MediaPipeSelfieSegmentationMediaPipeMask.prototype.toCanvasImageSource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mask];
            });
        });
    };
    MediaPipeSelfieSegmentationMediaPipeMask.prototype.toImageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toImageDataLossy(this.mask)];
            });
        });
    };
    MediaPipeSelfieSegmentationMediaPipeMask.prototype.toTensor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toTensorLossy(this.mask)];
            });
        });
    };
    MediaPipeSelfieSegmentationMediaPipeMask.prototype.getUnderlyingType = function () {
        return 'canvasimagesource';
    };
    return MediaPipeSelfieSegmentationMediaPipeMask;
}());
function maskValueToLabel(maskValue) {
    mask_util_1.assertMaskValue(maskValue);
    return 'person';
}
/**
 * MediaPipe segmenter class.
 */
var MediaPipeSelfieSegmentationMediaPipeSegmenter = /** @class */ (function () {
    // Should not be called outside.
    function MediaPipeSelfieSegmentationMediaPipeSegmenter(config) {
        var _this = this;
        this.selfieMode = false;
        this.selfieSegmentationSolution =
            new selfieSegmentation.SelfieSegmentation({
                locateFile: function (path, base) {
                    if (config.solutionPath) {
                        var solutionPath = config.solutionPath.replace(/\/+$/, '');
                        return solutionPath + "/" + path;
                    }
                    return base + "/" + path;
                }
            });
        var modelSelection;
        switch (config.modelType) {
            case 'landscape':
                modelSelection = 1;
                break;
            case 'general':
            default:
                modelSelection = 0;
                break;
        }
        this.selfieSegmentationSolution.setOptions({
            modelSelection: modelSelection,
            selfieMode: this.selfieMode,
        });
        this.selfieSegmentationSolution.onResults(function (results) {
            _this.segmentation = [{
                    maskValueToLabel: maskValueToLabel,
                    mask: new MediaPipeSelfieSegmentationMediaPipeMask(results.segmentationMask)
                }];
        });
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
    MediaPipeSelfieSegmentationMediaPipeSegmenter.prototype.segmentPeople = function (input, segmentationConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (segmentationConfig && segmentationConfig.flipHorizontal &&
                            (segmentationConfig.flipHorizontal !== this.selfieMode)) {
                            this.selfieMode = segmentationConfig.flipHorizontal;
                            this.selfieSegmentationSolution.setOptions({
                                selfieMode: this.selfieMode,
                            });
                        }
                        if (!(input instanceof tf.Tensor)) return [3 /*break*/, 2];
                        _b = ImageData.bind;
                        return [4 /*yield*/, tf.browser.toPixels(input)];
                    case 1:
                        _a = new (_b.apply(ImageData, [void 0, _c.sent(), input.shape[1], input.shape[0]]))();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = input;
                        _c.label = 3;
                    case 3:
                        // Cast to GL TexImageSource types.
                        input = _a;
                        return [4 /*yield*/, this.selfieSegmentationSolution.send({ image: input })];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, this.segmentation];
                }
            });
        });
    };
    MediaPipeSelfieSegmentationMediaPipeSegmenter.prototype.dispose = function () {
        this.selfieSegmentationSolution.close();
    };
    MediaPipeSelfieSegmentationMediaPipeSegmenter.prototype.reset = function () {
        this.selfieSegmentationSolution.reset();
        this.segmentation = null;
        this.selfieMode = false;
    };
    MediaPipeSelfieSegmentationMediaPipeSegmenter.prototype.initialize = function () {
        return this.selfieSegmentationSolution.initialize();
    };
    return MediaPipeSelfieSegmentationMediaPipeSegmenter;
}());
/**
 * Loads the MediaPipe solution.
 *
 * @param modelConfig An object that contains parameters for
 * the MediaPipeSelfieSegmentation loading process. Please find more details of
 * each parameters in the documentation of the
 * `MediaPipeSelfieSegmentationMediaPipeModelConfig` interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, segmenter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = segmenter_utils_1.validateModelConfig(modelConfig);
                    segmenter = new MediaPipeSelfieSegmentationMediaPipeSegmenter(config);
                    return [4 /*yield*/, segmenter.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, segmenter];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=segmenter.js.map