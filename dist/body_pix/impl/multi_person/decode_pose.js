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
exports.decodePose = void 0;
var keypoints_1 = require("../keypoints");
var util_1 = require("./util");
var util_2 = require("./util");
var parentChildrenTuples = keypoints_1.POSE_CHAIN.map(function (_a) {
    var parentJoinName = _a[0], childJoinName = _a[1];
    return ([keypoints_1.PART_IDS[parentJoinName], keypoints_1.PART_IDS[childJoinName]]);
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
        y: util_1.clamp(Math.round(point.y / outputStride), 0, height - 1),
        x: util_1.clamp(Math.round(point.x / outputStride), 0, width - 1)
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
    var displacedPoint = util_2.addVectors(sourceKeypoint.position, displacement);
    var targetKeypoint = displacedPoint;
    for (var i = 0; i < offsetRefineStep; i++) {
        var targetKeypointIndices = getStridedIndexNearPoint(targetKeypoint, outputStride, height, width);
        var offsetPoint = util_1.getOffsetPoint(targetKeypointIndices.y, targetKeypointIndices.x, targetKeypointId, offsets);
        targetKeypoint = util_2.addVectors({
            x: targetKeypointIndices.x * outputStride,
            y: targetKeypointIndices.y * outputStride
        }, { x: offsetPoint.x, y: offsetPoint.y });
    }
    var targetKeyPointIndices = getStridedIndexNearPoint(targetKeypoint, outputStride, height, width);
    var score = scoresBuffer.get(targetKeyPointIndices.y, targetKeyPointIndices.x, targetKeypointId);
    return { position: targetKeypoint, part: keypoints_1.PART_NAMES[targetKeypointId], score: score };
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
    var rootPoint = util_2.getImageCoords(rootPart, outputStride, offsets);
    instanceKeypoints[rootPart.id] = {
        score: rootScore,
        part: keypoints_1.PART_NAMES[rootPart.id],
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
exports.decodePose = decodePose;
//# sourceMappingURL=decode_pose.js.map