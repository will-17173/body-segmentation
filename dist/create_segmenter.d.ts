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
import { BodyPixModelConfig } from './body_pix/types';
import { BodySegmenter } from './body_segmenter';
import { MediaPipeSelfieSegmentationMediaPipeModelConfig } from './selfie_segmentation_mediapipe/types';
import { MediaPipeSelfieSegmentationTfjsModelConfig } from './selfie_segmentation_tfjs/types';
import { SupportedModels } from './types';
/**
 * Create a body segmenter instance.
 *
 * @param model The name of the pipeline to load.
 * @param modelConfig The configuration for the pipeline to load.
 */
export declare function createSegmenter(model: SupportedModels, modelConfig?: MediaPipeSelfieSegmentationMediaPipeModelConfig | MediaPipeSelfieSegmentationTfjsModelConfig | BodyPixModelConfig): Promise<BodySegmenter>;
