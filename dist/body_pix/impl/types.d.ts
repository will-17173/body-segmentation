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
import * as tf from '@tensorflow/tfjs-core';
export declare type BodyPixInternalResolution = number | 'low' | 'medium' | 'high' | 'full';
export declare type BodyPixOutputStride = 32 | 16 | 8;
export declare type BodyPixArchitecture = 'ResNet50' | 'MobileNetV1';
export declare type BodyPixQuantBytes = 1 | 2 | 4;
export declare type BodyPixMultiplier = 1.0 | 0.75 | 0.50;
export declare type ImageType = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | OffscreenCanvas;
export declare type BodyPixInput = ImageData | ImageType | tf.Tensor3D;
export declare type PersonSegmentation = {
    data: Uint8Array;
    width: number;
    height: number;
    pose: Pose;
};
export declare type SemanticPersonSegmentation = {
    data: Uint8Array;
    width: number;
    height: number;
    allPoses: Pose[];
};
export declare type PartSegmentation = {
    data: Int32Array;
    width: number;
    height: number;
    pose: Pose;
};
export declare type SemanticPartSegmentation = {
    data: Int32Array;
    width: number;
    height: number;
    allPoses: Pose[];
};
export declare interface Padding {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export declare type Part = {
    heatmapX: number;
    heatmapY: number;
    id: number;
};
export declare type Vector2D = {
    y: number;
    x: number;
};
export declare type TensorBuffer3D = tf.TensorBuffer<tf.Rank.R3>;
export declare type PartWithScore = {
    score: number;
    part: Part;
};
export declare type Keypoint = {
    score: number;
    position: Vector2D;
    part: string;
};
export declare type Pose = {
    keypoints: Keypoint[];
    score: number;
};
export declare type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
};
