/**
    * @license
    * Copyright 2022 Google LLC. All Rights Reserved.
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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-core'), require('@tensorflow/tfjs-converter'), require('@mediapipe/selfie_segmentation')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-core', '@tensorflow/tfjs-converter', '@mediapipe/selfie_segmentation'], factory) :
    (global = global || self, factory(global.bodySegmentation = {}, global.tf, global.tf, global.globalThis));
}(this, (function (exports, tf, tfconv, selfieSegmentation) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function toNumber(value) {
        return value instanceof SVGAnimatedLength ? value.baseVal.value : value;
    }
    /**
     * Converts input image to an HTMLCanvasElement. Note that converting
     * back from the output of this function to imageData or a Tensor will be lossy
     * due to premultiplied alpha color values. For more details please reference:
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
     * @param image Input image.
     *
     * @returns Converted HTMLCanvasElement.
     */
    function toHTMLCanvasElementLossy(image) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canvas = document.createElement('canvas');
                        if (!(image instanceof tf.Tensor)) return [3 /*break*/, 2];
                        return [4 /*yield*/, tf.browser.toPixels(image, canvas)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        canvas.width = toNumber(image.width);
                        canvas.height = toNumber(image.height);
                        ctx = canvas.getContext('2d');
                        if (image instanceof ImageData) {
                            ctx.putImageData(image, 0, 0);
                        }
                        else {
                            ctx.drawImage(image, 0, 0);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, canvas];
                }
            });
        });
    }
    /**
     * Converts input image to ImageData. Note that converting
     * from a CanvasImageSource will be lossy due to premultiplied alpha color
     * values. For more details please reference:
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
     * @param image Input image.
     *
     * @returns Converted ImageData.
     */
    function toImageDataLossy(image) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, _b, canvas, ctx;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(image instanceof tf.Tensor)) return [3 /*break*/, 2];
                        _a = image.shape.slice(0, 2), height = _a[0], width = _a[1];
                        _b = ImageData.bind;
                        return [4 /*yield*/, tf.browser.toPixels(image)];
                    case 1: return [2 /*return*/, new (_b.apply(ImageData, [void 0, _c.sent(), width, height]))()];
                    case 2:
                        canvas = document.createElement('canvas');
                        ctx = canvas.getContext('2d');
                        canvas.width = toNumber(image.width);
                        canvas.height = toNumber(image.height);
                        ctx.drawImage(image, 0, 0);
                        return [2 /*return*/, ctx.getImageData(0, 0, canvas.width, canvas.height)];
                }
            });
        });
    }
    /**
     * Converts input image to Tensor. Note that converting
     * from a CanvasImageSource will be lossy due to premultiplied alpha color
     * values. For more details please reference:
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
     * @param image Input image.
     *
     * @returns Converted Tensor.
     */
    function toTensorLossy(image) {
        return __awaiter(this, void 0, void 0, function () {
            var pixelsInput, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(image instanceof SVGImageElement || image instanceof OffscreenCanvas)) return [3 /*break*/, 2];
                        return [4 /*yield*/, toHTMLCanvasElementLossy(image)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = image;
                        _b.label = 3;
                    case 3:
                        pixelsInput = _a;
                        return [2 /*return*/, tf.browser.fromPixels(pixelsInput, 4)];
                }
            });
        });
    }
    function assertMaskValue(maskValue) {
        if (maskValue < 0 || maskValue >= 256) {
            throw new Error("Mask value must be in range [0, 255] but got " + maskValue);
        }
        if (!Number.isInteger(maskValue)) {
            throw new Error("Mask value must be an integer but got " + maskValue);
        }
    }

    var RAINBOW_PART_COLORS = [
        [110, 64, 170], [143, 61, 178], [178, 60, 178], [210, 62, 167],
        [238, 67, 149], [255, 78, 125], [255, 94, 99], [255, 115, 75],
        [255, 140, 56], [239, 167, 47], [217, 194, 49], [194, 219, 64],
        [175, 240, 91], [135, 245, 87], [96, 247, 96], [64, 243, 115],
        [40, 234, 141], [28, 219, 169], [26, 199, 194], [33, 176, 213],
        [47, 150, 224], [65, 125, 224], [84, 101, 214], [99, 81, 195]
    ];
    function bodyPixMaskValueToRainbowColor(maskValue) {
        assertMaskValue(maskValue);
        if (maskValue < RAINBOW_PART_COLORS.length) {
            var _a = RAINBOW_PART_COLORS[maskValue], r = _a[0], g = _a[1], b = _a[2];
            return { r: r, g: g, b: b, a: 255 };
        }
        throw new Error("Mask value must be in range [0, " + RAINBOW_PART_COLORS.length + ")");
    }

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
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
    /**
     * Takes the sigmoid of the part heatmap output and generates a 2d one-hot
     * tensor with ones where the part's score has the maximum value.
     *
     * @param partHeatmapScores
     */
    function toFlattenedOneHotPartMap(partHeatmapScores) {
        var numParts = partHeatmapScores.shape[2];
        var partMapLocations = tf.argMax(partHeatmapScores, 2);
        var partMapFlattened = tf.reshape(partMapLocations, [-1]);
        return tf.oneHot(partMapFlattened, numParts);
    }
    function clipByMask2d(image, mask) {
        return tf.mul(image, mask);
    }
    /**
     * Takes the sigmoid of the segmentation output, and generates a segmentation
     * mask with a 1 or 0 at each pixel where there is a person or not a person. The
     * segmentation threshold determines the threshold of a score for a pixel for it
     * to be considered part of a person.
     * @param segmentScores A 3d-tensor of the sigmoid of the segmentation output.
     * @param segmentationThreshold The minimum that segmentation values must have
     * to be considered part of the person.  Affects the generation of the
     * segmentation mask and the clipping of the colored part image.
     *
     * @returns A segmentation mask with a 1 or 0 at each pixel where there is a
     * person or not a person.
     */
    function toMaskTensor(segmentScores, threshold) {
        return tf.tidy(function () {
            return tf.cast(tf.greater(segmentScores, tf.scalar(threshold)), 'int32');
        });
    }
    /**
     * Takes the sigmoid of the person and part map output, and returns a 2d tensor
     * of an image with the corresponding value at each pixel corresponding to the
     * part with the highest value. These part ids are clipped by the segmentation
     * mask. Wherever the a pixel is clipped by the segmentation mask, its value
     * will set to -1, indicating that there is no part in that pixel.
     * @param segmentScores A 3d-tensor of the sigmoid of the segmentation output.
     * @param partHeatmapScores A 3d-tensor of the sigmoid of the part heatmap
     * output. The third dimension corresponds to the part.
     *
     * @returns A 2d tensor of an image with the corresponding value at each pixel
     * corresponding to the part with the highest value. These part ids are clipped
     * by the segmentation mask.  It will have values of -1 for pixels that are
     * outside of the body and do not have a corresponding part.
     */
    function decodePartSegmentation(segmentationMask, partHeatmapScores) {
        var _a = partHeatmapScores.shape, partMapHeight = _a[0], partMapWidth = _a[1], numParts = _a[2];
        return tf.tidy(function () {
            var flattenedMap = toFlattenedOneHotPartMap(partHeatmapScores);
            var partNumbers = tf.expandDims(tf.range(0, numParts, 1, 'int32'), 1);
            var partMapFlattened = tf.cast(tf.matMul(flattenedMap, partNumbers), 'int32');
            var partMap = tf.reshape(partMapFlattened, [partMapHeight, partMapWidth]);
            var partMapShiftedUpForClipping = tf.add(partMap, tf.scalar(1, 'int32'));
            return tf.sub(clipByMask2d(partMapShiftedUpForClipping, segmentationMask), tf.scalar(1, 'int32'));
        });
    }
    function decodeOnlyPartSegmentation(partHeatmapScores) {
        var _a = partHeatmapScores.shape, partMapHeight = _a[0], partMapWidth = _a[1], numParts = _a[2];
        return tf.tidy(function () {
            var flattenedMap = toFlattenedOneHotPartMap(partHeatmapScores);
            var partNumbers = tf.expandDims(tf.range(0, numParts, 1, 'int32'), 1);
            var partMapFlattened = tf.cast(tf.matMul(flattenedMap, partNumbers), 'int32');
            return tf.reshape(partMapFlattened, [partMapHeight, partMapWidth]);
        });
    }

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
    /**
     * BodyPix supports using various convolution neural network models
     * (e.g. ResNet and MobileNetV1) as its underlying base model.
     * The following BaseModel interface defines a unified interface for
     * creating such BodyPix base models. Currently both MobileNet (in
     * ./mobilenet.ts) and ResNet (in ./resnet.ts) implements the BaseModel
     * interface. New base models that conform to the BaseModel interface can be
     * added to BodyPix.
     */
    var BaseModel = /** @class */ (function () {
        function BaseModel(model, outputStride) {
            this.model = model;
            this.outputStride = outputStride;
            var inputShape = this.model.inputs[0].shape;
            tf.util.assert((inputShape[1] === -1) && (inputShape[2] === -1), function () { return "Input shape [" + inputShape[1] + ", " + inputShape[2] + "] " +
                "must both be equal to or -1"; });
        }
        /**
         * Predicts intermediate Tensor representations.
         *
         * @param input The input RGB image of the base model.
         * A Tensor of shape: [`inputResolution`, `inputResolution`, 3].
         *
         * @return A dictionary of base model's intermediate predictions.
         * The returned dictionary should contains the following elements:
         * - heatmapScores: A Tensor3D that represents the keypoint heatmap scores.
         * - offsets: A Tensor3D that represents the offsets.
         * - displacementFwd: A Tensor3D that represents the forward displacement.
         * - displacementBwd: A Tensor3D that represents the backward displacement.
         * - segmentation: A Tensor3D that represents the segmentation of all
         * people.
         * - longOffsets: A Tensor3D that represents the long offsets used for
         * instance grouping.
         * - partHeatmaps: A Tensor3D that represents the body part segmentation.
         */
        BaseModel.prototype.predict = function (input) {
            var _this = this;
            return tf.tidy(function () {
                var asFloat = _this.preprocessInput(tf.cast(input, 'float32'));
                var asBatch = tf.expandDims(asFloat, 0);
                var results = _this.model.predict(asBatch);
                var results3d = results.map(function (y) { return tf.squeeze(y, [0]); });
                var namedResults = _this.nameOutputResults(results3d);
                return {
                    heatmapScores: tf.sigmoid(namedResults.heatmap),
                    offsets: namedResults.offsets,
                    displacementFwd: namedResults.displacementFwd,
                    displacementBwd: namedResults.displacementBwd,
                    segmentation: namedResults.segmentation,
                    partHeatmaps: namedResults.partHeatmaps,
                    longOffsets: namedResults.longOffsets,
                    partOffsets: namedResults.partOffsets
                };
            });
        };
        /**
         * Releases the CPU and GPU memory allocated by the model.
         */
        BaseModel.prototype.dispose = function () {
            this.model.dispose();
        };
        return BaseModel;
    }());

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
    var MobileNet = /** @class */ (function (_super) {
        __extends(MobileNet, _super);
        function MobileNet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MobileNet.prototype.preprocessInput = function (input) {
            // Normalize the pixels [0, 255] to be between [-1, 1].
            return tf.tidy(function () { return tf.sub(tf.div(input, 127.5), 1.0); });
        };
        MobileNet.prototype.nameOutputResults = function (results) {
            var offsets = results[0], segmentation = results[1], partHeatmaps = results[2], longOffsets = results[3], heatmap = results[4], displacementFwd = results[5], displacementBwd = results[6], partOffsets = results[7];
            return {
                offsets: offsets,
                segmentation: segmentation,
                partHeatmaps: partHeatmaps,
                longOffsets: longOffsets,
                heatmap: heatmap,
                displacementFwd: displacementFwd,
                displacementBwd: displacementBwd,
                partOffsets: partOffsets
            };
        };
        return MobileNet;
    }(BaseModel));

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
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
    var PART_NAMES = [
        'nose', 'leftEye', 'rightEye', 'leftEar', 'rightEar', 'leftShoulder',
        'rightShoulder', 'leftElbow', 'rightElbow', 'leftWrist', 'rightWrist',
        'leftHip', 'rightHip', 'leftKnee', 'rightKnee', 'leftAnkle', 'rightAnkle'
    ];
    var NUM_KEYPOINTS = PART_NAMES.length;
    var PART_IDS = PART_NAMES.reduce(function (result, jointName, i) {
        result[jointName] = i;
        return result;
    }, {});
    var CONNECTED_PART_NAMES = [
        ['leftHip', 'leftShoulder'], ['leftElbow', 'leftShoulder'],
        ['leftElbow', 'leftWrist'], ['leftHip', 'leftKnee'],
        ['leftKnee', 'leftAnkle'], ['rightHip', 'rightShoulder'],
        ['rightElbow', 'rightShoulder'], ['rightElbow', 'rightWrist'],
        ['rightHip', 'rightKnee'], ['rightKnee', 'rightAnkle'],
        ['leftShoulder', 'rightShoulder'], ['leftHip', 'rightHip']
    ];
    /*
     * Define the skeleton. This defines the parent->child relationships of our
     * tree. Arbitrarily this defines the nose as the root of the tree, however
     * since we will infer the displacement for both parent->child and
     * child->parent, we can define the tree root as any node.
     */
    var POSE_CHAIN = [
        ['nose', 'leftEye'], ['leftEye', 'leftEar'], ['nose', 'rightEye'],
        ['rightEye', 'rightEar'], ['nose', 'leftShoulder'],
        ['leftShoulder', 'leftElbow'], ['leftElbow', 'leftWrist'],
        ['leftShoulder', 'leftHip'], ['leftHip', 'leftKnee'],
        ['leftKnee', 'leftAnkle'], ['nose', 'rightShoulder'],
        ['rightShoulder', 'rightElbow'], ['rightElbow', 'rightWrist'],
        ['rightShoulder', 'rightHip'], ['rightHip', 'rightKnee'],
        ['rightKnee', 'rightAnkle']
    ];
    var CONNECTED_PART_INDICES = CONNECTED_PART_NAMES.map(function (_a) {
        var jointNameA = _a[0], jointNameB = _a[1];
        return ([PART_IDS[jointNameA], PART_IDS[jointNameB]]);
    });

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
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
    function getScale(_a, _b, padding) {
        var height = _a[0], width = _a[1];
        var inputResolutionY = _b[0], inputResolutionX = _b[1];
        var padT = padding.top, padB = padding.bottom, padL = padding.left, padR = padding.right;
        var scaleY = inputResolutionY / (padT + padB + height);
        var scaleX = inputResolutionX / (padL + padR + width);
        return [scaleX, scaleY];
    }
    function getOffsetPoint(y, x, keypoint, offsets) {
        return {
            y: offsets.get(y, x, keypoint),
            x: offsets.get(y, x, keypoint + NUM_KEYPOINTS)
        };
    }
    function getImageCoords(part, outputStride, offsets) {
        var heatmapY = part.heatmapY, heatmapX = part.heatmapX, keypoint = part.id;
        var _a = getOffsetPoint(heatmapY, heatmapX, keypoint, offsets), y = _a.y, x = _a.x;
        return {
            x: part.heatmapX * outputStride + x,
            y: part.heatmapY * outputStride + y
        };
    }
    function clamp(a, min, max) {
        if (a < min) {
            return min;
        }
        if (a > max) {
            return max;
        }
        return a;
    }
    function squaredDistance(y1, x1, y2, x2) {
        var dy = y2 - y1;
        var dx = x2 - x1;
        return dy * dy + dx * dx;
    }
    function addVectors(a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
    }

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
    function computeDistance(embedding, pose, minPartScore) {
        if (minPartScore === void 0) { minPartScore = 0.3; }
        var distance = 0.0;
        var numKpt = 0;
        for (var p = 0; p < embedding.length; p++) {
            if (pose.keypoints[p].score > minPartScore) {
                numKpt += 1;
                distance += Math.pow((embedding[p].x - pose.keypoints[p].position.x), 2) +
                    Math.pow((embedding[p].y - pose.keypoints[p].position.y), 2);
            }
        }
        if (numKpt === 0) {
            distance = Infinity;
        }
        else {
            distance = distance / numKpt;
        }
        return distance;
    }
    function convertToPositionInOuput(position, _a, _b, stride) {
        var padT = _a[0], padL = _a[1];
        var scaleX = _b[0], scaleY = _b[1];
        var y = Math.round(((padT + position.y + 1.0) * scaleY - 1.0) / stride);
        var x = Math.round(((padL + position.x + 1.0) * scaleX - 1.0) / stride);
        return { x: x, y: y };
    }
    function getEmbedding(location, keypointIndex, convertToPosition, outputResolutionX, longOffsets, refineSteps, _a) {
        var height = _a[0], width = _a[1];
        var newLocation = convertToPosition(location);
        var nn = newLocation.y * outputResolutionX + newLocation.x;
        var dy = longOffsets[NUM_KEYPOINTS * (2 * nn) + keypointIndex];
        var dx = longOffsets[NUM_KEYPOINTS * (2 * nn + 1) + keypointIndex];
        var y = location.y + dy;
        var x = location.x + dx;
        for (var t = 0; t < refineSteps; t++) {
            y = Math.min(y, height - 1);
            x = Math.min(x, width - 1);
            var newPos = convertToPosition({ x: x, y: y });
            var nn_1 = newPos.y * outputResolutionX + newPos.x;
            dy = longOffsets[NUM_KEYPOINTS * (2 * nn_1) + keypointIndex];
            dx = longOffsets[NUM_KEYPOINTS * (2 * nn_1 + 1) + keypointIndex];
            y = y + dy;
            x = x + dx;
        }
        return { x: x, y: y };
    }
    function matchEmbeddingToInstance(location, longOffsets, poses, numKptForMatching, _a, _b, outputResolutionX, _c, stride, refineSteps) {
        var padT = _a[0], padL = _a[1];
        var scaleX = _b[0], scaleY = _b[1];
        var height = _c[0], width = _c[1];
        var embed = [];
        var convertToPosition = function (pair) {
            return convertToPositionInOuput(pair, [padT, padL], [scaleX, scaleY], stride);
        };
        for (var keypointsIndex = 0; keypointsIndex < numKptForMatching; keypointsIndex++) {
            var embedding = getEmbedding(location, keypointsIndex, convertToPosition, outputResolutionX, longOffsets, refineSteps, [height, width]);
            embed.push(embedding);
        }
        var kMin = -1;
        var kMinDist = Infinity;
        for (var k = 0; k < poses.length; k++) {
            var dist = computeDistance(embed, poses[k]);
            if (dist < kMinDist) {
                kMin = k;
                kMinDist = dist;
            }
        }
        return kMin;
    }
    function getOutputResolution(_a, stride) {
        var inputResolutionY = _a[0], inputResolutionX = _a[1];
        var outputResolutionX = Math.round((inputResolutionX - 1.0) / stride + 1.0);
        var outputResolutionY = Math.round((inputResolutionY - 1.0) / stride + 1.0);
        return [outputResolutionX, outputResolutionY];
    }
    function decodeMultipleMasksCPU(segmentation, longOffsets, posesAboveScore, height, width, stride, _a, padding, refineSteps, numKptForMatching) {
        var inHeight = _a[0], inWidth = _a[1];
        if (numKptForMatching === void 0) { numKptForMatching = 5; }
        var dataArrays = posesAboveScore.map(function (x) { return new Uint8Array(height * width).fill(0); });
        var padT = padding.top, padL = padding.left;
        var _b = getScale([height, width], [inHeight, inWidth], padding), scaleX = _b[0], scaleY = _b[1];
        var outputResolutionX = getOutputResolution([inHeight, inWidth], stride)[0];
        for (var i = 0; i < height; i += 1) {
            for (var j = 0; j < width; j += 1) {
                var n = i * width + j;
                var prob = segmentation[n];
                if (prob === 1) {
                    var kMin = matchEmbeddingToInstance({ x: j, y: i }, longOffsets, posesAboveScore, numKptForMatching, [padT, padL], [scaleX, scaleY], outputResolutionX, [height, width], stride, refineSteps);
                    if (kMin >= 0) {
                        dataArrays[kMin][n] = 1;
                    }
                }
            }
        }
        return dataArrays;
    }
    function decodeMultiplePartMasksCPU(segmentation, longOffsets, partSegmentaion, posesAboveScore, height, width, stride, _a, padding, refineSteps, numKptForMatching) {
        var inHeight = _a[0], inWidth = _a[1];
        if (numKptForMatching === void 0) { numKptForMatching = 5; }
        var dataArrays = posesAboveScore.map(function (x) { return new Int32Array(height * width).fill(-1); });
        var padT = padding.top, padL = padding.left;
        var _b = getScale([height, width], [inHeight, inWidth], padding), scaleX = _b[0], scaleY = _b[1];
        var outputResolutionX = getOutputResolution([inHeight, inWidth], stride)[0];
        for (var i = 0; i < height; i += 1) {
            for (var j = 0; j < width; j += 1) {
                var n = i * width + j;
                var prob = segmentation[n];
                if (prob === 1) {
                    var kMin = matchEmbeddingToInstance({ x: j, y: i }, longOffsets, posesAboveScore, numKptForMatching, [padT, padL], [scaleX, scaleY], outputResolutionX, [height, width], stride, refineSteps);
                    if (kMin >= 0) {
                        dataArrays[kMin][n] = partSegmentaion[n];
                    }
                }
            }
        }
        return dataArrays;
    }

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
    function decodeMultipleMasksWebGl(segmentation, longOffsets, posesAboveScore, height, width, stride, _a, padding, refineSteps, minKptScore, maxNumPeople) {
        var inHeight = _a[0], inWidth = _a[1];
        // The height/width of the image/canvas itself.
        var _b = segmentation.shape, origHeight = _b[0], origWidth = _b[1];
        // The height/width of the output of the model.
        var _c = longOffsets.shape.slice(0, 2), outHeight = _c[0], outWidth = _c[1];
        var shapedLongOffsets = tf.reshape(longOffsets, [outHeight, outWidth, 2, NUM_KEYPOINTS]);
        // Make pose tensor of shape [MAX_NUM_PEOPLE, NUM_KEYPOINTS, 3] where
        // the last 3 coordinates correspond to the score, h and w coordinate of that
        // keypoint.
        var poseVals = new Float32Array(maxNumPeople * NUM_KEYPOINTS * 3).fill(0.0);
        for (var i = 0; i < posesAboveScore.length; i++) {
            var poseOffset = i * NUM_KEYPOINTS * 3;
            var pose = posesAboveScore[i];
            for (var kp = 0; kp < NUM_KEYPOINTS; kp++) {
                var keypoint = pose.keypoints[kp];
                var offset = poseOffset + kp * 3;
                poseVals[offset] = keypoint.score;
                poseVals[offset + 1] = keypoint.position.y;
                poseVals[offset + 2] = keypoint.position.x;
            }
        }
        var _d = getScale([height, width], [inHeight, inWidth], padding), scaleX = _d[0], scaleY = _d[1];
        var posesTensor = tf.tensor(poseVals, [maxNumPeople, NUM_KEYPOINTS, 3]);
        var padT = padding.top, padL = padding.left;
        var program = {
            variableNames: ['segmentation', 'longOffsets', 'poses'],
            outputShape: [origHeight, origWidth],
            userCode: "\n    int convertToPositionInOutput(int pos, int pad, float scale, int stride) {\n      return round(((float(pos + pad) + 1.0) * scale - 1.0) / float(stride));\n    }\n\n    float convertToPositionInOutputFloat(\n        int pos, int pad, float scale, int stride) {\n      return ((float(pos + pad) + 1.0) * scale - 1.0) / float(stride);\n    }\n\n    float dist(float x1, float y1, float x2, float y2) {\n      return pow(x1 - x2, 2.0) + pow(y1 - y2, 2.0);\n    }\n\n    float sampleLongOffsets(float h, float w, int d, int k) {\n      float fh = fract(h);\n      float fw = fract(w);\n      int clH = int(ceil(h));\n      int clW = int(ceil(w));\n      int flH = int(floor(h));\n      int flW = int(floor(w));\n      float o11 = getLongOffsets(flH, flW, d, k);\n      float o12 = getLongOffsets(flH, clW, d, k);\n      float o21 = getLongOffsets(clH, flW, d, k);\n      float o22 = getLongOffsets(clH, clW, d, k);\n      float o1 = mix(o11, o12, fw);\n      float o2 = mix(o21, o22, fw);\n      return mix(o1, o2, fh);\n    }\n\n    int findNearestPose(int h, int w) {\n      float prob = getSegmentation(h, w);\n      if (prob < 1.0) {\n        return -1;\n      }\n\n      // Done(Tyler): convert from output space h/w to strided space.\n      float stridedH = convertToPositionInOutputFloat(\n        h, " + padT + ", " + scaleY + ", " + stride + ");\n      float stridedW = convertToPositionInOutputFloat(\n        w, " + padL + ", " + scaleX + ", " + stride + ");\n\n      float minDist = 1000000.0;\n      int iMin = -1;\n      for (int i = 0; i < " + maxNumPeople + "; i++) {\n        float curDistSum = 0.0;\n        int numKpt = 0;\n        for (int k = 0; k < " + NUM_KEYPOINTS + "; k++) {\n          float dy = sampleLongOffsets(stridedH, stridedW, 0, k);\n          float dx = sampleLongOffsets(stridedH, stridedW, 1, k);\n\n          float y = float(h) + dy;\n          float x = float(w) + dx;\n\n          for (int s = 0; s < " + refineSteps + "; s++) {\n            int yRounded = round(min(y, float(" + (height - 1.0) + ")));\n            int xRounded = round(min(x, float(" + (width - 1.0) + ")));\n\n            float yStrided = convertToPositionInOutputFloat(\n              yRounded, " + padT + ", " + scaleY + ", " + stride + ");\n            float xStrided = convertToPositionInOutputFloat(\n              xRounded, " + padL + ", " + scaleX + ", " + stride + ");\n\n            float dy = sampleLongOffsets(yStrided, xStrided, 0, k);\n            float dx = sampleLongOffsets(yStrided, xStrided, 1, k);\n\n            y = y + dy;\n            x = x + dx;\n          }\n\n          float poseScore = getPoses(i, k, 0);\n          float poseY = getPoses(i, k, 1);\n          float poseX = getPoses(i, k, 2);\n          if (poseScore > " + minKptScore + ") {\n            numKpt = numKpt + 1;\n            curDistSum = curDistSum + dist(x, y, poseX, poseY);\n          }\n        }\n        if (numKpt > 0 && curDistSum / float(numKpt) < minDist) {\n          minDist = curDistSum / float(numKpt);\n          iMin = i;\n        }\n      }\n      return iMin;\n    }\n\n    void main() {\n        ivec2 coords = getOutputCoords();\n        int nearestPose = findNearestPose(coords[0], coords[1]);\n        setOutput(float(nearestPose));\n      }\n  "
        };
        var webglBackend = tf.backend();
        return webglBackend.compileAndRun(program, [segmentation, shapedLongOffsets, posesTensor]);
    }

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
    function toPersonKSegmentation(segmentation, k) {
        return tf.tidy(function () { return tf.cast(tf.equal(segmentation, tf.scalar(k)), 'int32'); });
    }
    function toPersonKPartSegmentation(segmentation, bodyParts, k) {
        return tf.tidy(function () { return tf.sub(tf.mul(tf.cast(tf.equal(segmentation, tf.scalar(k)), 'int32'), tf.add(bodyParts, 1)), 1); });
    }
    function isWebGlBackend() {
        return tf.getBackend() === 'webgl';
    }
    function decodePersonInstanceMasks(segmentation, longOffsets, poses, height, width, stride, _a, padding, minPoseScore, refineSteps, minKeypointScore, maxNumPeople) {
        var inHeight = _a[0], inWidth = _a[1];
        if (minPoseScore === void 0) { minPoseScore = 0.2; }
        if (refineSteps === void 0) { refineSteps = 8; }
        if (minKeypointScore === void 0) { minKeypointScore = 0.3; }
        if (maxNumPeople === void 0) { maxNumPeople = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var posesAboveScore, personSegmentationsData, personSegmentations, segmentationsData, longOffsetsData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        posesAboveScore = poses.filter(function (pose) { return pose.score >= minPoseScore; });
                        if (!isWebGlBackend()) return [3 /*break*/, 2];
                        personSegmentations = tf.tidy(function () {
                            var masksTensorInfo = decodeMultipleMasksWebGl(segmentation, longOffsets, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps, minKeypointScore, maxNumPeople);
                            var masksTensor = tf.engine().makeTensorFromDataId(masksTensorInfo.dataId, masksTensorInfo.shape, masksTensorInfo.dtype);
                            return posesAboveScore.map(function (_, k) { return toPersonKSegmentation(masksTensor, k); });
                        });
                        return [4 /*yield*/, Promise.all(personSegmentations.map(function (mask) { return mask.data(); }))];
                    case 1:
                        personSegmentationsData =
                            (_b.sent());
                        personSegmentations.forEach(function (x) { return x.dispose(); });
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, segmentation.data()];
                    case 3:
                        segmentationsData = _b.sent();
                        return [4 /*yield*/, longOffsets.data()];
                    case 4:
                        longOffsetsData = _b.sent();
                        personSegmentationsData = decodeMultipleMasksCPU(segmentationsData, longOffsetsData, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps);
                        _b.label = 5;
                    case 5: return [2 /*return*/, personSegmentationsData.map(function (data, i) { return ({ data: data, pose: posesAboveScore[i], width: width, height: height }); })];
                }
            });
        });
    }
    function decodePersonInstancePartMasks(segmentation, longOffsets, partSegmentation, poses, height, width, stride, _a, padding, minPoseScore, refineSteps, minKeypointScore, maxNumPeople) {
        var inHeight = _a[0], inWidth = _a[1];
        if (minPoseScore === void 0) { minPoseScore = 0.2; }
        if (refineSteps === void 0) { refineSteps = 8; }
        if (minKeypointScore === void 0) { minKeypointScore = 0.3; }
        if (maxNumPeople === void 0) { maxNumPeople = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var posesAboveScore, partSegmentationsByPersonData, partSegmentations, segmentationsData, longOffsetsData, partSegmentaionData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        posesAboveScore = poses.filter(function (pose) { return pose.score >= minPoseScore; });
                        if (!isWebGlBackend()) return [3 /*break*/, 2];
                        partSegmentations = tf.tidy(function () {
                            var masksTensorInfo = decodeMultipleMasksWebGl(segmentation, longOffsets, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps, minKeypointScore, maxNumPeople);
                            var masksTensor = tf.engine().makeTensorFromDataId(masksTensorInfo.dataId, masksTensorInfo.shape, masksTensorInfo.dtype);
                            return posesAboveScore.map(function (_, k) {
                                return toPersonKPartSegmentation(masksTensor, partSegmentation, k);
                            });
                        });
                        return [4 /*yield*/, Promise.all(partSegmentations.map(function (x) { return x.data(); }))];
                    case 1:
                        partSegmentationsByPersonData =
                            (_b.sent());
                        partSegmentations.forEach(function (x) { return x.dispose(); });
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, segmentation.data()];
                    case 3:
                        segmentationsData = _b.sent();
                        return [4 /*yield*/, longOffsets.data()];
                    case 4:
                        longOffsetsData = _b.sent();
                        return [4 /*yield*/, partSegmentation.data()];
                    case 5:
                        partSegmentaionData = _b.sent();
                        partSegmentationsByPersonData = decodeMultiplePartMasksCPU(segmentationsData, longOffsetsData, partSegmentaionData, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps);
                        _b.label = 6;
                    case 6: return [2 /*return*/, partSegmentationsByPersonData.map(function (data, k) { return ({ pose: posesAboveScore[k], data: data, height: height, width: width }); })];
                }
            });
        });
    }

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
    // algorithm based on Coursera Lecture from Algorithms, Part 1:
    // https://www.coursera.org/learn/algorithms-part1/lecture/ZjoSM/heapsort
    function half(k) {
        return Math.floor(k / 2);
    }
    var MaxHeap = /** @class */ (function () {
        function MaxHeap(maxSize, getElementValue) {
            this.priorityQueue = new Array(maxSize);
            this.numberOfElements = -1;
            this.getElementValue = getElementValue;
        }
        MaxHeap.prototype.enqueue = function (x) {
            this.priorityQueue[++this.numberOfElements] = x;
            this.swim(this.numberOfElements);
        };
        MaxHeap.prototype.dequeue = function () {
            var max = this.priorityQueue[0];
            this.exchange(0, this.numberOfElements--);
            this.sink(0);
            this.priorityQueue[this.numberOfElements + 1] = null;
            return max;
        };
        MaxHeap.prototype.empty = function () {
            return this.numberOfElements === -1;
        };
        MaxHeap.prototype.size = function () {
            return this.numberOfElements + 1;
        };
        MaxHeap.prototype.all = function () {
            return this.priorityQueue.slice(0, this.numberOfElements + 1);
        };
        MaxHeap.prototype.max = function () {
            return this.priorityQueue[0];
        };
        MaxHeap.prototype.swim = function (k) {
            while (k > 0 && this.less(half(k), k)) {
                this.exchange(k, half(k));
                k = half(k);
            }
        };
        MaxHeap.prototype.sink = function (k) {
            while (2 * k <= this.numberOfElements) {
                var j = 2 * k;
                if (j < this.numberOfElements && this.less(j, j + 1)) {
                    j++;
                }
                if (!this.less(k, j)) {
                    break;
                }
                this.exchange(k, j);
                k = j;
            }
        };
        MaxHeap.prototype.getValueAt = function (i) {
            return this.getElementValue(this.priorityQueue[i]);
        };
        MaxHeap.prototype.less = function (i, j) {
            return this.getValueAt(i) < this.getValueAt(j);
        };
        MaxHeap.prototype.exchange = function (i, j) {
            var t = this.priorityQueue[i];
            this.priorityQueue[i] = this.priorityQueue[j];
            this.priorityQueue[j] = t;
        };
        return MaxHeap;
    }());

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
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
    function scoreIsMaximumInLocalWindow(keypointId, score, heatmapY, heatmapX, localMaximumRadius, scores) {
        var _a = scores.shape, height = _a[0], width = _a[1];
        var localMaximum = true;
        var yStart = Math.max(heatmapY - localMaximumRadius, 0);
        var yEnd = Math.min(heatmapY + localMaximumRadius + 1, height);
        for (var yCurrent = yStart; yCurrent < yEnd; ++yCurrent) {
            var xStart = Math.max(heatmapX - localMaximumRadius, 0);
            var xEnd = Math.min(heatmapX + localMaximumRadius + 1, width);
            for (var xCurrent = xStart; xCurrent < xEnd; ++xCurrent) {
                if (scores.get(yCurrent, xCurrent, keypointId) > score) {
                    localMaximum = false;
                    break;
                }
            }
            if (!localMaximum) {
                break;
            }
        }
        return localMaximum;
    }
    /**
     * Builds a priority queue with part candidate positions for a specific image in
     * the batch. For this we find all local maxima in the score maps with score
     * values above a threshold. We create a single priority queue across all parts.
     */
    function buildPartWithScoreQueue(scoreThreshold, localMaximumRadius, scores) {
        var _a = scores.shape, height = _a[0], width = _a[1], numKeypoints = _a[2];
        var queue = new MaxHeap(height * width * numKeypoints, function (_a) {
            var score = _a.score;
            return score;
        });
        for (var heatmapY = 0; heatmapY < height; ++heatmapY) {
            for (var heatmapX = 0; heatmapX < width; ++heatmapX) {
                for (var keypointId = 0; keypointId < numKeypoints; ++keypointId) {
                    var score = scores.get(heatmapY, heatmapX, keypointId);
                    // Only consider parts with score greater or equal to threshold as
                    // root candidates.
                    if (score < scoreThreshold) {
                        continue;
                    }
                    // Only consider keypoints whose score is maximum in a local window.
                    if (scoreIsMaximumInLocalWindow(keypointId, score, heatmapY, heatmapX, localMaximumRadius, scores)) {
                        queue.enqueue({ score: score, part: { heatmapY: heatmapY, heatmapX: heatmapX, id: keypointId } });
                    }
                }
            }
        }
        return queue;
    }

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
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
    var parentChildrenTuples = POSE_CHAIN.map(function (_a) {
        var parentJoinName = _a[0], childJoinName = _a[1];
        return ([PART_IDS[parentJoinName], PART_IDS[childJoinName]]);
    });
    var parentToChildEdges = parentChildrenTuples.map(function (_a) {
        var childJointId = _a[1];
        return childJointId;
    });
    var childToParentEdges = parentChildrenTuples.map(function (_a) {
        var parentJointId = _a[0];
        return parentJointId;
    });
    function getDisplacement(edgeId, point, displacements) {
        var numEdges = displacements.shape[2] / 2;
        return {
            y: displacements.get(point.y, point.x, edgeId),
            x: displacements.get(point.y, point.x, numEdges + edgeId)
        };
    }
    function getStridedIndexNearPoint(point, outputStride, height, width) {
        return {
            y: clamp(Math.round(point.y / outputStride), 0, height - 1),
            x: clamp(Math.round(point.x / outputStride), 0, width - 1)
        };
    }
    /**
     * We get a new keypoint along the `edgeId` for the pose instance, assuming
     * that the position of the `idSource` part is already known. For this, we
     * follow the displacement vector from the source to target part (stored in
     * the `i`-t channel of the displacement tensor). The displaced keypoint
     * vector is refined using the offset vector by `offsetRefineStep` times.
     */
    function traverseToTargetKeypoint(edgeId, sourceKeypoint, targetKeypointId, scoresBuffer, offsets, outputStride, displacements, offsetRefineStep) {
        if (offsetRefineStep === void 0) { offsetRefineStep = 2; }
        var _a = scoresBuffer.shape, height = _a[0], width = _a[1];
        // Nearest neighbor interpolation for the source->target displacements.
        var sourceKeypointIndices = getStridedIndexNearPoint(sourceKeypoint.position, outputStride, height, width);
        var displacement = getDisplacement(edgeId, sourceKeypointIndices, displacements);
        var displacedPoint = addVectors(sourceKeypoint.position, displacement);
        var targetKeypoint = displacedPoint;
        for (var i = 0; i < offsetRefineStep; i++) {
            var targetKeypointIndices = getStridedIndexNearPoint(targetKeypoint, outputStride, height, width);
            var offsetPoint = getOffsetPoint(targetKeypointIndices.y, targetKeypointIndices.x, targetKeypointId, offsets);
            targetKeypoint = addVectors({
                x: targetKeypointIndices.x * outputStride,
                y: targetKeypointIndices.y * outputStride
            }, { x: offsetPoint.x, y: offsetPoint.y });
        }
        var targetKeyPointIndices = getStridedIndexNearPoint(targetKeypoint, outputStride, height, width);
        var score = scoresBuffer.get(targetKeyPointIndices.y, targetKeyPointIndices.x, targetKeypointId);
        return { position: targetKeypoint, part: PART_NAMES[targetKeypointId], score: score };
    }
    /**
     * Follows the displacement fields to decode the full pose of the object
     * instance given the position of a part that acts as root.
     *
     * @return An array of decoded keypoints and their scores for a single pose
     */
    function decodePose(root, scores, offsets, outputStride, displacementsFwd, displacementsBwd) {
        var numParts = scores.shape[2];
        var numEdges = parentToChildEdges.length;
        var instanceKeypoints = new Array(numParts);
        // Start a new detection instance at the position of the root.
        var rootPart = root.part, rootScore = root.score;
        var rootPoint = getImageCoords(rootPart, outputStride, offsets);
        instanceKeypoints[rootPart.id] = {
            score: rootScore,
            part: PART_NAMES[rootPart.id],
            position: rootPoint
        };
        // Decode the part positions upwards in the tree, following the backward
        // displacements.
        for (var edge = numEdges - 1; edge >= 0; --edge) {
            var sourceKeypointId = parentToChildEdges[edge];
            var targetKeypointId = childToParentEdges[edge];
            if (instanceKeypoints[sourceKeypointId] &&
                !instanceKeypoints[targetKeypointId]) {
                instanceKeypoints[targetKeypointId] = traverseToTargetKeypoint(edge, instanceKeypoints[sourceKeypointId], targetKeypointId, scores, offsets, outputStride, displacementsBwd);
            }
        }
        // Decode the part positions downwards in the tree, following the forward
        // displacements.
        for (var edge = 0; edge < numEdges; ++edge) {
            var sourceKeypointId = childToParentEdges[edge];
            var targetKeypointId = parentToChildEdges[edge];
            if (instanceKeypoints[sourceKeypointId] &&
                !instanceKeypoints[targetKeypointId]) {
                instanceKeypoints[targetKeypointId] = traverseToTargetKeypoint(edge, instanceKeypoints[sourceKeypointId], targetKeypointId, scores, offsets, outputStride, displacementsFwd);
            }
        }
        return instanceKeypoints;
    }

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
    function withinNmsRadiusOfCorrespondingPoint(poses, squaredNmsRadius, _a, keypointId) {
        var x = _a.x, y = _a.y;
        return poses.some(function (_a) {
            var keypoints = _a.keypoints;
            var correspondingKeypoint = keypoints[keypointId].position;
            return squaredDistance(y, x, correspondingKeypoint.y, correspondingKeypoint.x) <=
                squaredNmsRadius;
        });
    }
    /* Score the newly proposed object instance without taking into account
     * the scores of the parts that overlap with any previously detected
     * instance.
     */
    function getInstanceScore(existingPoses, squaredNmsRadius, instanceKeypoints) {
        var notOverlappedKeypointScores = instanceKeypoints.reduce(function (result, _a, keypointId) {
            var position = _a.position, score = _a.score;
            if (!withinNmsRadiusOfCorrespondingPoint(existingPoses, squaredNmsRadius, position, keypointId)) {
                result += score;
            }
            return result;
        }, 0.0);
        return notOverlappedKeypointScores /= instanceKeypoints.length;
    }
    // A point (y, x) is considered as root part candidate if its score is a
    // maximum in a window |y - y'| <= kLocalMaximumRadius, |x - x'| <=
    // kLocalMaximumRadius.
    var kLocalMaximumRadius = 1;
    /**
     * Detects multiple poses and finds their parts from part scores and
     * displacement vectors. It returns up to `maxDetections` object instance
     * detections in decreasing root score order. It works as follows: We first
     * create a priority queue with local part score maxima above
     * `scoreThreshold`, considering all parts at the same time. Then we
     * iteratively pull the top  element of the queue (in decreasing score order)
     * and treat it as a root candidate for a new object instance. To avoid
     * duplicate detections, we reject the root candidate if it is within a disk
     * of `nmsRadius` pixels from the corresponding part of a previously detected
     * instance, which is a form of part-based non-maximum suppression (NMS). If
     * the root candidate passes the NMS check, we start a new object instance
     * detection, treating the corresponding part as root and finding the
     * positions of the remaining parts by following the displacement vectors
     * along the tree-structured part graph. We assign to the newly detected
     * instance a score equal to the sum of scores of its parts which have not
     * been claimed by a previous instance (i.e., those at least `nmsRadius`
     * pixels away from the corresponding part of all previously detected
     * instances), divided by the total number of parts `numParts`.
     *
     * @param heatmapScores 3-D tensor with shape `[height, width, numParts]`.
     * The value of heatmapScores[y, x, k]` is the score of placing the `k`-th
     * object part at position `(y, x)`.
     *
     * @param offsets 3-D tensor with shape `[height, width, numParts * 2]`.
     * The value of [offsets[y, x, k], offsets[y, x, k + numParts]]` is the
     * short range offset vector of the `k`-th  object part at heatmap
     * position `(y, x)`.
     *
     * @param displacementsFwd 3-D tensor of shape
     * `[height, width, 2 * num_edges]`, where `num_edges = num_parts - 1` is the
     * number of edges (parent-child pairs) in the tree. It contains the forward
     * displacements between consecutive part from the root towards the leaves.
     *
     * @param displacementsBwd 3-D tensor of shape
     * `[height, width, 2 * num_edges]`, where `num_edges = num_parts - 1` is the
     * number of edges (parent-child pairs) in the tree. It contains the backward
     * displacements between consecutive part from the root towards the leaves.
     *
     * @param outputStride The output stride that was used when feed-forwarding
     * through the PoseNet model.  Must be 32, 16, or 8.
     *
     * @param maxPoseDetections Maximum number of returned instance detections per
     * image.
     *
     * @param scoreThreshold Only return instance detections that have root part
     * score greater or equal to this value. Defaults to 0.5.
     *
     * @param nmsRadius Non-maximum suppression part distance. It needs to be
     * strictly positive. Two parts suppress each other if they are less than
     * `nmsRadius` pixels away. Defaults to 20.
     *
     * @return An array of poses and their scores, each containing keypoints and
     * the corresponding keypoint scores.
     */
    function decodeMultiplePoses(scoresBuffer, offsetsBuffer, displacementsFwdBuffer, displacementsBwdBuffer, outputStride, maxPoseDetections, scoreThreshold, nmsRadius) {
        if (scoreThreshold === void 0) { scoreThreshold = 0.5; }
        if (nmsRadius === void 0) { nmsRadius = 20; }
        var poses = [];
        var queue = buildPartWithScoreQueue(scoreThreshold, kLocalMaximumRadius, scoresBuffer);
        var squaredNmsRadius = nmsRadius * nmsRadius;
        // Generate at most maxDetections object instances per image in
        // decreasing root part score order.
        while (poses.length < maxPoseDetections && !queue.empty()) {
            // The top element in the queue is the next root candidate.
            var root = queue.dequeue();
            // Part-based non-maximum suppression: We reject a root candidate if it
            // is within a disk of `nmsRadius` pixels from the corresponding part of
            // a previously detected instance.
            var rootImageCoords = getImageCoords(root.part, outputStride, offsetsBuffer);
            if (withinNmsRadiusOfCorrespondingPoint(poses, squaredNmsRadius, rootImageCoords, root.part.id)) {
                continue;
            }
            // Start a new detection instance at the position of the root.
            var keypoints = decodePose(root, scoresBuffer, offsetsBuffer, outputStride, displacementsFwdBuffer, displacementsBwdBuffer);
            var score = getInstanceScore(poses, squaredNmsRadius, keypoints);
            poses.push({ keypoints: keypoints, score: score });
        }
        return poses;
    }

    /**
     * @license
     * Copyright 2019 Google Inc. All Rights Reserved.
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
    var imageNetMean = [-123.15, -115.90, -103.06];
    var ResNet = /** @class */ (function (_super) {
        __extends(ResNet, _super);
        function ResNet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResNet.prototype.preprocessInput = function (input) {
            return tf.add(input, imageNetMean);
        };
        ResNet.prototype.nameOutputResults = function (results) {
            var displacementBwd = results[0], displacementFwd = results[1], heatmap = results[2], longOffsets = results[3], offsets = results[4], partHeatmaps = results[5], segmentation = results[6], partOffsets = results[7];
            return {
                offsets: offsets,
                segmentation: segmentation,
                partHeatmaps: partHeatmaps,
                longOffsets: longOffsets,
                heatmap: heatmap,
                displacementFwd: displacementFwd,
                displacementBwd: displacementBwd,
                partOffsets: partOffsets
            };
        };
        return ResNet;
    }(BaseModel));

    /**
     * @license
     * Copyright 2019 Google Inc. All Rights Reserved.
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
    var RESNET50_BASE_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/resnet50/';
    var MOBILENET_BASE_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/mobilenet/';
    // The BodyPix 2.0 ResNet50 models use the latest TensorFlow.js 1.0 model
    // format.
    function resNet50SavedModel(stride, quantBytes) {
        var graphJson = "model-stride" + stride + ".json";
        // quantBytes=4 corresponding to the non-quantized full-precision SavedModel.
        if (quantBytes === 4) {
            return RESNET50_BASE_URL + "float/" + graphJson;
        }
        else {
            return RESNET50_BASE_URL + ("quant" + quantBytes + "/") + graphJson;
        }
    }
    // The BodyPix 2.0 MobileNetV1 models use the latest TensorFlow.js 1.0 model
    // format.
    function mobileNetSavedModel(stride, multiplier, quantBytes) {
        var toStr = { 1.0: '100', 0.75: '075', 0.50: '050' };
        var graphJson = "model-stride" + stride + ".json";
        // quantBytes=4 corresponding to the non-quantized full-precision SavedModel.
        if (quantBytes === 4) {
            return MOBILENET_BASE_URL + ("float/" + toStr[multiplier] + "/") + graphJson;
        }
        else {
            return MOBILENET_BASE_URL + ("quant" + quantBytes + "/" + toStr[multiplier] + "/") +
                graphJson;
        }
    }

    /**
     * @license
     * Copyright 2020 Google Inc. All Rights Reserved.
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
     *
     * =============================================================================
     */
    var _a;
    function getSizeFromImageLikeElement(input) {
        if ('offsetHeight' in input && input.offsetHeight !== 0
            && 'offsetWidth' in input && input.offsetWidth !== 0) {
            return [input.offsetHeight, input.offsetWidth];
        }
        else if (input.height != null && input.width != null) {
            return [input.height, input.width];
        }
        else {
            throw new Error("HTMLImageElement must have height and width attributes set.");
        }
    }
    function getSizeFromVideoElement(input) {
        if (input.hasAttribute('height') && input.hasAttribute('width')) {
            // Prioritizes user specified height and width.
            // We can't test the .height and .width properties directly,
            // because they evaluate to 0 if unset.
            return [input.height, input.width];
        }
        else {
            return [input.videoHeight, input.videoWidth];
        }
    }
    function getInputSize(input) {
        if ((typeof (HTMLCanvasElement) !== 'undefined' &&
            input instanceof HTMLCanvasElement) ||
            (typeof (OffscreenCanvas) !== 'undefined' &&
                input instanceof OffscreenCanvas) ||
            (typeof (HTMLImageElement) !== 'undefined' &&
                input instanceof HTMLImageElement)) {
            return getSizeFromImageLikeElement(input);
        }
        else if (typeof (ImageData) !== 'undefined' && input instanceof ImageData) {
            return [input.height, input.width];
        }
        else if (typeof (HTMLVideoElement) !== 'undefined' &&
            input instanceof HTMLVideoElement) {
            return getSizeFromVideoElement(input);
        }
        else if (input instanceof tf.Tensor) {
            return [input.shape[0], input.shape[1]];
        }
        else {
            throw new Error("error: Unknown input type: " + input + ".");
        }
    }
    function isValidInputResolution(resolution, outputStride) {
        return (resolution - 1) % outputStride === 0;
    }
    function toValidInputResolution(inputResolution, outputStride) {
        if (isValidInputResolution(inputResolution, outputStride)) {
            return inputResolution;
        }
        return Math.floor(inputResolution / outputStride) * outputStride + 1;
    }
    var INTERNAL_RESOLUTION_STRING_OPTIONS = {
        low: 'low',
        medium: 'medium',
        high: 'high',
        full: 'full'
    };
    var INTERNAL_RESOLUTION_PERCENTAGES = (_a = {},
        _a[INTERNAL_RESOLUTION_STRING_OPTIONS.low] = 0.25,
        _a[INTERNAL_RESOLUTION_STRING_OPTIONS.medium] = 0.5,
        _a[INTERNAL_RESOLUTION_STRING_OPTIONS.high] = 0.75,
        _a[INTERNAL_RESOLUTION_STRING_OPTIONS.full] = 1.0,
        _a);
    var MIN_INTERNAL_RESOLUTION = 0.1;
    var MAX_INTERNAL_RESOLUTION = 2.0;
    function toInternalResolutionPercentage(internalResolution) {
        if (typeof internalResolution === 'string') {
            var result = INTERNAL_RESOLUTION_PERCENTAGES[internalResolution];
            tf.util.assert(typeof result === 'number', function () { return "string value of inputResolution must be one of " + Object.values(INTERNAL_RESOLUTION_STRING_OPTIONS)
                .join(',') + " but was " + internalResolution + "."; });
            return result;
        }
        else {
            tf.util.assert(typeof internalResolution === 'number' &&
                internalResolution <= MAX_INTERNAL_RESOLUTION &&
                internalResolution >= MIN_INTERNAL_RESOLUTION, function () {
                return "inputResolution must be a string or number between " + MIN_INTERNAL_RESOLUTION + " and " + MAX_INTERNAL_RESOLUTION + ", but " +
                    ("was " + internalResolution);
            });
            return internalResolution;
        }
    }
    function toInputResolutionHeightAndWidth(internalResolution, outputStride, _a) {
        var inputHeight = _a[0], inputWidth = _a[1];
        var internalResolutionPercentage = toInternalResolutionPercentage(internalResolution);
        return [
            toValidInputResolution(inputHeight * internalResolutionPercentage, outputStride),
            toValidInputResolution(inputWidth * internalResolutionPercentage, outputStride)
        ];
    }
    function toInputTensor(input) {
        // TODO: tf.browser.fromPixels types to support OffscreenCanvas
        // @ts-ignore
        return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
    }
    function scaleAndCropToInputTensorShape(tensor, _a, _b, _c, applySigmoidActivation) {
        var inputTensorHeight = _a[0], inputTensorWidth = _a[1];
        var resizedAndPaddedHeight = _b[0], resizedAndPaddedWidth = _b[1];
        var _d = _c[0], padT = _d[0], padB = _d[1], _e = _c[1], padL = _e[0], padR = _e[1];
        if (applySigmoidActivation === void 0) { applySigmoidActivation = false; }
        return tf.tidy(function () {
            var inResizedAndPadded = tf.image.resizeBilinear(tensor, [resizedAndPaddedHeight, resizedAndPaddedWidth], true);
            if (applySigmoidActivation) {
                inResizedAndPadded = tf.sigmoid(inResizedAndPadded);
            }
            return removePaddingAndResizeBack(inResizedAndPadded, [inputTensorHeight, inputTensorWidth], [[padT, padB], [padL, padR]]);
        });
    }
    function removePaddingAndResizeBack(resizedAndPadded, _a, _b) {
        var originalHeight = _a[0], originalWidth = _a[1];
        var _c = _b[0], padT = _c[0], padB = _c[1], _d = _b[1], padL = _d[0], padR = _d[1];
        return tf.tidy(function () {
            var batchedImage = tf.expandDims(resizedAndPadded);
            return tf.squeeze(tf.image
                .cropAndResize(batchedImage, [[
                    padT / (originalHeight + padT + padB - 1.0),
                    padL / (originalWidth + padL + padR - 1.0),
                    (padT + originalHeight - 1.0) /
                        (originalHeight + padT + padB - 1.0),
                    (padL + originalWidth - 1.0) / (originalWidth + padL + padR - 1.0)
                ]], [0], [originalHeight, originalWidth]), [0]);
        });
    }
    function padAndResizeTo(input, _a) {
        var targetH = _a[0], targetW = _a[1];
        var _b = getInputSize(input), height = _b[0], width = _b[1];
        var targetAspect = targetW / targetH;
        var aspect = width / height;
        var _c = [0, 0, 0, 0], padT = _c[0], padB = _c[1], padL = _c[2], padR = _c[3];
        if (aspect < targetAspect) {
            // pads the width
            padT = 0;
            padB = 0;
            padL = Math.round(0.5 * (targetAspect * height - width));
            padR = Math.round(0.5 * (targetAspect * height - width));
        }
        else {
            // pads the height
            padT = Math.round(0.5 * ((1.0 / targetAspect) * width - height));
            padB = Math.round(0.5 * ((1.0 / targetAspect) * width - height));
            padL = 0;
            padR = 0;
        }
        var resized = tf.tidy(function () {
            var imageTensor = toInputTensor(input);
            imageTensor = tf.pad3d(imageTensor, [[padT, padB], [padL, padR], [0, 0]]);
            return tf.image.resizeBilinear(imageTensor, [targetH, targetW]);
        });
        return { resized: resized, padding: { top: padT, left: padL, right: padR, bottom: padB } };
    }
    function toTensorBuffers3D(tensors) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(tensors.map(function (tensor) { return tensor.buffer(); }))];
            });
        });
    }
    function scalePose(pose, scaleY, scaleX, offsetY, offsetX) {
        if (offsetY === void 0) { offsetY = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        return {
            score: pose.score,
            keypoints: pose.keypoints.map(function (_a) {
                var score = _a.score, part = _a.part, position = _a.position;
                return ({
                    score: score,
                    part: part,
                    position: {
                        x: position.x * scaleX + offsetX,
                        y: position.y * scaleY + offsetY
                    }
                });
            })
        };
    }
    function scalePoses(poses, scaleY, scaleX, offsetY, offsetX) {
        if (offsetY === void 0) { offsetY = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        if (scaleX === 1 && scaleY === 1 && offsetY === 0 && offsetX === 0) {
            return poses;
        }
        return poses.map(function (pose) { return scalePose(pose, scaleY, scaleX, offsetY, offsetX); });
    }
    function flipPoseHorizontal(pose, imageWidth) {
        return {
            score: pose.score,
            keypoints: pose.keypoints.map(function (_a) {
                var score = _a.score, part = _a.part, position = _a.position;
                return ({
                    score: score,
                    part: part,
                    position: { x: imageWidth - 1 - position.x, y: position.y }
                });
            })
        };
    }
    function flipPosesHorizontal(poses, imageWidth) {
        if (imageWidth <= 0) {
            return poses;
        }
        return poses.map(function (pose) { return flipPoseHorizontal(pose, imageWidth); });
    }
    function scaleAndFlipPoses(poses, _a, _b, padding, flipHorizontal) {
        var height = _a[0], width = _a[1];
        var inputResolutionHeight = _b[0], inputResolutionWidth = _b[1];
        var scaleY = (height + padding.top + padding.bottom) / (inputResolutionHeight);
        var scaleX = (width + padding.left + padding.right) / (inputResolutionWidth);
        var scaledPoses = scalePoses(poses, scaleY, scaleX, -padding.top, -padding.left);
        if (flipHorizontal) {
            return flipPosesHorizontal(scaledPoses, width);
        }
        else {
            return scaledPoses;
        }
    }

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
    var PERSON_INFERENCE_CONFIG = {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.7,
        maxDetections: 10,
        scoreThreshold: 0.4,
        nmsRadius: 20,
    };
    var MULTI_PERSON_INSTANCE_INFERENCE_CONFIG = {
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
            var _a = getInputSize(input), height = _a[0], width = _a[1];
            var internalResolutionHeightAndWidth = toInputResolutionHeightAndWidth(internalResolution, this.baseModel.outputStride, [height, width]);
            var _b = padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
            var _c = tf.tidy(function () {
                var _a = _this.predictForPersonSegmentation(resized), segmentLogits = _a.segmentLogits, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
                var _b = resized.shape, resizedHeight = _b[0], resizedWidth = _b[1];
                var scaledSegmentScores = scaleAndCropToInputTensorShape(segmentLogits, [height, width], [resizedHeight, resizedWidth], [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                return {
                    segmentation: toMaskTensor(tf.squeeze(scaledSegmentScores), segmentationThreshold),
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
            if (config === void 0) { config = PERSON_INFERENCE_CONFIG; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, segmentation, heatmapScores, offsets, displacementFwd, displacementBwd, padding, internalResolutionHeightAndWidth, _b, height, width, result, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            config = __assign(__assign({}, PERSON_INFERENCE_CONFIG), config);
                            validatePersonInferenceConfig(config);
                            _a = this.segmentPersonActivation(input, config.internalResolution, config.segmentationThreshold), segmentation = _a.segmentation, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, padding = _a.padding, internalResolutionHeightAndWidth = _a.internalResolutionHeightAndWidth;
                            _b = segmentation.shape, height = _b[0], width = _b[1];
                            return [4 /*yield*/, segmentation.data()];
                        case 1:
                            result = _c.sent();
                            segmentation.dispose();
                            return [4 /*yield*/, toTensorBuffers3D([heatmapScores, offsets, displacementFwd, displacementBwd])];
                        case 2:
                            tensorBuffers = _c.sent();
                            scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                            poses = decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                            poses = scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
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
            if (config === void 0) { config = MULTI_PERSON_INSTANCE_INFERENCE_CONFIG; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, height, width, internalResolutionHeightAndWidth, _b, resized, padding, _c, segmentation, longOffsets, heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses, instanceMasks;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            config = __assign(__assign({}, MULTI_PERSON_INSTANCE_INFERENCE_CONFIG), config);
                            validateMultiPersonInstanceInferenceConfig(config);
                            _a = getInputSize(input), height = _a[0], width = _a[1];
                            internalResolutionHeightAndWidth = toInputResolutionHeightAndWidth(config.internalResolution, this.baseModel.outputStride, [height, width]);
                            _b = padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
                            _c = tf.tidy(function () {
                                var _a = _this.predictForMultiPersonInstanceSegmentationAndPart(resized), segmentLogits = _a.segmentLogits, longOffsets = _a.longOffsets, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
                                var scaledSegmentScores = scaleAndCropToInputTensorShape(segmentLogits, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                                var scaledLongOffsets;
                                {
                                    scaledLongOffsets = longOffsets;
                                }
                                var segmentation = toMaskTensor(tf.squeeze(scaledSegmentScores), config.segmentationThreshold);
                                return {
                                    segmentation: segmentation,
                                    longOffsets: scaledLongOffsets,
                                    heatmapScoresRaw: heatmapScores,
                                    offsetsRaw: offsets,
                                    displacementFwdRaw: displacementFwd,
                                    displacementBwdRaw: displacementBwd,
                                };
                            }), segmentation = _c.segmentation, longOffsets = _c.longOffsets, heatmapScoresRaw = _c.heatmapScoresRaw, offsetsRaw = _c.offsetsRaw, displacementFwdRaw = _c.displacementFwdRaw, displacementBwdRaw = _c.displacementBwdRaw;
                            return [4 /*yield*/, toTensorBuffers3D([heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw])];
                        case 1:
                            tensorBuffers = _d.sent();
                            scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                            poses = decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                            poses = scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
                            return [4 /*yield*/, decodePersonInstanceMasks(segmentation, longOffsets, poses, height, width, this.baseModel.outputStride, internalResolutionHeightAndWidth, padding, config.scoreThreshold, config.refineSteps, config.minKeypointScore, config.maxDetections)];
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
            var _a = getInputSize(input), height = _a[0], width = _a[1];
            var internalResolutionHeightAndWidth = toInputResolutionHeightAndWidth(internalResolution, this.baseModel.outputStride, [height, width]);
            var _b = padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
            var _c = tf.tidy(function () {
                var _a = _this.predictForPersonSegmentationAndPart(resized), segmentLogits = _a.segmentLogits, partHeatmapLogits = _a.partHeatmapLogits, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd;
                var _b = resized.shape, resizedHeight = _b[0], resizedWidth = _b[1];
                var scaledSegmentScores = scaleAndCropToInputTensorShape(segmentLogits, [height, width], [resizedHeight, resizedWidth], [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                var scaledPartHeatmapScore = scaleAndCropToInputTensorShape(partHeatmapLogits, [height, width], [resizedHeight, resizedWidth], [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                var segmentation = toMaskTensor(tf.squeeze(scaledSegmentScores), segmentationThreshold);
                return {
                    partSegmentation: decodePartSegmentation(segmentation, scaledPartHeatmapScore),
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
            if (config === void 0) { config = PERSON_INFERENCE_CONFIG; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, partSegmentation, heatmapScores, offsets, displacementFwd, displacementBwd, padding, internalResolutionHeightAndWidth, _b, height, width, data, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            config = __assign(__assign({}, PERSON_INFERENCE_CONFIG), config);
                            validatePersonInferenceConfig(config);
                            _a = this.segmentPersonPartsActivation(input, config.internalResolution, config.segmentationThreshold), partSegmentation = _a.partSegmentation, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, padding = _a.padding, internalResolutionHeightAndWidth = _a.internalResolutionHeightAndWidth;
                            _b = partSegmentation.shape, height = _b[0], width = _b[1];
                            return [4 /*yield*/, partSegmentation.data()];
                        case 1:
                            data = _c.sent();
                            partSegmentation.dispose();
                            return [4 /*yield*/, toTensorBuffers3D([heatmapScores, offsets, displacementFwd, displacementBwd])];
                        case 2:
                            tensorBuffers = _c.sent();
                            scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                            poses = decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                            poses = scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
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
            if (config === void 0) { config = MULTI_PERSON_INSTANCE_INFERENCE_CONFIG; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, height, width, internalResolutionHeightAndWidth, _b, resized, padding, _c, segmentation, longOffsets, heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw, partSegmentation, tensorBuffers, scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, poses, instanceMasks;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            config = __assign(__assign({}, MULTI_PERSON_INSTANCE_INFERENCE_CONFIG), config);
                            validateMultiPersonInstanceInferenceConfig(config);
                            _a = getInputSize(input), height = _a[0], width = _a[1];
                            internalResolutionHeightAndWidth = toInputResolutionHeightAndWidth(config.internalResolution, this.baseModel.outputStride, [height, width]);
                            _b = padAndResizeTo(input, internalResolutionHeightAndWidth), resized = _b.resized, padding = _b.padding;
                            _c = tf.tidy(function () {
                                var _a = _this.predictForMultiPersonInstanceSegmentationAndPart(resized), segmentLogits = _a.segmentLogits, longOffsets = _a.longOffsets, heatmapScores = _a.heatmapScores, offsets = _a.offsets, displacementFwd = _a.displacementFwd, displacementBwd = _a.displacementBwd, partHeatmaps = _a.partHeatmaps;
                                // decoding with scaling.
                                var scaledSegmentScores = scaleAndCropToInputTensorShape(segmentLogits, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                                // decoding with scaling.
                                var scaledPartSegmentationScores = scaleAndCropToInputTensorShape(partHeatmaps, [height, width], internalResolutionHeightAndWidth, [[padding.top, padding.bottom], [padding.left, padding.right]], APPLY_SIGMOID_ACTIVATION);
                                var scaledLongOffsets = longOffsets;
                                var segmentation = toMaskTensor(tf.squeeze(scaledSegmentScores), config.segmentationThreshold);
                                var partSegmentation = decodeOnlyPartSegmentation(scaledPartSegmentationScores);
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
                            return [4 /*yield*/, toTensorBuffers3D([heatmapScoresRaw, offsetsRaw, displacementFwdRaw, displacementBwdRaw])];
                        case 1:
                            tensorBuffers = _d.sent();
                            scoresBuf = tensorBuffers[0], offsetsBuf = tensorBuffers[1], displacementsFwdBuf = tensorBuffers[2], displacementsBwdBuf = tensorBuffers[3];
                            poses = decodeMultiplePoses(scoresBuf, offsetsBuf, displacementsFwdBuf, displacementsBwdBuf, this.baseModel.outputStride, config.maxDetections, config.scoreThreshold, config.nmsRadius);
                            poses = scaleAndFlipPoses(poses, [height, width], internalResolutionHeightAndWidth, padding, FLIP_POSES_AFTER_SCALING);
                            return [4 /*yield*/, decodePersonInstancePartMasks(segmentation, longOffsets, partSegmentation, poses, height, width, this.baseModel.outputStride, internalResolutionHeightAndWidth, padding, config.scoreThreshold, config.refineSteps, config.minKeypointScore, config.maxDetections)];
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
                        url = mobileNetSavedModel(outputStride, multiplier, quantBytes);
                        return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl || url)];
                    case 1:
                        graphModel = _a.sent();
                        mobilenet = new MobileNet(graphModel, outputStride);
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
                        url = resNet50SavedModel(outputStride, quantBytes);
                        return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl || url)];
                    case 1:
                        graphModel = _a.sent();
                        resnet = new ResNet(graphModel, outputStride);
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
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google Inc. All Rights Reserved.
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
     *
     * =============================================================================
     */
    var PART_CHANNELS = [
        'left_face',
        'right_face',
        'left_upper_arm_front',
        'left_upper_arm_back',
        'right_upper_arm_front',
        'right_upper_arm_back',
        'left_lower_arm_front',
        'left_lower_arm_back',
        'right_lower_arm_front',
        'right_lower_arm_back',
        'left_hand',
        'right_hand',
        'torso_front',
        'torso_back',
        'left_upper_leg_front',
        'left_upper_leg_back',
        'right_upper_leg_front',
        'right_upper_leg_back',
        'left_lower_leg_front',
        'left_lower_leg_back',
        'right_lower_leg_front',
        'right_lower_leg_back',
        'left_feet',
        'right_feet'
    ];

    var BodyPixMask = /** @class */ (function () {
        function BodyPixMask(mask) {
            this.mask = mask;
        }
        BodyPixMask.prototype.toCanvasImageSource = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toHTMLCanvasElementLossy(this.mask)];
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
                    return [2 /*return*/, toTensorLossy(this.mask)];
                });
            });
        };
        BodyPixMask.prototype.getUnderlyingType = function () {
            return 'imagedata';
        };
        return BodyPixMask;
    }());
    function singleMaskValueToLabel(maskValue) {
        assertMaskValue(maskValue);
        if (maskValue !== 255) {
            throw new Error("Foreground id must be 255 but got " + maskValue);
        }
        return 'person';
    }
    function multiMaskValueToLabel(maskValue) {
        assertMaskValue(maskValue);
        if (maskValue >= PART_CHANNELS.length) {
            throw new Error("Invalid body part value " + maskValue);
        }
        return PART_CHANNELS[maskValue];
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
                                        rgbaData[i * 4] = PART_CHANNELS.length;
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
    function load$1(modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, load(modelConfig).then(function (model) { return new BodyPixSegmenter(model); })];
            });
        });
    }

    var DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG = {
        runtime: 'mediapipe',
        modelType: 'general'
    };

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
    function validateModelConfig$1(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG);
        }
        var config = __assign({}, modelConfig);
        config.runtime = 'mediapipe';
        if (config.modelType == null) {
            config.modelType =
                DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG.modelType;
        }
        return config;
    }

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
                    return [2 /*return*/, toImageDataLossy(this.mask)];
                });
            });
        };
        MediaPipeSelfieSegmentationMediaPipeMask.prototype.toTensor = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toTensorLossy(this.mask)];
                });
            });
        };
        MediaPipeSelfieSegmentationMediaPipeMask.prototype.getUnderlyingType = function () {
            return 'canvasimagesource';
        };
        return MediaPipeSelfieSegmentationMediaPipeMask;
    }());
    function maskValueToLabel(maskValue) {
        assertMaskValue(maskValue);
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
    function load$2(modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, segmenter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = validateModelConfig$1(modelConfig);
                        segmenter = new MediaPipeSelfieSegmentationMediaPipeSegmenter(config);
                        return [4 /*yield*/, segmenter.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, segmenter];
                }
            });
        });
    }

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
    function arrayToMatrix4x4(array) {
        if (array.length !== 16) {
            throw new Error("Array length must be 16 but got " + array.length);
        }
        return [
            [array[0], array[1], array[2], array[3]],
            [array[4], array[5], array[6], array[7]],
            [array[8], array[9], array[10], array[11]],
            [array[12], array[13], array[14], array[15]],
        ];
    }

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
    /**
     * Generates a 4x4 projective transform matrix M, so that for any point in the
     * subRect image p(x, y), we can use the matrix to calculate the projected point
     * in the original image p' (x', y'): p' = p * M;
     *
     * @param subRect Rotated sub rect in absolute coordinates.
     * @param rectWidth
     * @param rectHeight
     * @param flipHorizontaly Whether to flip the image horizontally.
     */
    // Ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_utils.h
    function getRotatedSubRectToRectTransformMatrix(subRect, rectWidth, rectHeight, flipHorizontally) {
        // The resulting matrix is multiplication of below commented out matrices:
        //   postScaleMatrix
        //     * translateMatrix
        //     * rotateMatrix
        //     * flipMatrix
        //     * scaleMatrix
        //     * initialTranslateMatrix
        // For any point in the transformed image p, we can use the above matrix to
        // calculate the projected point in the original image p'. So that:
        // p' = p * M;
        // Note: The transform matrix below assumes image coordinates is normalized
        // to [0, 1] range.
        // Matrix to convert X,Y to [-0.5, 0.5] range "initialTranslateMatrix"
        // [ 1.0,  0.0, 0.0, -0.5]
        // [ 0.0,  1.0, 0.0, -0.5]
        // [ 0.0,  0.0, 1.0,  0.0]
        // [ 0.0,  0.0, 0.0,  1.0]
        var a = subRect.width;
        var b = subRect.height;
        // Matrix to scale X,Y,Z to sub rect "scaleMatrix"
        // Z has the same scale as X.
        // [   a, 0.0, 0.0, 0.0]
        // [0.0,    b, 0.0, 0.0]
        // [0.0, 0.0,    a, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var flip = flipHorizontally ? -1 : 1;
        // Matrix for optional horizontal flip around middle of output image.
        // [ fl  , 0.0, 0.0, 0.0]
        // [ 0.0, 1.0, 0.0, 0.0]
        // [ 0.0, 0.0, 1.0, 0.0]
        // [ 0.0, 0.0, 0.0, 1.0]
        var c = Math.cos(subRect.rotation);
        var d = Math.sin(subRect.rotation);
        // Matrix to do rotation around Z axis "rotateMatrix"
        // [    c,   -d, 0.0, 0.0]
        // [    d,    c, 0.0, 0.0]
        // [ 0.0, 0.0, 1.0, 0.0]
        // [ 0.0, 0.0, 0.0, 1.0]
        var e = subRect.xCenter;
        var f = subRect.yCenter;
        // Matrix to do X,Y translation of sub rect within parent rect
        // "translateMatrix"
        // [1.0, 0.0, 0.0, e   ]
        // [0.0, 1.0, 0.0, f   ]
        // [0.0, 0.0, 1.0, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var g = 1.0 / rectWidth;
        var h = 1.0 / rectHeight;
        // Matrix to scale X,Y,Z to [0.0, 1.0] range "postScaleMatrix"
        // [g,    0.0, 0.0, 0.0]
        // [0.0, h,    0.0, 0.0]
        // [0.0, 0.0,    g, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var matrix = new Array(16);
        // row 1
        matrix[0] = a * c * flip * g;
        matrix[1] = -b * d * g;
        matrix[2] = 0.0;
        matrix[3] = (-0.5 * a * c * flip + 0.5 * b * d + e) * g;
        // row 2
        matrix[4] = a * d * flip * h;
        matrix[5] = b * c * h;
        matrix[6] = 0.0;
        matrix[7] = (-0.5 * b * c - 0.5 * a * d * flip + f) * h;
        // row 3
        matrix[8] = 0.0;
        matrix[9] = 0.0;
        matrix[10] = a * g;
        matrix[11] = 0.0;
        // row 4
        matrix[12] = 0.0;
        matrix[13] = 0.0;
        matrix[14] = 0.0;
        matrix[15] = 1.0;
        return arrayToMatrix4x4(matrix);
    }

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
    function getImageSize(input) {
        if (input instanceof tf.Tensor) {
            return { height: input.shape[0], width: input.shape[1] };
        }
        else {
            return { height: input.height, width: input.width };
        }
    }
    /**
     * Transform value ranges.
     * @param fromMin Min of original value range.
     * @param fromMax Max of original value range.
     * @param toMin New min of transformed value range.
     * @param toMax New max of transformed value range.
     */
    function transformValueRange(fromMin, fromMax, toMin, toMax) {
        var fromRange = fromMax - fromMin;
        var toRange = toMax - toMin;
        if (fromRange === 0) {
            throw new Error("Original min and max are both " + fromMin + ", range cannot be 0.");
        }
        var scale = toRange / fromRange;
        var offset = toMin - fromMin * scale;
        return { scale: scale, offset: offset };
    }
    /**
     * Convert an image to an image tensor representation.
     *
     * The image tensor has a shape [1, height, width, colorChannel].
     *
     * @param input An image, video frame, or image tensor.
     */
    function toImageTensor(input) {
        return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
    }
    /**
     * Padding ratio of left, top, right, bottom, based on the output dimensions.
     *
     * The padding values are non-zero only when the "keep_aspect_ratio" is true.
     *
     * For instance, when the input image is 10x10 (width x height) and the
     * output dimensions is 20x40 and "keep_aspect_ratio" is true, we should scale
     * the input image to 20x20 and places it in the middle of the output image with
     * an equal padding of 10 pixels at the top and the bottom. The result is
     * therefore {left: 0, top: 0.25, right: 0, bottom: 0.25} (10/40 = 0.25f).
     * @param roi The original rectangle to pad.
     * @param targetSize The target width and height of the result rectangle.
     * @param keepAspectRatio Whether keep aspect ratio. Default to false.
     */
    function padRoi(roi, targetSize, keepAspectRatio) {
        if (keepAspectRatio === void 0) { keepAspectRatio = false; }
        if (!keepAspectRatio) {
            return { top: 0, left: 0, right: 0, bottom: 0 };
        }
        var targetH = targetSize.height;
        var targetW = targetSize.width;
        validateSize(targetSize, 'targetSize');
        validateSize(roi, 'roi');
        var tensorAspectRatio = targetH / targetW;
        var roiAspectRatio = roi.height / roi.width;
        var newWidth;
        var newHeight;
        var horizontalPadding = 0;
        var verticalPadding = 0;
        if (tensorAspectRatio > roiAspectRatio) {
            // pad height;
            newWidth = roi.width;
            newHeight = roi.width * tensorAspectRatio;
            verticalPadding = (1 - roiAspectRatio / tensorAspectRatio) / 2;
        }
        else {
            // pad width.
            newWidth = roi.height / tensorAspectRatio;
            newHeight = roi.height;
            horizontalPadding = (1 - tensorAspectRatio / roiAspectRatio) / 2;
        }
        roi.width = newWidth;
        roi.height = newHeight;
        return {
            top: verticalPadding,
            left: horizontalPadding,
            right: horizontalPadding,
            bottom: verticalPadding
        };
    }
    /**
     * Get the rectangle information of an image, including xCenter, yCenter, width,
     * height and rotation.
     *
     * @param imageSize imageSize is used to calculate the rectangle.
     * @param normRect Optional. If normRect is not null, it will be used to get
     *     a subarea rectangle information in the image. `imageSize` is used to
     *     calculate the actual non-normalized coordinates.
     */
    function getRoi(imageSize, normRect) {
        if (normRect) {
            return {
                xCenter: normRect.xCenter * imageSize.width,
                yCenter: normRect.yCenter * imageSize.height,
                width: normRect.width * imageSize.width,
                height: normRect.height * imageSize.height,
                rotation: normRect.rotation
            };
        }
        else {
            return {
                xCenter: 0.5 * imageSize.width,
                yCenter: 0.5 * imageSize.height,
                width: imageSize.width,
                height: imageSize.height,
                rotation: 0
            };
        }
    }
    /**
     * Generate the projective transformation matrix to be used for `tf.transform`.
     *
     * See more documentation in `tf.transform`.
     *
     * @param matrix The transformation matrix mapping subRect to rect, can be
     *     computed using `getRotatedSubRectToRectTransformMatrix` calculator.
     * @param imageSize The original image height and width.
     * @param inputResolution The target height and width.
     */
    function getProjectiveTransformMatrix(matrix, imageSize, inputResolution) {
        validateSize(inputResolution, 'inputResolution');
        // To use M with regular x, y coordinates, we need to normalize them first.
        // Because x' = a0 * x + a1 * y + a2, y' = b0 * x + b1 * y + b2,
        // we need to use factor (1/inputResolution.width) to normalize x for a0 and
        // b0, similarly we need to use factor (1/inputResolution.height) to normalize
        // y for a1 and b1.
        // Also at the end, we need to de-normalize x' and y' to regular coordinates.
        // So we need to use factor imageSize.width for a0, a1 and a2, similarly
        // we need to use factor imageSize.height for b0, b1 and b2.
        var a0 = (1 / inputResolution.width) * matrix[0][0] * imageSize.width;
        var a1 = (1 / inputResolution.height) * matrix[0][1] * imageSize.width;
        var a2 = matrix[0][3] * imageSize.width;
        var b0 = (1 / inputResolution.width) * matrix[1][0] * imageSize.height;
        var b1 = (1 / inputResolution.height) * matrix[1][1] * imageSize.height;
        var b2 = matrix[1][3] * imageSize.height;
        return [a0, a1, a2, b0, b1, b2, 0, 0];
    }
    function validateSize(size, name) {
        tf.util.assert(size.width !== 0, function () { return name + " width cannot be 0."; });
        tf.util.assert(size.height !== 0, function () { return name + " height cannot be 0."; });
    }

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
    function shiftImageValue(image, outputFloatRange) {
        // Calculate the scale and offset to shift from [0, 255] to [-1, 1].
        var valueRange = transformValueRange(0, 255, outputFloatRange[0] /* min */, outputFloatRange[1] /* max */);
        // Shift value range.
        return tf.tidy(function () { return tf.add(tf.mul(image, valueRange.scale), valueRange.offset); });
    }

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
    /**
     * Convert an image or part of it to an image tensor.
     *
     * @param image An image, video frame or image tensor.
     * @param config
     *      inputResolution: The target height and width.
     *      keepAspectRatio?: Whether target tensor should keep aspect ratio.
     * @param normRect A normalized rectangle, representing the subarea to crop from
     *      the image. If normRect is provided, the returned image tensor represents
     *      the subarea.
     * @returns A map with the following properties:
     *     - imageTensor
     *     - padding: Padding ratio of left, top, right, bottom, based on the output
     * dimensions.
     *     - transformationMatrix: Projective transform matrix used to transform
     * input image to transformed image.
     */
    function convertImageToTensor(image, config, normRect) {
        var outputTensorSize = config.outputTensorSize, keepAspectRatio = config.keepAspectRatio, borderMode = config.borderMode, outputTensorFloatRange = config.outputTensorFloatRange;
        // Ref:
        // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_calculator.cc
        var imageSize = getImageSize(image);
        var roi = getRoi(imageSize, normRect);
        var padding = padRoi(roi, outputTensorSize, keepAspectRatio);
        var transformationMatrix = getRotatedSubRectToRectTransformMatrix(roi, imageSize.width, imageSize.height, false);
        var imageTensor = tf.tidy(function () {
            var $image = toImageTensor(image);
            var transformMatrix = tf.tensor2d(getProjectiveTransformMatrix(transformationMatrix, imageSize, outputTensorSize), [1, 8]);
            var fillMode = borderMode === 'zero' ? 'constant' : 'nearest';
            var imageTransformed = tf.image.transform(
            // tslint:disable-next-line: no-unnecessary-type-assertion
            tf.expandDims(tf.cast($image, 'float32')), transformMatrix, 'bilinear', fillMode, 0, [outputTensorSize.height, outputTensorSize.width]);
            var imageShifted = outputTensorFloatRange != null ?
                shiftImageValue(imageTransformed, outputTensorFloatRange) :
                imageTransformed;
            return imageShifted;
        });
        return { imageTensor: imageTensor, padding: padding, transformationMatrix: transformationMatrix };
    }

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
    /**
     * Converts a tensor from a segmentation model to an image mask.
     * @param segmentationTensor Output from segmentation model of shape (1, height,
     *     width, channels).
     * @param config Contains activation to apply.
     * @param outputSize Desired dimensions of output image mask.
     *
     * @returns Image mask.
     */
    function tensorsToSegmentation(segmentationTensor, config, outputSize) {
        return tf.tidy(function () {
            // Remove batch dimension.
            var $segmentationTensor = 
            // tslint:disable-next-line: no-unnecessary-type-assertion
            tf.squeeze(segmentationTensor, [0]);
            var tensorChannels = $segmentationTensor.shape[2];
            // Process mask tensor and apply activation function.
            if (tensorChannels === 1) {
                // Create initial working mask.
                var smallMaskMat = $segmentationTensor;
                switch (config.activation) {
                    case 'none':
                        break;
                    case 'sigmoid':
                        smallMaskMat = tf.sigmoid(smallMaskMat);
                        break;
                    case 'softmax':
                        throw new Error('Softmax activation requires two channels.');
                    default:
                        throw new Error("Activation not supported (" + config.activation + ")");
                }
                var outputMat = outputSize ?
                    tf.image.resizeBilinear(smallMaskMat, [outputSize.height, outputSize.width]) :
                    smallMaskMat;
                // Remove channel dimension.
                return tf.squeeze(outputMat, [2]);
            }
            else {
                throw new Error("Unsupported number of tensor channels " + tensorChannels);
            }
        });
    }

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
    var DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_URL_GENERAL = 'https://tfhub.dev/mediapipe/tfjs-model/selfie_segmentation/general/1';
    var DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_URL_LANDSCAPE = 'https://tfhub.dev/mediapipe/tfjs-model/selfie_segmentation/landscape/1';
    var DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_CONFIG = {
        runtime: 'tfjs',
        modelType: 'general',
        modelUrl: DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_URL_GENERAL,
    };
    var DEFAULT_TFJS_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG = {
        flipHorizontal: false,
    };
    var SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_GENERAL_CONFIG = {
        outputTensorSize: { width: 256, height: 256 },
        keepAspectRatio: false,
        borderMode: 'zero',
        outputTensorFloatRange: [0, 1]
    };
    var SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_LANDSCAPE_CONFIG = {
        outputTensorSize: { width: 256, height: 144 },
        keepAspectRatio: false,
        borderMode: 'zero',
        outputTensorFloatRange: [0, 1]
    };
    var SELFIE_SEGMENTATION_TENSORS_TO_SEGMENTATION_CONFIG = {
        activation: 'none'
    };

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
    function validateModelConfig$2(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_CONFIG);
        }
        var config = __assign({}, modelConfig);
        config.runtime = 'tfjs';
        if (config.modelType == null) {
            config.modelType = DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_CONFIG.modelType;
        }
        if (config.modelType !== 'general' && config.modelType !== 'landscape') {
            throw new Error("Model type must be one of general or landscape, but got " + config.modelType);
        }
        if (config.modelUrl == null) {
            switch (config.modelType) {
                case 'general':
                    config.modelUrl = DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_URL_GENERAL;
                    break;
                case 'landscape':
                default:
                    config.modelUrl = DEFAULT_TFJS_SELFIE_SEGMENTATION_MODEL_URL_LANDSCAPE;
                    break;
            }
        }
        return config;
    }
    function validateSegmentationConfig(segmentationConfig) {
        if (segmentationConfig == null) {
            return __assign({}, DEFAULT_TFJS_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG);
        }
        var config = __assign({}, segmentationConfig);
        if (config.flipHorizontal == null) {
            config.flipHorizontal =
                DEFAULT_TFJS_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG.flipHorizontal;
        }
        return config;
    }

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
    var MediaPipeSelfieSegmentationTfjsMask = /** @class */ (function () {
        function MediaPipeSelfieSegmentationTfjsMask(mask) {
            this.mask = mask;
        }
        MediaPipeSelfieSegmentationTfjsMask.prototype.toCanvasImageSource = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toHTMLCanvasElementLossy(this.mask)];
                });
            });
        };
        MediaPipeSelfieSegmentationTfjsMask.prototype.toImageData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toImageDataLossy(this.mask)];
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
    function maskValueToLabel$1(maskValue) {
        assertMaskValue(maskValue);
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
                    segmentationConfig = validateSegmentationConfig(segmentationConfig);
                    if (image == null) {
                        this.reset();
                        return [2 /*return*/, []];
                    }
                    rgbaMask = tf.tidy(function () {
                        // SelfieSegmentationCpu: ImageToTensorCalculator.
                        // Resizes the input image into a tensor with a dimension desired by the
                        // model.
                        var imageValueShifted = convertImageToTensor(image, _this.modelType === 'general' ?
                            SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_GENERAL_CONFIG :
                            SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_LANDSCAPE_CONFIG).imageTensor;
                        // SelfieSegmentationCpu: InferenceCalculator
                        // The model returns a tensor with the following shape:
                        // [1 (batch), 144, 256] or [1 (batch), 256, 256, 2] depending on
                        // modelType.
                        var segmentationTensor = 
                        // Slice activation output only.
                        tf.slice(_this.model.predict(imageValueShifted), [0, 0, 0, 1], -1);
                        // SelfieSegmentationCpu: ImagePropertiesCalculator
                        // Retrieves the size of the input image.
                        var imageSize = getImageSize(image);
                        // SelfieSegmentationCpu: TensorsToSegmentationCalculator
                        // Processes the output tensors into a segmentation mask that has the same
                        // size as the input image into the graph.
                        var maskImage = tensorsToSegmentation(segmentationTensor, SELFIE_SEGMENTATION_TENSORS_TO_SEGMENTATION_CONFIG, imageSize);
                        // Grayscale to RGBA
                        // tslint:disable-next-line: no-unnecessary-type-assertion
                        var mask3D = tf.expandDims(maskImage, 2);
                        var rgMask = tf.pad(mask3D, [[0, 0], [0, 0], [0, 1]]);
                        return tf.mirrorPad(rgMask, [[0, 0], [0, 0], [0, 2]], 'symmetric');
                    });
                    return [2 /*return*/, [{
                                maskValueToLabel: maskValueToLabel$1,
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
    function load$3(modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, modelFromTFHub, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = validateModelConfig$2(modelConfig);
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

    (function (SupportedModels) {
        SupportedModels["BodyPix"] = "BodyPix";
        SupportedModels["MediaPipeSelfieSegmentation"] = "MediaPipeSelfieSegmentation";
    })(exports.SupportedModels || (exports.SupportedModels = {}));

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
    /**
     * Create a body segmenter instance.
     *
     * @param model The name of the pipeline to load.
     * @param modelConfig The configuration for the pipeline to load.
     */
    function createSegmenter(model, modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, runtime, config;
            return __generator(this, function (_a) {
                switch (model) {
                    case exports.SupportedModels.MediaPipeSelfieSegmentation: {
                        config = modelConfig;
                        runtime = void 0;
                        if (config != null) {
                            if (config.runtime === 'tfjs') {
                                return [2 /*return*/, load$3(config)];
                            }
                            if (config.runtime === 'mediapipe') {
                                return [2 /*return*/, load$2(config)];
                            }
                            runtime = config.runtime;
                        }
                        throw new Error("Expect modelConfig.runtime to be either 'tfjs' " +
                            ("or 'mediapipe', but got " + runtime));
                    }
                    case exports.SupportedModels.BodyPix: {
                        config = modelConfig;
                        return [2 /*return*/, load$1(config)];
                    }
                    default:
                        throw new Error(model + " is not a supported model name.");
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2021 Google LLC. All Rights Reserved.
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
    var CANVAS_NAMES = {
        blurred: 'blurred',
        blurredMask: 'blurred-mask',
        mask: 'mask',
        lowresPartMask: 'lowres-part-mask',
        drawImage: 'draw-image',
    };
    var offScreenCanvases = {};
    function isSafari() {
        return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }
    function assertSameDimensions(_a, _b, nameA, nameB) {
        var widthA = _a.width, heightA = _a.height;
        var widthB = _b.width, heightB = _b.height;
        if (widthA !== widthB || heightA !== heightB) {
            throw new Error("error: dimensions must match. " + nameA + " has dimensions " + widthA + "x" + heightA + ", " + nameB + " has dimensions " + widthB + "x" + heightB);
        }
    }
    function getSizeFromImageLikeElement$1(input) {
        if ('offsetHeight' in input && input.offsetHeight !== 0 &&
            'offsetWidth' in input && input.offsetWidth !== 0) {
            return [input.offsetHeight, input.offsetWidth];
        }
        else if (input.height != null && input.width != null) {
            return [input.height, input.width];
        }
        else {
            throw new Error("HTMLImageElement must have height and width attributes set.");
        }
    }
    function getSizeFromVideoElement$1(input) {
        if (input.hasAttribute('height') && input.hasAttribute('width')) {
            // Prioritizes user specified height and width.
            // We can't test the .height and .width properties directly,
            // because they evaluate to 0 if unset.
            return [input.height, input.width];
        }
        else {
            return [input.videoHeight, input.videoWidth];
        }
    }
    function getInputSize$1(input) {
        if ((typeof (HTMLCanvasElement) !== 'undefined' &&
            input instanceof HTMLCanvasElement) ||
            (typeof (OffscreenCanvas) !== 'undefined' &&
                input instanceof OffscreenCanvas) ||
            (typeof (HTMLImageElement) !== 'undefined' &&
                input instanceof HTMLImageElement)) {
            return getSizeFromImageLikeElement$1(input);
        }
        else if (typeof (ImageData) !== 'undefined' && input instanceof ImageData) {
            return [input.height, input.width];
        }
        else if (typeof (HTMLVideoElement) !== 'undefined' &&
            input instanceof HTMLVideoElement) {
            return getSizeFromVideoElement$1(input);
        }
        else if (input instanceof tf.Tensor) {
            return [input.shape[0], input.shape[1]];
        }
        else {
            throw new Error("error: Unknown input type: " + input + ".");
        }
    }
    function createOffScreenCanvas() {
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        }
        else if (typeof OffscreenCanvas !== 'undefined') {
            return new OffscreenCanvas(0, 0);
        }
        else {
            throw new Error('Cannot create a canvas in this context');
        }
    }
    function ensureOffscreenCanvasCreated(id) {
        if (!offScreenCanvases[id]) {
            offScreenCanvases[id] = createOffScreenCanvas();
        }
        return offScreenCanvases[id];
    }
    /**
     * Draw image data on a canvas.
     */
    function renderImageDataToCanvas(image, canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.putImageData(image, 0, 0);
    }
    function renderImageDataToOffScreenCanvas(image, canvasName) {
        var canvas = ensureOffscreenCanvasCreated(canvasName);
        renderImageDataToCanvas(image, canvas);
        return canvas;
    }
    /**
     * Draw image on a 2D rendering context.
     */
    function drawImage(ctx, image, dx, dy, dw, dh) {
        return __awaiter(this, void 0, void 0, function () {
            var pixels, _a, height, width;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(image instanceof tf.Tensor)) return [3 /*break*/, 2];
                        return [4 /*yield*/, tf.browser.toPixels(image)];
                    case 1:
                        pixels = _b.sent();
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        image = new ImageData(pixels, width, height);
                        _b.label = 2;
                    case 2:
                        if (image instanceof ImageData) {
                            image = renderImageDataToOffScreenCanvas(image, CANVAS_NAMES.drawImage);
                        }
                        if (dw == null || dh == null) {
                            ctx.drawImage(image, dx, dy);
                        }
                        else {
                            ctx.drawImage(image, dx, dy, dw, dh);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Draw image on a canvas.
     */
    function renderImageToCanvas(image, canvas) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext('2d');
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function flipCanvasHorizontal(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
    }
    function drawWithCompositing(ctx, image, compositeOperation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.globalCompositeOperation = compositeOperation;
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // method copied from bGlur in https://codepen.io/zhaojun/pen/zZmRQe
    function cpuBlur(canvas, image, blur) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, sum, delta, alphaLeft, step, y, x, weight, y, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = canvas.getContext('2d');
                        sum = 0;
                        delta = 5;
                        alphaLeft = 1 / (2 * Math.PI * delta * delta);
                        step = blur < 3 ? 1 : 2;
                        for (y = -blur; y <= blur; y += step) {
                            for (x = -blur; x <= blur; x += step) {
                                weight = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta));
                                sum += weight;
                            }
                        }
                        y = -blur;
                        _a.label = 1;
                    case 1:
                        if (!(y <= blur)) return [3 /*break*/, 6];
                        x = -blur;
                        _a.label = 2;
                    case 2:
                        if (!(x <= blur)) return [3 /*break*/, 5];
                        ctx.globalAlpha = alphaLeft *
                            Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur;
                        return [4 /*yield*/, drawImage(ctx, image, x, y)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        x += step;
                        return [3 /*break*/, 2];
                    case 5:
                        y += step;
                        return [3 /*break*/, 1];
                    case 6:
                        ctx.globalAlpha = 1;
                        return [2 /*return*/];
                }
            });
        });
    }
    function drawAndBlurImageOnCanvas(image, blurAmount, canvas) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        ctx = canvas.getContext('2d');
                        canvas.width = width;
                        canvas.height = height;
                        ctx.clearRect(0, 0, width, height);
                        ctx.save();
                        if (!isSafari()) return [3 /*break*/, 2];
                        return [4 /*yield*/, cpuBlur(canvas, image, blurAmount)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        // tslint:disable:no-any
                        ctx.filter = "blur(" + blurAmount + "px)";
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        ctx.restore();
                        return [2 /*return*/];
                }
            });
        });
    }
    function drawAndBlurImageOnOffScreenCanvas(image, blurAmount, offscreenCanvasName) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canvas = ensureOffscreenCanvasCreated(offscreenCanvasName);
                        if (!(blurAmount === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, renderImageToCanvas(image, canvas)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, drawAndBlurImageOnCanvas(image, blurAmount, canvas)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, canvas];
                }
            });
        });
    }
    function drawStroke(bytes, row, column, width, radius, color) {
        if (color === void 0) { color = {
            r: 0,
            g: 255,
            b: 255,
            a: 255
        }; }
        for (var i = -radius; i <= radius; i++) {
            for (var j = -radius; j <= radius; j++) {
                if (i !== 0 && j !== 0) {
                    var n = (row + i) * width + (column + j);
                    bytes[4 * n + 0] = color.r;
                    bytes[4 * n + 1] = color.g;
                    bytes[4 * n + 2] = color.b;
                    bytes[4 * n + 3] = color.a;
                }
            }
        }
    }
    function isSegmentationBoundary(data, row, column, width, isForegroundId, alphaCutoff, radius) {
        if (radius === void 0) { radius = 1; }
        var numberBackgroundPixels = 0;
        for (var i = -radius; i <= radius; i++) {
            for (var j = -radius; j <= radius; j++) {
                if (i !== 0 && j !== 0) {
                    var n = (row + i) * width + (column + j);
                    if (!isForegroundId[data[4 * n]] || data[4 * n + 3] < alphaCutoff) {
                        numberBackgroundPixels += 1;
                    }
                }
            }
        }
        return numberBackgroundPixels > 0;
    }
    /**
     * Given a segmentation or array of segmentations, generates an
     * image with foreground and background color at each pixel determined by the
     * corresponding binary segmentation value at the pixel from the output.  In
     * other words, pixels where there is a person will be colored with foreground
     * color and where there is not a person will be colored with background color.
     *
     * @param segmentation Single segmentation or array of segmentations.
     *
     * @param foreground Default to {r:0, g:0, b:0, a: 0}. The foreground color
     * (r,g,b,a) for visualizing pixels that belong to people.
     *
     * @param background Default to {r:0, g:0, b:0, a: 255}. The background color
     * (r,g,b,a) for visualizing pixels that don't belong to people.
     *
     * @param drawContour Default to false. Whether to draw the contour around each
     * person's segmentation mask or body part mask.
     *
     * @param foregroundThreshold Default to 0.5. The minimum probability
     * to color a pixel as foreground rather than background. The alpha channel
     * integer values will be taken as the probabilities (for more information refer
     * to `Segmentation` type's documentation).
     *
     * @param foregroundMaskValues Default to all mask values. The red channel
     *     integer values that represent foreground (for more information refer to
     * `Segmentation` type's documentation).
     *
     * @returns An ImageData with the same width and height of
     * the input segmentations, with opacity and
     * transparency at each pixel determined by the corresponding binary
     * segmentation value at the pixel from the output.
     */
    function toBinaryMask(segmentation, foreground, background, drawContour, foregroundThreshold, foregroundMaskValues) {
        if (foreground === void 0) { foreground = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        }; }
        if (background === void 0) { background = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        }; }
        if (drawContour === void 0) { drawContour = false; }
        if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
        if (foregroundMaskValues === void 0) { foregroundMaskValues = Array.from(Array(256).keys()); }
        return __awaiter(this, void 0, void 0, function () {
            var segmentations, masks, _a, width, height, bytes, alphaCutoff, isForegroundId, i, j, n, _i, masks_1, mask;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        segmentations = !Array.isArray(segmentation) ? [segmentation] : segmentation;
                        if (segmentations.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, Promise.all(segmentations.map(function (segmentation) { return segmentation.mask.toImageData(); }))];
                    case 1:
                        masks = _b.sent();
                        _a = masks[0], width = _a.width, height = _a.height;
                        bytes = new Uint8ClampedArray(width * height * 4);
                        alphaCutoff = Math.round(255 * foregroundThreshold);
                        isForegroundId = new Array(256).fill(false);
                        foregroundMaskValues.forEach(function (id) { return isForegroundId[id] = true; });
                        for (i = 0; i < height; i++) {
                            for (j = 0; j < width; j++) {
                                n = i * width + j;
                                bytes[4 * n + 0] = background.r;
                                bytes[4 * n + 1] = background.g;
                                bytes[4 * n + 2] = background.b;
                                bytes[4 * n + 3] = background.a;
                                for (_i = 0, masks_1 = masks; _i < masks_1.length; _i++) {
                                    mask = masks_1[_i];
                                    if (isForegroundId[mask.data[4 * n]] &&
                                        mask.data[4 * n + 3] >= alphaCutoff) {
                                        bytes[4 * n] = foreground.r;
                                        bytes[4 * n + 1] = foreground.g;
                                        bytes[4 * n + 2] = foreground.b;
                                        bytes[4 * n + 3] = foreground.a;
                                        if (drawContour && i - 1 >= 0 && i + 1 < height && j - 1 >= 0 &&
                                            j + 1 < width &&
                                            isSegmentationBoundary(mask.data, i, j, width, isForegroundId, alphaCutoff)) {
                                            drawStroke(bytes, i, j, width, 1);
                                        }
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, new ImageData(bytes, width, height)];
                }
            });
        });
    }
    /**
     * Given a segmentation or array of segmentations, and a function mapping
     * the red pixel values (representing body part labels) to colours,
     * generates an image with the corresponding color for each part at each pixel,
     * and background color used where there is no part.
     *
     * @param segmentation Single segmentation or array of segmentations.
     *
     * @param maskValueToColor A function mapping red channel mask values to
     * colors to use in output image.
     *
     * @param background Default to {r:0, g:0, b:0, a: 255}. The background color
     * (r,g,b,a) for visualizing pixels that don't belong to people.
     *
     * @param foregroundThreshold Default to 0.5. The minimum probability
     * to color a pixel as foreground rather than background. The alpha channel
     * integer values will be taken as the probabilities (for more information refer
     * to `Segmentation` type's documentation).
     *
     * @returns An ImageData with the same width and height of input segmentations,
     * with the corresponding color for each part at each pixel, and background
     * pixels where there is no part.
     */
    function toColoredMask(segmentation, maskValueToColor, background, foregroundThreshold) {
        if (background === void 0) { background = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        }; }
        if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
        return __awaiter(this, void 0, void 0, function () {

            var segmentations, masks, _a, width, height, bytes, alphaCutoff, i, j, _i, masks_2, mask, maskValue, color;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        segmentations = !Array.isArray(segmentation) ? [segmentation] : segmentation;
                        if (segmentations.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, Promise.all(segmentations.map(function (segmentation) { return segmentation.mask.toImageData(); }))];
                    case 1:
                        masks = _b.sent();
                        _a = masks[0], width = _a.width, height = _a.height;
                        bytes = new Uint8ClampedArray(width * height * 4);
                        alphaCutoff = Math.round(255 * foregroundThreshold);
                        for (i = 0; i < height * width; ++i) {
                            j = i * 4;
                            bytes[j + 0] = background.r;
                            bytes[j + 1] = background.g;
                            bytes[j + 2] = background.b;
                            bytes[j + 3] = background.a;
                            for (_i = 0, masks_2 = masks; _i < masks_2.length; _i++) {
                                mask = masks_2[_i];
                                if (mask.data[j + 3] >= alphaCutoff) {
                                    maskValue = mask.data[j];
                                    color = maskValueToColor(maskValue);
                                    bytes[j + 0] = color.r;
                                    bytes[j + 1] = color.g;
                                    bytes[j + 2] = color.b;
                                    bytes[j + 3] = color.a;
                                }
                            }
                        }
                        return [2 /*return*/, new ImageData(bytes, width, height)];
                }
            });
        });
    }
    /**
     * Given an image and a maskImage of type ImageData, draws the image with the
     * mask on top of it onto a canvas.
     *
     * @param canvas The canvas to be drawn onto.
     *
     * @param image The original image to apply the mask to.
     *
     * @param maskImage An ImageData containing the mask. Ideally this should be
     * generated by toBinaryMask or toColoredMask.
     *
     * @param maskOpacity The opacity of the mask when drawing it on top of the
     * image. Defaults to 0.7. Should be a float between 0 and 1.
     *
     * @param maskBlurAmount How many pixels to blur the mask by. Defaults to 0.
     * Should be an integer between 0 and 20.
     *
     * @param flipHorizontal If the result should be flipped horizontally.  Defaults
     * to false.
     */
    function drawMask(canvas, image, maskImage, maskOpacity, maskBlurAmount, flipHorizontal) {
        if (maskOpacity === void 0) { maskOpacity = 0.7; }
        if (maskBlurAmount === void 0) { maskBlurAmount = 0; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, ctx, mask, blurredMask;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext('2d');
                        ctx.save();
                        if (flipHorizontal) {
                            flipCanvasHorizontal(canvas);
                        }
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0)];
                    case 1:
                        _b.sent();
                        ctx.globalAlpha = maskOpacity;
                        if (!maskImage) return [3 /*break*/, 3];
                        assertSameDimensions({ width: width, height: height }, maskImage, 'image', 'mask');
                        mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
                        return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask)];
                    case 2:
                        blurredMask = _b.sent();
                        ctx.drawImage(blurredMask, 0, 0, width, height);
                        _b.label = 3;
                    case 3:
                        ctx.restore();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Given an image and a maskImage of type ImageData, draws the image with the
     * pixelated mask on top of it onto a canvas.
     *
     * @param canvas The canvas to be drawn onto.
     *
     * @param image The original image to apply the mask to.
     *
     * @param maskImage An ImageData containing the mask.  Ideally this should be
     * generated by toColoredmask.
     *
     * @param maskOpacity The opacity of the mask when drawing it on top of the
     * image. Defaults to 0.7. Should be a float between 0 and 1.
     *
     * @param maskBlurAmount How many pixels to blur the mask by. Defaults to 0.
     * Should be an integer between 0 and 20.
     *
     * @param flipHorizontal If the result should be flipped horizontally.  Defaults
     * to false.
     *
     * @param pixelCellWidth The width of each pixel cell. Default to 10 px.
     */
    function drawPixelatedMask(canvas, image, maskImage, maskOpacity, maskBlurAmount, flipHorizontal, pixelCellWidth) {
        if (maskOpacity === void 0) { maskOpacity = 0.7; }
        if (maskBlurAmount === void 0) { maskBlurAmount = 0; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        if (pixelCellWidth === void 0) { pixelCellWidth = 10.0; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, width, mask, blurredMask, ctx, offscreenCanvas, offscreenCanvasCtx, i, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        assertSameDimensions({ width: width, height: height }, maskImage, 'image', 'mask');
                        mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
                        return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask)];
                    case 1:
                        blurredMask = _b.sent();
                        canvas.width = blurredMask.width;
                        canvas.height = blurredMask.height;
                        ctx = canvas.getContext('2d');
                        ctx.save();
                        if (flipHorizontal) {
                            flipCanvasHorizontal(canvas);
                        }
                        offscreenCanvas = ensureOffscreenCanvasCreated(CANVAS_NAMES.lowresPartMask);
                        offscreenCanvasCtx = offscreenCanvas.getContext('2d');
                        offscreenCanvas.width = blurredMask.width * (1.0 / pixelCellWidth);
                        offscreenCanvas.height = blurredMask.height * (1.0 / pixelCellWidth);
                        offscreenCanvasCtx.drawImage(blurredMask, 0, 0, blurredMask.width, blurredMask.height, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, 0, 0, canvas.width, canvas.height);
                        // Draws vertical grid lines that are `pixelCellWidth` apart from each other.
                        for (i = 0; i < offscreenCanvas.width; i++) {
                            ctx.beginPath();
                            ctx.strokeStyle = '#ffffff';
                            ctx.moveTo(pixelCellWidth * i, 0);
                            ctx.lineTo(pixelCellWidth * i, canvas.height);
                            ctx.stroke();
                        }
                        // Draws horizontal grid lines that are `pixelCellWidth` apart from each
                        // other.
                        for (i = 0; i < offscreenCanvas.height; i++) {
                            ctx.beginPath();
                            ctx.strokeStyle = '#ffffff';
                            ctx.moveTo(0, pixelCellWidth * i);
                            ctx.lineTo(canvas.width, pixelCellWidth * i);
                            ctx.stroke();
                        }
                        ctx.globalAlpha = 1.0 - maskOpacity;
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0, blurredMask.width, blurredMask.height)];
                    case 2:
                        _b.sent();
                        ctx.restore();
                        return [2 /*return*/];
                }
            });
        });
    }
    function createPersonMask(segmentation, foregroundThreshold, edgeBlurAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var backgroundMaskImage, backgroundMask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toBinaryMask(segmentation, { r: 0, g: 0, b: 0, a: 255 }, { r: 0, g: 0, b: 0, a: 0 }, false, foregroundThreshold)];
                    case 1:
                        backgroundMaskImage = _a.sent();
                        backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
                        if (edgeBlurAmount === 0) {
                            return [2 /*return*/, backgroundMask];
                        }
                        else {
                            return [2 /*return*/, drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask)];
                        }
                }
            });
        });
    }
    /**
     * Given a segmentation or array of segmentations, and an image, draws the image
     * with its background blurred onto the canvas.
     *
     * @param canvas The canvas to draw the background-blurred image onto.
     *
     * @param image The image to blur the background of and draw.
     *
     * @param segmentation Single segmentation or array of segmentations.
     *
     * @param foregroundThreshold Default to 0.5. The minimum probability
     * to color a pixel as foreground rather than background. The alpha channel
     * integer values will be taken as the probabilities (for more information refer
     * to `Segmentation` type's documentation).
     *
     * @param backgroundBlurAmount How many pixels in the background blend into each
     * other.  Defaults to 3. Should be an integer between 1 and 20.
     *
     * @param edgeBlurAmount How many pixels to blur on the edge between the person
     * and the background by.  Defaults to 3. Should be an integer between 0 and 20.
     *
     * @param flipHorizontal If the output should be flipped horizontally.  Defaults
     * to false.
     */
    function drawBokehEffect(canvas, image, segmentation, foregroundThreshold, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
        if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
        if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
        if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        return __awaiter(this, void 0, void 0, function () {
            var blurredImage, ctx, personMask, _a, height, width;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred)];
                    case 1:
                        blurredImage = _b.sent();
                        canvas.width = blurredImage.width;
                        canvas.height = blurredImage.height;
                        ctx = canvas.getContext('2d');
                        if (Array.isArray(segmentation) && segmentation.length === 0) {
                            ctx.drawImage(blurredImage, 0, 0);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, createPersonMask(segmentation, foregroundThreshold, edgeBlurAmount)];
                    case 2:
                        personMask = _b.sent();
                        ctx.save();
                        if (flipHorizontal) {
                            flipCanvasHorizontal(canvas);
                        }
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                    case 3:
                        _b.sent();
                        // "destination-in" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // crop what's not the person using the mask from the original image
                        return [4 /*yield*/, drawWithCompositing(ctx, personMask, 'destination-in')];
                    case 4:
                        // "destination-in" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // crop what's not the person using the mask from the original image
                        _b.sent();
                        // "destination-over" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // draw the blurred background on top of the original image where it doesn't
                        // overlap.
                        return [4 /*yield*/, drawWithCompositing(ctx, blurredImage, 'destination-over')];
                    case 5:
                        // "destination-over" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // draw the blurred background on top of the original image where it doesn't
                        // overlap.
                        _b.sent();
                        ctx.restore();
                        return [2 /*return*/];
                }
            });
        });
    }
    function createBodyPartMask(segmentation, maskValuesToBlur, foregroundThreshold, edgeBlurAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var backgroundMaskImage, backgroundMask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toBinaryMask(segmentation, { r: 0, g: 0, b: 0, a: 0 }, { r: 0, g: 0, b: 0, a: 255 }, true, foregroundThreshold, maskValuesToBlur)];
                    case 1:
                        backgroundMaskImage = _a.sent();
                        backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
                        if (edgeBlurAmount === 0) {
                            return [2 /*return*/, backgroundMask];
                        }
                        else {
                            return [2 /*return*/, drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask)];
                        }
                }
            });
        });
    }
    /**
     * Given a personSegmentation and an image, draws the image with its background
     * blurred onto the canvas.
     *
     * @param canvas The canvas to draw the background-blurred image onto.
     *
     * @param image The image to blur the background of and draw.
     *
     * @param segmentation Single segmentation or array of segmentations.
     *
     * @param maskValuesToBlur An array of red channel mask values to blur
     *     (representing different body parts, refer to `Segmentation` interface
     * docs for more details).
     *
     * @param foregroundThreshold Default to 0.5. The minimum probability
     * to color a pixel as foreground rather than background. The alpha channel
     * integer values will be taken as the probabilities (for more information refer
     * to `Segmentation` type's documentation).
     *
     * @param backgroundBlurAmount How many pixels in the background blend into each
     * other.  Defaults to 3. Should be an integer between 1 and 20.
     *
     * @param edgeBlurAmount How many pixels to blur on the edge between the person
     * and the background by.  Defaults to 3. Should be an integer between 0 and 20.
     *
     * @param flipHorizontal If the output should be flipped horizontally.  Defaults
     * to false.
     */
    function blurBodyPart(canvas, image, segmentation, maskValuesToBlur, foregroundThreshold, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
        if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
        if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
        if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        return __awaiter(this, void 0, void 0, function () {
            var blurredImage, ctx, bodyPartMask, _a, height, width;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred)];
                    case 1:
                        blurredImage = _b.sent();
                        canvas.width = blurredImage.width;
                        canvas.height = blurredImage.height;
                        ctx = canvas.getContext('2d');
                        if (Array.isArray(segmentation) && segmentation.length === 0) {
                            ctx.drawImage(blurredImage, 0, 0);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, createBodyPartMask(segmentation, maskValuesToBlur, foregroundThreshold, edgeBlurAmount)];
                    case 2:
                        bodyPartMask = _b.sent();
                        ctx.save();
                        if (flipHorizontal) {
                            flipCanvasHorizontal(canvas);
                        }
                        _a = getInputSize$1(image), height = _a[0], width = _a[1];
                        return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                    case 3:
                        _b.sent();
                        // "destination-in" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // crop what's not the person using the mask from the original image
                        return [4 /*yield*/, drawWithCompositing(ctx, bodyPartMask, 'destination-in')];
                    case 4:
                        // "destination-in" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // crop what's not the person using the mask from the original image
                        _b.sent();
                        // "destination-over" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // draw the blurred background on top of the original image where it doesn't
                        // overlap.
                        return [4 /*yield*/, drawWithCompositing(ctx, blurredImage, 'destination-over')];
                    case 5:
                        // "destination-over" - "The existing canvas content is kept where both the
                        // new shape and existing canvas content overlap. Everything else is made
                        // transparent."
                        // draw the blurred background on top of the original image where it doesn't
                        // overlap.
                        _b.sent();
                        ctx.restore();
                        return [2 /*return*/];
                }
            });
        });
    }

    exports.blurBodyPart = blurBodyPart;
    exports.bodyPixMaskValueToRainbowColor = bodyPixMaskValueToRainbowColor;
    exports.createSegmenter = createSegmenter;
    exports.drawBokehEffect = drawBokehEffect;
    exports.drawMask = drawMask;
    exports.drawPixelatedMask = drawPixelatedMask;
    exports.toBinaryMask = toBinaryMask;
    exports.toColoredMask = toColoredMask;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
