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
exports.load = void 0;
var tfconv = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var convert_image_to_tensor_1 = require("../shared/calculators/convert_image_to_tensor");
var image_utils_1 = require("../shared/calculators/image_utils");
var mask_util_1 = require("../shared/calculators/mask_util");
var tensors_to_segmentation_1 = require("../shared/calculators/tensors_to_segmentation");
var constants = require("./constants");
var segmenter_utils_1 = require("./segmenter_utils");
var MediaPipeSelfieSegmentationTfjsMask = /** @class */ (function () {
    function MediaPipeSelfieSegmentationTfjsMask(mask) {
        this.mask = mask;
    }
    MediaPipeSelfieSegmentationTfjsMask.prototype.toCanvasImageSource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toHTMLCanvasElementLossy(this.mask)];
            });
        });
    };
    MediaPipeSelfieSegmentationTfjsMask.prototype.toImageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mask_util_1.toImageDataLossy(this.mask)];
            });
        });
    };
    MediaPipeSelfieSegmentationTfjsMask.prototype.toTensor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mask];
            });
        });
    };
    MediaPipeSelfieSegmentationTfjsMask.prototype.getUnderlyingType = function () {
        return 'tensor';
    };
    return MediaPipeSelfieSegmentationTfjsMask;
}());
function maskValueToLabel(maskValue) {
    mask_util_1.assertMaskValue(maskValue);
    return 'person';
}
/**
 * MediaPipeSelfieSegmentation TFJS segmenter class.
 */
var MediaPipeSelfieSegmentationTfjsSegmenter = /** @class */ (function () {
    function MediaPipeSelfieSegmentationTfjsSegmenter(modelType, model) {
        this.modelType = modelType;
        this.model = model;
    }
    /**
     * Segment people found in an image or video frame.
     *
     * It returns a single segmentation which contains all the detected people
     * in the input.
     *
     * @param image
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param config Optional.
     *       flipHorizontal: Optional. Default to false. When image data comes
     *       from camera, the result has to flip horizontally.
     *
     * @return An array of one `Segmentation`.
     */
    // TF.js implementation of the mediapipe selfie segmentation pipeline.
    // ref graph:
    // https://github.com/google/mediapipe/blob/master/mediapipe/mediapipe/modules/elfie_segmentation/selfie_segmentation_cpu.pbtxt
    MediaPipeSelfieSegmentationTfjsSegmenter.prototype.segmentPeople = function (image, segmentationConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var rgbaMask;
            var _this = this;
            return __generator(this, function (_a) {
                segmentationConfig = segmenter_utils_1.validateSegmentationConfig(segmentationConfig);
                if (image == null) {
                    this.reset();
                    return [2 /*return*/, []];
                }
                rgbaMask = tf.tidy(function () {
                    // SelfieSegmentationCpu: ImageToTensorCalculator.
                    // Resizes the input image into a tensor with a dimension desired by the
                    // model.
                    var imageValueShifted = convert_image_to_tensor_1.convertImageToTensor(image, _this.modelType === 'general' ?
                        constants.SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_GENERAL_CONFIG :
                        constants.SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_LANDSCAPE_CONFIG).imageTensor;
                    // SelfieSegmentationCpu: InferenceCalculator
                    // The model returns a tensor with the following shape:
                    // [1 (batch), 144, 256] or [1 (batch), 256, 256, 2] depending on
                    // modelType.
                    var segmentationTensor = 
                    // Slice activation output only.
                    tf.slice(_this.model.predict(imageValueShifted), [0, 0, 0, 1], -1);
                    // SelfieSegmentationCpu: ImagePropertiesCalculator
                    // Retrieves the size of the input image.
                    var imageSize = image_utils_1.getImageSize(image);
                    // SelfieSegmentationCpu: TensorsToSegmentationCalculator
                    // Processes the output tensors into a segmentation mask that has the same
                    // size as the input image into the graph.
                    var maskImage = tensors_to_segmentation_1.tensorsToSegmentation(segmentationTensor, constants.SELFIE_SEGMENTATION_TENSORS_TO_SEGMENTATION_CONFIG, imageSize);
                    // Grayscale to RGBA
                    // tslint:disable-next-line: no-unnecessary-type-assertion
                    var mask3D = tf.expandDims(maskImage, 2);
                    var rgMask = tf.pad(mask3D, [[0, 0], [0, 0], [0, 1]]);
                    return tf.mirrorPad(rgMask, [[0, 0], [0, 0], [0, 2]], 'symmetric');
                });
                return [2 /*return*/, [{
                            maskValueToLabel: maskValueToLabel,
                            mask: new MediaPipeSelfieSegmentationTfjsMask(rgbaMask)
                        }]];
            });
        });
    };
    MediaPipeSelfieSegmentationTfjsSegmenter.prototype.dispose = function () {
        this.model.dispose();
    };
    MediaPipeSelfieSegmentationTfjsSegmenter.prototype.reset = function () { };
    return MediaPipeSelfieSegmentationTfjsSegmenter;
}());
/**
 * Loads the MediaPipeSelfieSegmentationTfjs model.
 *
 * @param modelConfig ModelConfig object that contains parameters for
 * the MediaPipeSelfieSegmentationTfjs loading process. Please find more details
 * of each parameters in the documentation of the
 * `MediaPipeSelfieSegmentationTfjsModelConfig` interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, modelFromTFHub, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = segmenter_utils_1.validateModelConfig(modelConfig);
                    modelFromTFHub = typeof config.modelUrl === 'string' &&
                        (config.modelUrl.indexOf('https://tfhub.dev') > -1);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl, { fromTFHub: modelFromTFHub })];
                case 1:
                    model = _a.sent();
                    return [2 /*return*/, new MediaPipeSelfieSegmentationTfjsSegmenter(config.modelType, model)];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=segmenter.js.map