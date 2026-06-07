import { GenerationRequest, GenerationResponse } from '@/types';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const API_URL = 'https://api.replicate.com/v1/predictions';

// 创建预测
export async function createPrediction(request: GenerationRequest): Promise<GenerationResponse> {
  if (!REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not set');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'schnell@0822',
      input: {
        prompt: request.prompt,
        aspect_ratio: '1:1',
        guidance_scale: 7.5,
        num_inference_steps: 4,
        safety_tolerance: 2,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create prediction');
  }

  return response.json();
}

// 获取预测状态
export async function getPrediction(id: string): Promise<GenerationResponse> {
  if (!REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not set');
  }

  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get prediction');
  }

  return response.json();
}

// 轮询预测状态直到完成
export async function pollPrediction(
  id: string,
  onProgress?: (status: string) => void,
  maxAttempts: number = 60,
  interval: number = 2000
): Promise<GenerationResponse> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const prediction = await getPrediction(id);

    if (onProgress) {
      onProgress(prediction.status);
    }

    if (prediction.status === 'succeeded') {
      return prediction;
    }

    if (prediction.status === 'failed') {
      throw new Error(prediction.error || 'Generation failed');
    }

    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Prediction timed out');
}

// 主函数：生成图像
export async function generateImage(
  request: GenerationRequest,
  onProgress?: (status: string) => void
): Promise<string> {
  const prediction = await createPrediction(request);
  const result = await pollPrediction(prediction.id, onProgress);

  if (!result.output || result.output.length === 0) {
    throw new Error('No output generated');
  }

  return result.output[0];
}
