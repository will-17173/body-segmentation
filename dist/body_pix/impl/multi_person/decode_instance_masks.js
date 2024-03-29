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
exports.decodePersonInstancePartMasks = exports.decodePersonInstanceMasks = exports.toPersonKPartSegmentation = exports.toPersonKSegmentation = void 0;
var tf = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var decode_multiple_masks_cpu_1 = require("./decode_multiple_masks_cpu");
var decode_multiple_masks_webgl_1 = require("./decode_multiple_masks_webgl");
function toPersonKSegmentation(segmentation, k) {
    return tf.tidy(function () { return tf.cast(tf.equal(segmentation, tf.scalar(k)), 'int32'); });
}
exports.toPersonKSegmentation = toPersonKSegmentation;
function toPersonKPartSegmentation(segmentation, bodyParts, k) {
    return tf.tidy(function () { return tf.sub(tf.mul(tf.cast(tf.equal(segmentation, tf.scalar(k)), 'int32'), tf.add(bodyParts, 1)), 1); });
}
exports.toPersonKPartSegmentation = toPersonKPartSegmentation;
function isWebGlBackend() {
    return tfjs_core_1.getBackend() === 'webgl';
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
                        var masksTensorInfo = decode_multiple_masks_webgl_1.decodeMultipleMasksWebGl(segmentation, longOffsets, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps, minKeypointScore, maxNumPeople);
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
                    personSegmentationsData = decode_multiple_masks_cpu_1.decodeMultipleMasksCPU(segmentationsData, longOffsetsData, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps);
                    _b.label = 5;
                case 5: return [2 /*return*/, personSegmentationsData.map(function (data, i) { return ({ data: data, pose: posesAboveScore[i], width: width, height: height }); })];
            }
        });
    });
}
exports.decodePersonInstanceMasks = decodePersonInstanceMasks;
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
                        var masksTensorInfo = decode_multiple_masks_webgl_1.decodeMultipleMasksWebGl(segmentation, longOffsets, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps, minKeypointScore, maxNumPeople);
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
                    partSegmentationsByPersonData = decode_multiple_masks_cpu_1.decodeMultiplePartMasksCPU(segmentationsData, longOffsetsData, partSegmentaionData, posesAboveScore, height, width, stride, [inHeight, inWidth], padding, refineSteps);
                    _b.label = 6;
                case 6: return [2 /*return*/, partSegmentationsByPersonData.map(function (data, k) { return ({ pose: posesAboveScore[k], data: data, height: height, width: width }); })];
            }
        });
    });
}
exports.decodePersonInstancePartMasks = decodePersonInstancePartMasks;
//# sourceMappingURL=decode_instance_masks.js.map