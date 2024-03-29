"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.load = exports.BodyPix = exports.MULTI_PERSON_INSTANCE_INFERENCE_CONFIG = exports.PERSON_INFERENCE_CONFIG = void 0;
var tfconv = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var decode_part_map_1 = require("./decode_part_map");
var mobilenet_1 = require("./mobilenet");
var decode_instance_masks_1 = require("./multi_person/decode_instance_masks");
var decode_multiple_poses_1 = require("./multi_person/decode_multiple_poses");
var resnet_1 = require("./resnet");
var saved_models_1 = require("./saved_models");
var util_1 = require("./util");
var APPLY_SIGMOID_ACTIVATION = true;
var FLIP_POSES_AFTER_SCALING = false;
// The default configuration for loading MobileNetV1 based BodyPix.
//
// (And for references, the default configuration for loading ResNet
// based PoseNet is also included).
//
// ```
// const RESNET_CONFIG = {
//   architecture: 'ResNet50',
//   outputStride: 32,
//   quantBytes: 4,
// } as ModelConfig;
// ```
var MOBILENET_V1_CONFIG = {
    architecture: 'MobileNetV1',
    outputStride: 16,
    quantBytes: 4,
    multiplier: 0.75,
};
var VALID_ARCHITECTURE = ['MobileNetV1', 'ResNet50'];
var VALID_STRIDE = {
    'MobileNetV1': [8, 16, 32],
    'ResNet50': [32, 16]
};
var VALID_MULTIPLIER = {
    'MobileNetV1': [0.50, 0.75, 1.0],
    'ResNet50': [1.0]
};
var VALID_QUANT_BYTES = [1, 2, 4];
function validateModelConfig(config) {
    config = config || MOBILENET_V1_CONFIG;
    if (config.architecture == null) {
        config.architecture = 'MobileNetV1';
    }
    if (VALID_ARCHITECTURE.indexOf(config.architecture) < 0) {
        throw new Error("Invalid architecture " + config.architecture + ". " +
            ("Should be one of " + VALID_ARCHITECTURE));
    }
    if (config.outputStride == null) {
        config.outputStride = 16;
    }
    if (VALID_STRIDE[config.architecture].indexOf(config.outputStride) < 0) {
        throw new Error("Invalid outputStride " + config.outputStride + ". " +
            ("Should be one of " + VALID_STRIDE[config.architecture] + " ") +
            ("for architecture " + config.architecture + "."));
    }
    if (config.multiplier == null) {
        config.multiplier = 1.0;
    }
    if (VALID_MULTIPLIER[config.architecture].indexOf(config.multiplier) < 0) {
        throw new Error("Invalid multiplier " + config.multiplier + ". " +
            ("Should be one of " + VALID_MULTIPLIER[config.architecture] + " ") +
            ("for architecture " + config.architecture + "."));
    }
    if (config.quantBytes == null) {
        config.quantBytes = 4;
    }
    if (VALID_QUANT_BYTES.indexOf(config.quantBytes) < 0) {
        throw new Error("Invalid quantBytes " + config.quantBytes + ". " +
            ("Should be one of " + VALID_QUANT_BYTES + " ") +
            ("for architecture " + config.architecture + "."));
    }
    return config;
}
exports.PERSON_INFERENCE_CONFIG = {
    flipHorizontal: false,
    internalResolution: 'medium',
    segmentationThreshold: 0.7,
    maxDetections: 10,
    scoreThreshold: 0.4,
    nmsRadius: 20,
};
exports.MULTI_PERSON_INSTANCE_INFERENCE_CONFIG = {
    flipHorizontal: false,
    internalResolution: 'medium',
    segmentationThreshold: 0.7,
    maxDetections: 10,
    scoreThreshold: 0.4,
    nmsRadius: 20,
    minKeypointScore: 0.3,
    refineSteps: 10
};
function validatePersonInferenceConfig(config) {
    var segmentationThreshold = config.segmentationThreshold, maxDetections = config.maxDetections, scoreThreshold = config.scoreThreshold, nmsRadius = config.nmsRadius;
    if (segmentationThreshold < 0.0 || segmentationThreshold > 1.0) {
        throw new Error("segmentationThreshold " + segmentationThreshold + ". " +
            "Should be in range [0.0, 1.0]");
    }
    if (maxDetections <= 0) {
        throw new Error("Invalid maxDetections " + maxDetections + ". " +
            "Should be > 0");
    }
    if (scoreThreshold < 0.0 || scoreThreshold > 1.0) {
        throw new Error("Invalid scoreThreshold " + scoreThreshold + ". " +
            "Should be in range [0.0, 1.0]");
    }
    if (nmsRadius <= 0) {
        throw new Error("Invalid nmsRadius " + nmsRadius + ".");
    }
}
function validateMultiPersonInstanceInferenceConfig(config) {
    var segmentationThreshold = config.segmentationThreshold, maxDetections = config.maxDetections, scoreThreshold = config.scoreThreshold, nmsRadius = config.nmsRadius, minKeypointScore = config.minKeypointScore, refineSteps = config.refineSteps;
    if (segmentationThreshold < 0.0 || segmentationThreshold > 1.0) {
        throw new Error("segmentationThreshold " + segmentationThreshold + ". " +
            "Should be in range [0.0, 1.0]");
    }
    if (maxDetections <= 0) {
        throw new Error("Invalid maxDetections " + maxDetections + ". " +
            "Should be > 0");
    }
    if (scoreThreshold < 0.0 || scoreThreshold > 1.0) {
        throw new Error("Invalid scoreThreshold " + scoreThreshold + ". " +
            "Should be in range [0.0, 1.0]");
    }
    if (nmsRadius <= 0) {
        throw new Error("Invalid nmsRadius " + nmsRadius + ".");
    }
    if (minKeypointScore < 0 || minKeypointScore > 1) {
        throw new Error("Invalid minKeypointScore " + minKeypointScore + "." +
            "Should be in range [0.0, 1.0]");
    }
    if (refineSteps <= 0 || refineSteps > 20) {
        throw new Error("Invalid refineSteps " + refineSteps + "." +
            "Should be in range [1, 20]");
    }
}
var BodyPix = /** @class */ (function () {
    function BodyPix(net) {
        this.baseModel = net;
    }
    BodyPix.prototype.predictForPersonSegmentation = function (input) {
        var _a = this.baseModel.predict(input), segmentation = _a.segmentation, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
        return {
            segmentLogits: segmentation,
            heatmapScores: heatmapScores,
            offsets: offsets,
            displacementFwd: displacementFwd,
            displacementBwd: displacementBwd,
        };
    };
    BodyPix.prototype.predictForPersonSegmentationAndPart = function (input) {
        var _a = this.baseModel.predict(input), segmentation = _a.segmentation, partHeatmaps = _a.partHeatmaps, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
        return {
            segmentLogits: segmentation,
            partHeatmapLogits: partHeatmaps,
            heatmapScores: heatmapScores,
            offsets: offsets,
            displacementFwd: displacementFwd,
            displacementBwd: displacementBwd,
        };
    };
    BodyPix.prototype.predictForMultiPersonInstanceSegmentationAndPart = function (input) {
        var _a = this.baseModel.predict(input), segmentation = _a.segmentation, longOffsets = _a.longOffsets, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, partHeatmaps = _a.partHeatmaps;
        return {
            segmentLogits: segmentation,
            longOffsets: longOffsets,
            heatmapScores: heatmapScores,
            offsets: offsets,
            displacementFwd: displacementFwd,
            displacementBwd: displacementBwd,
            partHeatmaps: partHeatmaps
        };
    };
    /**
     * Given an image with people, returns a dictionary of all intermediate
     * tensors including: 1) a binary array with 1 for the pixels that are part of
     * the person, and 0 otherwise, 2) heatmapScores, 3) offsets, and 4) paddings.
     *
     * @param input ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)
     * The input image to feed through the network.
     *
     * @param internalResolution Defaults to 'medium'. The internal resolution
     * that the input is resized to before inference. The larger the
     * internalResolution the more accurate the model at the cost of slower
     * prediction times. Available values are 'low', 'medium', 'high', 'full', or
     * a percentage value between 0 and 1. The values 'low', 'medium', 'high', and
     * 'full' map to 0.25, 0.5, 0.75, and 1.0 correspondingly.
     *
     * @param segmentationThreshold The minimum that segmentation values must have
     * to be considered part of the person. Affects the generation of the
     * segmentation mask.
     *
     * @return A dictionary containing `segmentation`, `heatmapScores`, `offsets`,
     * and `padding`:
     * - `segmentation`: A 2d Tensor with 1 for the pixels that are part of the
     * person, and 0 otherwise. The width and height correspond to the same
     * dimensions of the input image.
     * - `heatmapScores`: A 3d Tensor of the keypoint heatmaps used by
     * pose estimation decoding.
     * - `offsets`: A 3d Tensor of the keypoint offsets used by pose
     * estimation decoding.
     * - `displacementFwd`: A 3d Tensor of the keypoint forward displacement used
     * by pose estimation decoding.
     * - `displacementBwd`: A 3d Tensor of the keypoint backward displacement used
     * by pose estimation decoding.
     * - `padding`: The padding (unit pixels) being applied to the input image
     * before it is fed into the model.
     */
    BodyPix.prototype.segmentPersonActivation = function (input, internalResolution, segmentationThreshold) {
        var _this = this;
        if (segmentationThreshold === void 0) { segmentationThreshold = 0.5; }
        var _a = util_1.getInputSize(input), height = _a[0], width = _a[1];
        var internalResolutionHeightAndWidth = util_1.toInputResolutionHeightAndWidth(internalResolution, this.baseModel.outputStride, [height, width]);
        var _b = util_1.padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
        var _c = tf.tidy(function () {
            var _a = _this.predictForPersonSegmentation(resized), segmentLogits = _a.segmentLogits, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
            var _b = resized.shape, resizedHeight = _b[0], resizedWidth = _b[1];
            var scaledSegmentScores = util_1.scaleAndCropToInputTensorShape(segmentLogits, [height, width], [resizedHeight, resizedWidth], [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
            return {
                segmentation: decode_part_map_1.toMaskTensor(tf.squeeze(scaledSegmentScores), segmentationThreshold),
                heatmapScores: heatmapScores,
                offsets: offsets,
                displacementFwd: displacementFwd,
                displacementBwd: displacementBwd,
            };
        }), segmentation = _c.segmentation, heatmapScores = _c.heatmapScores, offsets = _c.offsets, displacementFwd = _c.displacementFwd, displacementBwd = _c.displacementBwd;
        resized.dispose();
        return {
            segmentation: segmentation,
            heatmapScores: heatmapScores,
            offsets: offsets,
            displacementFwd: displacementFwd,
            displacementBwd: displacementBwd,
            padding: padding,
            internalResolutionHeightAndWidth: internalResolutionHeightAndWidth
        };
    };
    /**
     * Given an image with many people, returns a PersonSegmentation dictionary
     * that contains the segmentation mask for all people and a single pose.
     *
     * Note: The segmentation mask returned by this method covers all people but
     * the pose works well for one person. If you want to estimate instance-level
     * multiple person segmentation & pose for each person, use
     * `segmentMultiPerson` instead.
     *
     * @param input ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)
     * The input image to feed through the network.
     *
     * @param config PersonInferenceConfig object that contains
     * parameters for the BodyPix inference using person decoding.
     *
     * @return A SemanticPersonSegmentation dictionary that contains height,
     * width, the flattened binary segmentation mask and the poses for all people.
     * The width and height correspond to the same dimensions of the input image.
     * - `height`: The height of the segmentation data in pixel unit.
     * - `width`: The width of the segmentation data in pixel unit.
     * - `data`: The flattened Uint8Array of segmentation data. 1 means the pixel
     * belongs to a person and 0 means the pixel doesn't belong to a person. The
     * size of the array is equal to `height` x `width` in row-major order.
     * - `allPoses`: The 2d poses of all people.
     */
    BodyPix.prototype.segmentPerson = function (input, config) {
        if (config === void 0) { config = exports.PERSON_INFERENCE_CONFIG; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, segmentation, heatmapScores, offsets, displacementFwd, displacementBwd, padding, internalResolutionHeightAndWidth, _b, height, width, result, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        config = __assign(__assign({}, exports.PERSON_INFERENCE_CONFIG), config);
                        validatePersonInferenceConfig(config);
                        _a = this.segmentPersonActivation(input, config.internalResolution, config.segmentationThreshold), segmentation = _a.segmentation, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, padding = _a.padding, internalResolutionHeightAndWidth = _a.internalResolutionHeightAndWidth;
                        _b = segmentation.shape, height = _b[0], width = _b[1];
                        return [4 /*yield*/, segmentation.data()];
                    case 1:
                        result = _c.sent();
                        segmentation.dispose();
                        return [4 /*yield*/, util_1.toTensorBuffers3D([heatmapScores, offsets, displacementFwd, displacementBwd])];
                    case 2:
                        tensorBuffers = _c.sent();
                        scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                        poses = decode_multiple_poses_1.decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                        poses = util_1.scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
                        heatmapScores.dispose();
                        offsets.dispose();
                        displacementFwd.dispose();
                        displacementBwd.dispose();
                        return [2 /*return*/, { height: height, width: width, data: result, allPoses: poses }];
                }
            });
        });
    };
    /**
     * Given an image with multiple people, returns an *array* of
     * PersonSegmentation object. Each element in the array corresponding to one
     * of the people in the input image. In other words, it predicts
     * instance-level multiple person segmentation & pose for each person.
     *
     * The model does standard ImageNet pre-processing before inferring through
     * the model. The image pixels should have values [0-255].
     *
     * @param input
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement) The input
     * image to feed through the network.
     *
     * @param config MultiPersonInferenceConfig object that contains
     * parameters for the BodyPix inference using multi-person decoding.
     *
     * @return An array of PersonSegmentation object, each containing a width,
     * height, a binary array (1 for the pixels that are part of the
     * person, and 0 otherwise) and 2D pose. The array size corresponds to the
     * number of pixels in the image. The width and height correspond to the
     * dimensions of the image the binary array is shaped to, which are the same
     * dimensions of the input image.
     */
    BodyPix.prototype.segmentMultiPerson = function (input, config) {
        if (config === void 0) { config = exports.MULTI_PERSON_INSTANCE_INFERENCE_CONFIG; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, internalResolutionHeightAndWidth, _b, resized, padding, _c, segmentation, longOffsets, heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses, instanceMasks;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        config = __assign(__assign({}, exports.MULTI_PERSON_INSTANCE_INFERENCE_CONFIG), config);
                        validateMultiPersonInstanceInferenceConfig(config);
                        _a = util_1.getInputSize(input), height = _a[0], width = _a[1];
                        internalResolutionHeightAndWidth = util_1.toInputResolutionHeightAndWidth(config.internalResolution, this.baseModel.outputStride, [height, width]);
                        _b = util_1.padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
                        _c = tf.tidy(function () {
                            var _a = _this.predictForMultiPersonInstanceSegmentationAndPart(resized), segmentLogits = _a.segmentLogits, longOffsets = _a.longOffsets, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
                            var scaledSegmentScores = util_1.scaleAndCropToInputTensorShape(segmentLogits, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                            var longOffsetsResized = false;
                            var scaledLongOffsets;
                            if (longOffsetsResized) {
                                scaledLongOffsets = util_1.scaleAndCropToInputTensorShape(longOffsets, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                            }
                            else {
                                scaledLongOffsets = longOffsets;
                            }
                            var segmentation = decode_part_map_1.toMaskTensor(tf.squeeze(scaledSegmentScores), config.segmentationThreshold);
                            return {
                                segmentation: segmentation,
                                longOffsets: scaledLongOffsets,
                                heatmapScoresRaw: heatmapScores,
                                offsetsRaw: offsets,
                                displacementFwdRaw: displacementFwd,
                                displacementBwdRaw: displacementBwd,
                            };
                        }), segmentation = _c.segmentation, longOffsets = _c.longOffsets, heatmapScoresRaw = _c.heatmapScoresRaw, offsetsRaw = _c.offsetsRaw, displacementFwdRaw = _c.displacementFwdRaw, displacementBwdRaw = _c.displacementBwdRaw;
                        return [4 /*yield*/, util_1.toTensorBuffers3D([heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw])];
                    case 1:
                        tensorBuffers = _d.sent();
                        scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                        poses = decode_multiple_poses_1.decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                        poses = util_1.scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
                        return [4 /*yield*/, decode_instance_masks_1.decodePersonInstanceMasks(segmentation, longOffsets, poses, height, width, this.baseModel.outputStride, internalResolutionHeightAndWidth, padding, config.scoreThreshold, config.refineSteps, config.minKeypointScore, config.maxDetections)];
                    case 2:
                        instanceMasks = _d.sent();
                        resized.dispose();
                        segmentation.dispose();
                        longOffsets.dispose();
                        heatmapScoresRaw.dispose();
                        offsetsRaw.dispose();
                        displacementFwdRaw.dispose();
                        displacementBwdRaw.dispose();
                        return [2 /*return*/, instanceMasks];
                }
            });
        });
    };
    /**
     * Given an image with many people, returns a dictionary containing: height,
     * width, a tensor with a part id from 0-24 for the pixels that are
     * part of a corresponding body part, and -1 otherwise. This does standard
     * ImageNet pre-processing before inferring through the model.  The image
     * should pixels should have values [0-255].
     *
     * @param input ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)
     * The input image to feed through the network.
     *
     * @param internalResolution Defaults to 'medium'. The internal resolution
     * percentage that the input is resized to before inference. The larger the
     * internalResolution the more accurate the model at the cost of slower
     * prediction times. Available values are 'low', 'medium', 'high', 'full', or
     * a percentage value between 0 and 1. The values 'low', 'medium', 'high', and
     * 'full' map to 0.25, 0.5, 0.75, and 1.0 correspondingly.
     *
     * @param segmentationThreshold The minimum that segmentation values must have
     * to be considered part of the person.  Affects the clipping of the colored
     * part image.
     *
     * @return  A dictionary containing `partSegmentation`, `heatmapScores`,
     * `offsets`, and `padding`:
     * - `partSegmentation`: A 2d Tensor with a part id from 0-24 for
     * the pixels that are part of a corresponding body part, and -1 otherwise.
     * - `heatmapScores`: A 3d Tensor of the keypoint heatmaps used by
     * single-person pose estimation decoding.
     * - `offsets`: A 3d Tensor of the keypoint offsets used by single-person pose
     * estimation decoding.
     * - `displacementFwd`: A 3d Tensor of the keypoint forward displacement
     * used by pose estimation decoding.
     * - `displacementBwd`: A 3d Tensor of the keypoint backward displacement used
     * by pose estimation decoding.
     * - `padding`: The padding (unit pixels) being applied to the input image
     * before it is fed into the model.
     */
    BodyPix.prototype.segmentPersonPartsActivation = function (input, internalResolution, segmentationThreshold) {
        var _this = this;
        if (segmentationThreshold === void 0) { segmentationThreshold = 0.5; }
        var _a = util_1.getInputSize(input), height = _a[0], width = _a[1];
        var internalResolutionHeightAndWidth = util_1.toInputResolutionHeightAndWidth(internalResolution, this.baseModel.outputStride, [height, width]);
        var _b = util_1.padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
        var _c = tf.tidy(function () {
            var _a = _this.predictForPersonSegmentationAndPart(resized), segmentLogits = _a.segmentLogits, partHeatmapLogits = _a.partHeatmapLogits, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
            var _b = resized.shape, resizedHeight = _b[0], resizedWidth = _b[1];
            var scaledSegmentScores = util_1.scaleAndCropToInputTensorShape(segmentLogits, [height, width], [resizedHeight, resizedWidth], [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
            var scaledPartHeatmapScore = util_1.scaleAndCropToInputTensorShape(partHeatmapLogits, [height, width], [resizedHeight, resizedWidth], [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
            var segmentation = decode_part_map_1.toMaskTensor(tf.squeeze(scaledSegmentScores), segmentationThreshold);
            return {
                partSegmentation: decode_part_map_1.decodePartSegmentation(segmentation, scaledPartHeatmapScore),
                heatmapScores: heatmapScores,
                offsets: offsets,
                displacementFwd: displacementFwd,
                displacementBwd: displacementBwd,
            };
        }), partSegmentation = _c.partSegmentation, heatmapScores = _c.heatmapScores, offsets = _c.offsets, displacementFwd = _c.displacementFwd, displacementBwd = _c.displacementBwd;
        resized.dispose();
        return {
            partSegmentation: partSegmentation,
            heatmapScores: heatmapScores,
            offsets: offsets,
            displacementFwd: displacementFwd,
            displacementBwd: displacementBwd,
            padding: padding,
            internalResolutionHeightAndWidth: internalResolutionHeightAndWidth
        };
    };
    /**
     * Given an image with many people, returns a PartSegmentation dictionary that
     * contains the body part segmentation mask for all people and a single pose.
     *
     * Note: The body part segmentation mask returned by this method covers all
     * people but the pose works well when there is one person. If you want to
     * estimate instance-level multiple person body part segmentation & pose for
     * each person, use `segmentMultiPersonParts` instead.
     *
     * @param input ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)
     * The input image to feed through the network.
     *
     * @param config PersonInferenceConfig object that contains
     * parameters for the BodyPix inference using single person decoding.
     *
     * @return A SemanticPartSegmentation dictionary that contains height, width,
     * the flattened binary segmentation mask and the pose for the person. The
     * width and height correspond to the same dimensions of the input image.
     * - `height`: The height of the person part segmentation data in pixel unit.
     * - `width`: The width of the person part segmentation data in pixel unit.
     * - `data`: The flattened Int32Array of person part segmentation data with a
     * part id from 0-24 for the pixels that are part of a corresponding body
     * part, and -1 otherwise. The size of the array is equal to `height` x
     * `width` in row-major order.
     * - `allPoses`: The 2d poses of all people.
     */
    BodyPix.prototype.segmentPersonParts = function (input, config) {
        if (config === void 0) { config = exports.PERSON_INFERENCE_CONFIG; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, partSegmentation, heatmapScores, offsets, displacementFwd, displacementBwd, padding, internalResolutionHeightAndWidth, _b, height, width, data, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        config = __assign(__assign({}, exports.PERSON_INFERENCE_CONFIG), config);
                        validatePersonInferenceConfig(config);
                        _a = this.segmentPersonPartsActivation(input, config.internalResolution, config.segmentationThreshold), partSegmentation = _a.partSegmentation, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, padding = _a.padding, internalResolutionHeightAndWidth = _a.internalResolutionHeightAndWidth;
                        _b = partSegmentation.shape, height = _b[0], width = _b[1];
                        return [4 /*yield*/, partSegmentation.data()];
                    case 1:
                        data = _c.sent();
                        partSegmentation.dispose();
                        return [4 /*yield*/, util_1.toTensorBuffers3D([heatmapScores, offsets, displacementFwd, displacementBwd])];
                    case 2:
                        tensorBuffers = _c.sent();
                        scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                        poses = decode_multiple_poses_1.decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                        poses = util_1.scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
                        heatmapScores.dispose();
                        offsets.dispose();
                        displacementFwd.dispose();
                        displacementBwd.dispose();
                        return [2 /*return*/, { height: height, width: width, data: data, allPoses: poses }];
                }
            });
        });
    };
    /**
     * Given an image with multiple people, returns an *array* of PartSegmentation
     * object. Each element in the array corresponding to one
     * of the people in the input image. In other words, it predicts
     * instance-level multiple person body part segmentation & pose for each
     * person.
     *
     * This does standard ImageNet pre-processing before inferring through
     * the model. The image pixels should have values [0-255].
     *
     * @param input
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement) The input
     * image to feed through the network.
     *
     * @param config MultiPersonInferenceConfig object that contains
     * parameters for the BodyPix inference using multi-person decoding.
     *
     * @return An array of PartSegmentation object, each containing a width,
     * height, a flattened array (with part id from 0-24 for the pixels that are
     * part of a corresponding body part, and -1 otherwise) and 2D pose. The width
     * and height correspond to the dimensions of the image. Each flattened part
     * segmentation array size is equal to `height` x `width`.
     */
    BodyPix.prototype.segmentMultiPersonParts = function (input, config) {
        if (config === void 0) { config = exports.MULTI_PERSON_INSTANCE_INFERENCE_CONFIG; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, internalResolutionHeightAndWidth, _b, resized, padding, _c, segmentation, longOffsets, heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw, partSegmentation, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses, instanceMasks;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        config = __assign(__assign({}, exports.MULTI_PERSON_INSTANCE_INFERENCE_CONFIG), config);
                        validateMultiPersonInstanceInferenceConfig(config);
                        _a = util_1.getInputSize(input), height = _a[0], width = _a[1];
                        internalResolutionHeightAndWidth = util_1.toInputResolutionHeightAndWidth(config.internalResolution, this.baseModel.outputStride, [height, width]);
                        _b = util_1.padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
                        _c = tf.tidy(function () {
                            var _a = _this.predictForMultiPersonInstanceSegmentationAndPart(resized), segmentLogits = _a.segmentLogits, longOffsets = _a.longOffsets, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, partHeatmaps = _a.partHeatmaps;
                            // decoding with scaling.
                            var scaledSegmentScores = util_1.scaleAndCropToInputTensorShape(segmentLogits, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                            // decoding with scaling.
                            var scaledPartSegmentationScores = util_1.scaleAndCropToInputTensorShape(partHeatmaps, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                            var scaledLongOffsets = longOffsets;
                            var segmentation = decode_part_map_1.toMaskTensor(tf.squeeze(scaledSegmentScores), config.segmentationThreshold);
                            var partSegmentation = decode_part_map_1.decodeOnlyPartSegmentation(scaledPartSegmentationScores);
                            return {
                                segmentation: segmentation,
                                longOffsets: scaledLongOffsets,
                                heatmapScoresRaw: heatmapScores,
                                offsetsRaw: offsets,
                                displacementFwdRaw: displacementFwd,
                                displacementBwdRaw: displacementBwd,
                                partSegmentation: partSegmentation
                            };
                        }), segmentation = _c.segmentation, longOffsets = _c.longOffsets, heatmapScoresRaw = _c.heatmapScoresRaw, offsetsRaw = _c.offsetsRaw, displacementFwdRaw = _c.displacementFwdRaw, displacementBwdRaw = _c.displacementBwdRaw, partSegmentation = _c.partSegmentation;
                        return [4 /*yield*/, util_1.toTensorBuffers3D([heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw])];
                    case 1:
                        tensorBuffers = _d.sent();
                        scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                        poses = decode_multiple_poses_1.decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                        poses = util_1.scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
                        return [4 /*yield*/, decode_instance_masks_1.decodePersonInstancePartMasks(segmentation, longOffsets, partSegmentation, poses, height, width, this.baseModel.outputStride, internalResolutionHeightAndWidth, padding, config.scoreThreshold, config.refineSteps, config.minKeypointScore, config.maxDetections)];
                    case 2:
                        instanceMasks = _d.sent();
                        resized.dispose();
                        segmentation.dispose();
                        longOffsets.dispose();
                        heatmapScoresRaw.dispose();
                        offsetsRaw.dispose();
                        displacementFwdRaw.dispose();
                        displacementBwdRaw.dispose();
                        partSegmentation.dispose();
                        return [2 /*return*/, instanceMasks];
                }
            });
        });
    };
    BodyPix.prototype.dispose = function () {
        this.baseModel.dispose();
    };
    return BodyPix;
}());
exports.BodyPix = BodyPix;
/**
 * Loads the MobileNet BodyPix model.
 */
