"use strict";
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
var tf = require("@tensorflow/tfjs-core");
// tslint:disable-next-line: no-imports-from-dist
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
var bodySegmentation = require("../index");
var mask_util_1 = require("../shared/calculators/mask_util");
var test_util_1 = require("../shared/test_util");
// Measured in percent.
var EPSILON_IOU = 0.98;
jasmine_util_1.describeWithFlags('TFJS MediaPipeSelfieSegmentation ', jasmine_util_1.ALL_ENVS, function () {
    var timeout;
    beforeAll(function () {
        timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
    });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    function expectSegmenter(modelType) {
        return __awaiter(this, void 0, void 0, function () {
            var startTensors, detector, input, beforeTensors, segmentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTensors = tf.memory().numTensors;
                        return [4 /*yield*/, bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation, { runtime: 'tfjs', modelType: modelType })];
                    case 1:
                        detector = _a.sent();
                        input = tf.zeros([128, 128, 3]);
                        beforeTensors = tf.memory().numTensors;
                        return [4 /*yield*/, detector.segmentPeople(input)];
                    case 2:
                        segmentation = _a.sent();
                        return [4 /*yield*/, segmentation[0].mask.toTensor()];
                    case 3:
                        (_a.sent()).dispose();
                        expect(tf.memory().numTensors).toEqual(beforeTensors);
                        detector.dispose();
                        input.dispose();
                        expect(tf.memory().numTensors).toEqual(startTensors);
                        return [2 /*return*/];
                }
            });
        });
    }
    it('general segmentPeople does not leak memory.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expectSegmenter('general')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('landscape segmentPeople does not leak memory.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expectSegmenter('landscape')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('TFJS MediaPipeSelfieSegmentation static image ', jasmine_util_1.BROWSER_ENVS, function () {
    var segmenter;
    var image;
    var segmentationImage;
    var timeout;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
                    return [4 /*yield*/, test_util_1.loadImage('portrait.jpg', 820, 1024)];
                case 1:
                    image = _a.sent();
                    return [4 /*yield*/, test_util_1.loadImage('portrait_segmentation.png', 820, 1024)];
                case 2:
                    segmentationImage =
                        _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    function expectSegmenter(segmenter, image, segmentationImage) {
        return __awaiter(this, void 0, void 0, function () {
            var result, segmentation, maskValuesToLabel, mask, actualBooleanMask, _a, expectedBooleanMask, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, segmenter.segmentPeople(image, {})];
                    case 1:
                        result = _c.sent();
                        segmentation = result[0];
                        maskValuesToLabel = Array.from(Array(256).keys(), function (v, _) { return segmentation.maskValueToLabel(v); });
                        mask = segmentation.mask;
                        _a = test_util_1.imageToBooleanMask;
                        return [4 /*yield*/, segmentation.mask.toImageData()];
                    case 2:
                        actualBooleanMask = _a.apply(void 0, [
                            // Round to binary mask using red value cutoff of 128.
                            (_c.sent()).data, 128, 0, 0]);
                        _b = test_util_1.imageToBooleanMask;
                        return [4 /*yield*/, mask_util_1.toImageDataLossy(segmentationImage)];
                    case 3:
                        expectedBooleanMask = _b.apply(void 0, [(_c.sent()).data, 0, 0, 255]);
                        expect(maskValuesToLabel.every(function (label) { return label === 'person'; }));
                        expect(mask.getUnderlyingType() === 'tensor');
                        expect(test_util_1.segmentationIOU(expectedBooleanMask, actualBooleanMask))
                            .toBeGreaterThanOrEqual(EPSILON_IOU);
                        return [2 /*return*/];
                }
            });
        });
    }
    it('general model test.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
                    return [4 /*yield*/, bodySegmentation.createSegmenter(model, { runtime: 'tfjs', modelType: 'general' })];
                case 1:
                    segmenter = _a.sent();
                    expectSegmenter(segmenter, image, segmentationImage);
                    segmenter.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
    it('landscape model test.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
                    return [4 /*yield*/, bodySegmentation.createSegmenter(model, { runtime: 'tfjs', modelType: 'landscape' })];
                case 1:
                    segmenter = _a.sent();
                    expectSegmenter(segmenter, image, segmentationImage);
                    segmenter.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=tfjs_test.js.map