"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blurBodyPart = exports.drawBokehEffect = exports.drawPixelatedMask = exports.drawMask = exports.toColoredPartMask = exports.toMask = void 0;
var blur_1 = require("./blur");
var util_1 = require("./util");
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
function flipCanvasHorizontal(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
}
function drawWithCompositing(ctx, image, compositeOperation) {
    ctx.globalCompositeOperation = compositeOperation;
    ctx.drawImage(image, 0, 0);
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
function drawAndBlurImageOnCanvas(image, blurAmount, canvas) {
    var height = image.height, width = image.width;
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    if (isSafari()) {
        blur_1.cpuBlur(canvas, image, blurAmount);
    }
    else {
        // tslint:disable:no-any
        ctx.filter = "blur(" + blurAmount + "px)";
        ctx.drawImage(image, 0, 0, width, height);
    }
    ctx.restore();
}
function drawAndBlurImageOnOffScreenCanvas(image, blurAmount, offscreenCanvasName) {
    var canvas = ensureOffscreenCanvasCreated(offscreenCanvasName);
    if (blurAmount === 0) {
        renderImageToCanvas(image, canvas);
    }
    else {
        drawAndBlurImageOnCanvas(image, blurAmount, canvas);
    }
    return canvas;
}
function renderImageToCanvas(image, canvas) {
    var width = image.width, height = image.height;
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
}
/**
 * Draw an image on a canvas
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
 * Given the output from estimating multi-person segmentation, generates an
 * image with foreground and background color at each pixel determined by the
 * corresponding binary segmentation value at the pixel from the output.  In
 * other words, pixels where there is a person will be colored with foreground
 * color and where there is not a person will be colored with background color.
 *
 * @param personOrPartSegmentation The output from
 * `segmentPerson`, `segmentMultiPerson`,
 * `segmentPersonParts` or `segmentMultiPersonParts`. They can
 * be SemanticPersonSegmentation object, an array of PersonSegmentation object,
 * SemanticPartSegmentation object, or an array of PartSegmentation object.
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
 * @param foregroundIds Default to [1]. The integer values that represent
 * foreground. For person segmentation, 1 is the foreground. For body part
 * segmentation, it can be a subset of all body parts ids.
 *
 * @returns An ImageData with the same width and height of
 * all the PersonSegmentation in multiPersonSegmentation, with opacity and
 * transparency at each pixel determined by the corresponding binary
 * segmentation value at the pixel from the output.
 */
function toMask(personOrPartSegmentation, foreground, background, drawContour, foregroundIds) {
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
    if (foregroundIds === void 0) { foregroundIds = [1]; }
    if (Array.isArray(personOrPartSegmentation) &&
        personOrPartSegmentation.length === 0) {
        return null;
    }
    var multiPersonOrPartSegmentation;
    if (!Array.isArray(personOrPartSegmentation)) {
        multiPersonOrPartSegmentation = [personOrPartSegmentation];
    }
    else {
        multiPersonOrPartSegmentation = personOrPartSegmentation;
    }
    var _a = multiPersonOrPartSegmentation[0], width = _a.width, height = _a.height;
    var bytes = new Uint8ClampedArray(width * height * 4);
    function drawStroke(bytes, row, column, width, radius, color) {
        if (color === void 0) { color = { r: 0, g: 255, b: 255, a: 255 }; }
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
    function isSegmentationBoundary(segmentationData, row, column, width, foregroundIds, radius) {
        if (foregroundIds === void 0) { foregroundIds = [1]; }
        if (radius === void 0) { radius = 1; }
        var numberBackgroundPixels = 0;
        for (var i = -radius; i <= radius; i++) {
            var _loop_2 = function (j) {
                if (i !== 0 && j !== 0) {
                    var n_1 = (row + i) * width + (column + j);
                    if (!foregroundIds.some(function (id) { return id === segmentationData[n_1]; })) {
                        numberBackgroundPixels += 1;
                    }
                }
            };
            for (var j = -radius; j <= radius; j++) {
                _loop_2(j);
            }
        }
        return numberBackgroundPixels > 0;
    }
    for (var i = 0; i < height; i += 1) {
        var _loop_1 = function (j) {
            var n = i * width + j;
            bytes[4 * n + 0] = background.r;
            bytes[4 * n + 1] = background.g;
            bytes[4 * n + 2] = background.b;
            bytes[4 * n + 3] = background.a;
            var _loop_3 = function (k) {
                if (foregroundIds.some(function (id) { return id === multiPersonOrPartSegmentation[k].data[n]; })) {
                    bytes[4 * n] = foreground.r;
                    bytes[4 * n + 1] = foreground.g;
                    bytes[4 * n + 2] = foreground.b;
                    bytes[4 * n + 3] = foreground.a;
                    var isBoundary = isSegmentationBoundary(multiPersonOrPartSegmentation[k].data, i, j, width, foregroundIds);
                    if (drawContour && i - 1 >= 0 && i + 1 < height && j - 1 >= 0 &&
                        j + 1 < width && isBoundary) {
                        drawStroke(bytes, i, j, width, 1);
                    }
                }
            };
            for (var k = 0; k < multiPersonOrPartSegmentation.length; k++) {
                _loop_3(k);
            }
        };
        for (var j = 0; j < width; j += 1) {
            _loop_1(j);
        }
    }
    return new ImageData(bytes, width, height);
}
exports.toMask = toMask;
var RAINBOW_PART_COLORS = [
    [110, 64, 170], [143, 61, 178], [178, 60, 178], [210, 62, 167],
    [238, 67, 149], [255, 78, 125], [255, 94, 99], [255, 115, 75],
    [255, 140, 56], [239, 167, 47], [217, 194, 49], [194, 219, 64],
    [175, 240, 91], [135, 245, 87], [96, 247, 96], [64, 243, 115],
    [40, 234, 141], [28, 219, 169], [26, 199, 194], [33, 176, 213],
    [47, 150, 224], [65, 125, 224], [84, 101, 214], [99, 81, 195]
];
/**
 * Given the output from person body part segmentation (or multi-person
 * instance body part segmentation) and an array of colors indexed by part id,
 * generates an image with the corresponding color for each part at each pixel,
 * and white pixels where there is no part.
 *
 * @param partSegmentation The output from segmentPersonParts
 * or segmentMultiPersonParts. The former is a SemanticPartSegmentation
 * object and later is an array of PartSegmentation object.
 *
 * @param partColors A multi-dimensional array of rgb colors indexed by
 * part id.  Must have 24 colors, one for every part.
 *
 * @returns An ImageData with the same width and height of all the element in
 * multiPersonPartSegmentation, with the corresponding color for each part at
 * each pixel, and black pixels where there is no part.
 */
function toColoredPartMask(partSegmentation, partColors) {
    if (partColors === void 0) { partColors = RAINBOW_PART_COLORS; }
    if (Array.isArray(partSegmentation) && partSegmentation.length === 0) {
        return null;
    }
    var multiPersonPartSegmentation;
    if (!Array.isArray(partSegmentation)) {
        multiPersonPartSegmentation = [partSegmentation];
    }
    else {
        multiPersonPartSegmentation = partSegmentation;
    }
    var _a = multiPersonPartSegmentation[0], width = _a.width, height = _a.height;
    var bytes = new Uint8ClampedArray(width * height * 4);
    for (var i = 0; i < height * width; ++i) {
        // invert mask.  Invert the segmentation mask.
        var j = i * 4;
        bytes[j + 0] = 255;
        bytes[j + 1] = 255;
        bytes[j + 2] = 255;
        bytes[j + 3] = 255;
        for (var k = 0; k < multiPersonPartSegmentation.length; k++) {
            var partId = multiPersonPartSegmentation[k].data[i];
            if (partId !== -1) {
                var color = partColors[partId];
                if (!color) {
                    throw new Error("No color could be found for part id " + partId);
                }
                bytes[j + 0] = color[0];
                bytes[j + 1] = color[1];
                bytes[j + 2] = color[2];
                bytes[j + 3] = 255;
            }
        }
    }
    return new ImageData(bytes, width, height);
}
exports.toColoredPartMask = toColoredPartMask;
var CANVAS_NAMES = {
    blurred: 'blurred',
    blurredMask: 'blurred-mask',
    mask: 'mask',
    lowresPartMask: 'lowres-part-mask',
};
/**
 * Given an image and a maskImage of type ImageData, draws the image with the
 * mask on top of it onto a canvas.
 *
 * @param canvas The canvas to be drawn onto.
 *
 * @param image The original image to apply the mask to.
 *
 * @param maskImage An ImageData containing the mask.  Ideally this should be
 * generated by toMask or toColoredPartMask.
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
    var _a = util_1.getInputSize(image), height = _a[0], width = _a[1];
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.save();
    if (flipHorizontal) {
        flipCanvasHorizontal(canvas);
    }
    ctx.drawImage(image, 0, 0);
    ctx.globalAlpha = maskOpacity;
    if (maskImage) {
        assertSameDimensions({ width: width, height: height }, maskImage, 'image', 'mask');
        var mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
        var blurredMask = drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask);
        ctx.drawImage(blurredMask, 0, 0, width, height);
    }
    ctx.restore();
}
exports.drawMask = drawMask;
/**
 * Given an image and a maskImage of type ImageData, draws the image with the
 * pixelated mask on top of it onto a canvas.
 *
 * @param canvas The canvas to be drawn onto.
 *
 * @param image The original image to apply the mask to.
 *
 * @param maskImage An ImageData containing the mask.  Ideally this should be
 * generated by toColoredPartMask.
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
    var _a = util_1.getInputSize(image), height = _a[0], width = _a[1];
    assertSameDimensions({ width: width, height: height }, maskImage, 'image', 'mask');
    var mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
    var blurredMask = drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask);
    canvas.width = blurredMask.width;
    canvas.height = blurredMask.height;
    var ctx = canvas.getContext('2d');
    ctx.save();
    if (flipHorizontal) {
        flipCanvasHorizontal(canvas);
    }
    var offscreenCanvas = ensureOffscreenCanvasCreated(CANVAS_NAMES.lowresPartMask);
    var offscreenCanvasCtx = offscreenCanvas.getContext('2d');
    offscreenCanvas.width = blurredMask.width * (1.0 / pixelCellWidth);
    offscreenCanvas.height = blurredMask.height * (1.0 / pixelCellWidth);
    offscreenCanvasCtx.drawImage(blurredMask, 0, 0, blurredMask.width, blurredMask.height, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, 0, 0, canvas.width, canvas.height);
    // Draws vertical grid lines that are `pixelCellWidth` apart from each other.
    for (var i = 0; i < offscreenCanvas.width; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.moveTo(pixelCellWidth * i, 0);
        ctx.lineTo(pixelCellWidth * i, canvas.height);
        ctx.stroke();
    }
    // Draws horizontal grid lines that are `pixelCellWidth` apart from each
    // other.
    for (var i = 0; i < offscreenCanvas.height; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.moveTo(0, pixelCellWidth * i);
        ctx.lineTo(canvas.width, pixelCellWidth * i);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0 - maskOpacity;
    ctx.drawImage(image, 0, 0, blurredMask.width, blurredMask.height);
    ctx.restore();
}
exports.drawPixelatedMask = drawPixelatedMask;
function createPersonMask(multiPersonSegmentation, edgeBlurAmount) {
    var backgroundMaskImage = toMask(multiPersonSegmentation, { r: 0, g: 0, b: 0, a: 255 }, { r: 0, g: 0, b: 0, a: 0 });
    var backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
    if (edgeBlurAmount === 0) {
        return backgroundMask;
    }
    else {
        return drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask);
    }
}
/**
 * Given a personSegmentation and an image, draws the image with its background
 * blurred onto the canvas.
 *
 * @param canvas The canvas to draw the background-blurred image onto.
 *
 * @param image The image to blur the background of and draw.
 *
 * @param personSegmentation A SemanticPersonSegmentation or an array of
 * PersonSegmentation object.
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
function drawBokehEffect(canvas, image, multiPersonSegmentation, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
    if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
    if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
    if (flipHorizontal === void 0) { flipHorizontal = false; }
    var blurredImage = drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred);
    canvas.width = blurredImage.width;
    canvas.height = blurredImage.height;
    var ctx = canvas.getContext('2d');
    if (Array.isArray(multiPersonSegmentation) &&
        multiPersonSegmentation.length === 0) {
        ctx.drawImage(blurredImage, 0, 0);
        return;
    }
    var personMask = createPersonMask(multiPersonSegmentation, edgeBlurAmount);
    ctx.save();
    if (flipHorizontal) {
        flipCanvasHorizontal(canvas);
    }
    // draw the original image on the final canvas
    var _a = util_1.getInputSize(image), height = _a[0], width = _a[1];
    ctx.drawImage(image, 0, 0, width, height);
    // "destination-in" - "The existing canvas content is kept where both the
    // new shape and existing canvas content overlap. Everything else is made
    // transparent."
    // crop what's not the person using the mask from the original image
    drawWithCompositing(ctx, personMask, 'destination-in');
    // "destination-over" - "The existing canvas content is kept where both the
    // new shape and existing canvas content overlap. Everything else is made
    // transparent."
    // draw the blurred background on top of the original image where it doesn't
    // overlap.
    drawWithCompositing(ctx, blurredImage, 'destination-over');
    ctx.restore();
}
exports.drawBokehEffect = drawBokehEffect;
function createBodyPartMask(multiPersonPartSegmentation, bodyPartIdsToMask, edgeBlurAmount) {
    var backgroundMaskImage = toMask(multiPersonPartSegmentation, { r: 0, g: 0, b: 0, a: 0 }, { r: 0, g: 0, b: 0, a: 255 }, true, bodyPartIdsToMask);
    var backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
    if (edgeBlurAmount === 0) {
        return backgroundMask;
    }
    else {
        return drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask);
    }
}
/**
 * Given a personSegmentation and an image, draws the image with its background
 * blurred onto the canvas.
 *
 * @param canvas The canvas to draw the background-blurred image onto.
 *
 * @param image The image to blur the background of and draw.
 *
 * @param partSegmentation A SemanticPartSegmentation or an array of
 * PartSegmentation object.
 *
 * @param bodyPartIdsToBlur Default to [0, 1] (left-face and right-face). An
 * array of body part ids to blur. Each must be one of the 24 body part ids.
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
function blurBodyPart(canvas, image, partSegmentation, bodyPartIdsToBlur, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
    if (bodyPartIdsToBlur === void 0) { bodyPartIdsToBlur = [0, 1]; }
    if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
    if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
    if (flipHorizontal === void 0) { flipHorizontal = false; }
    var blurredImage = drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred);
    canvas.width = blurredImage.width;
    canvas.height = blurredImage.height;
    var ctx = canvas.getContext('2d');
    if (Array.isArray(partSegmentation) && partSegmentation.length === 0) {
        ctx.drawImage(blurredImage, 0, 0);
        return;
    }
    var bodyPartMask = createBodyPartMask(partSegmentation, bodyPartIdsToBlur, edgeBlurAmount);
    ctx.save();
    if (flipHorizontal) {
        flipCanvasHorizontal(canvas);
    }
    // draw the original image on the final canvas
    var _a = util_1.getInputSize(image), height = _a[0], width = _a[1];
    ctx.drawImage(image, 0, 0, width, height);
    // "destination-in" - "The existing canvas content is kept where both the
    // new shape and existing canvas content overlap. Everything else is made
    // transparent."
    // crop what's not the person using the mask from the original image
    drawWithCompositing(ctx, bodyPartMask, 'destination-in');
    // "destination-over" - "The existing canvas content is kept where both the
    // new shape and existing canvas content overlap. Everything else is made
    // transparent."
    // draw the blurred background on top of the original image where it doesn't
    // overlap.
    drawWithCompositing(ctx, blurredImage, 'destination-over');
    ctx.restore();
}
exports.blurBodyPart = blurBodyPart;
//# sourceMappingURL=output_rendering_util.js.map