function loadMobileNet(config) {
    return __awaiter(this, void 0, void 0, function () {
        var outputStride, quantBytes, multiplier, url, graphModel, mobilenet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputStride = config.outputStride;
                    quantBytes = config.quantBytes;
                    multiplier = config.multiplier;
                    if (tf == null) {
                        throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please " +
                            "also include @tensorflow/tfjs on the page before using this\n        model.");
                    }
                    url = saved_models_1.mobileNetSavedModel(outputStride, multiplier, quantBytes);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl || url)];
                case 1:
                    graphModel = _a.sent();
                    mobilenet = new mobilenet_1.MobileNet(graphModel, outputStride);
                    return [2 /*return*/, new BodyPix(mobilenet)];
            }
        });
    });
}
/**
 * Loads the ResNet BodyPix model.
 */
function loadResNet(config) {
    return __awaiter(this, void 0, void 0, function () {
        var outputStride, quantBytes, url, graphModel, resnet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputStride = config.outputStride;
                    quantBytes = config.quantBytes;
                    if (tf == null) {
                        throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please " +
                            "also include @tensorflow/tfjs on the page before using this\n        model.");
                    }
                    url = saved_models_1.resNet50SavedModel(outputStride, quantBytes);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl || url)];
                case 1:
                    graphModel = _a.sent();
                    resnet = new resnet_1.ResNet(graphModel, outputStride);
                    return [2 /*return*/, new BodyPix(resnet)];
            }
        });
    });
}
/**
 * Loads the BodyPix model instance from a checkpoint, with the ResNet
 * or MobileNet architecture. The model to be loaded is configurable using the
 * config dictionary ModelConfig. Please find more details in the
 * documentation of the ModelConfig.
 *
 * @param config ModelConfig dictionary that contains parameters for
 * the BodyPix loading process. Please find more details of each parameters
 * in the documentation of the ModelConfig interface. The predefined
 * `MOBILENET_V1_CONFIG` and `RESNET_CONFIG` can also be used as references
 * for defining your customized config.
 */
function load(config) {
    if (config === void 0) { config = MOBILENET_V1_CONFIG; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            config = validateModelConfig(config);
            if (config.architecture === 'ResNet50') {
                return [2 /*return*/, loadResNet(config)];
            }
            else if (config.architecture === 'MobileNetV1') {
                return [2 /*return*/, loadMobileNet(config)];
            }
            else {
                return [2 /*return*/, null];
            }
            return [2 /*return*/];
        });
    });
}
exports.load = load;
//# sourceMappingURL=body_pix_model.js.map