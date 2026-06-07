export type StyleType = 'A' | 'B' | 'C' | 'D';

export interface StyleInfo {
  id: StyleType;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  features: string[];
}

export interface DescriptionData {
  appearance: string;
  hairstyle: string;
  expression: string;
  clothing: string;
  custom: string;
}

export interface GenerationState {
  status: 'idle' | 'generating' | 'succeeded' | 'failed';
  progress?: number;
  imageUrl?: string;
  error?: string;
}

export interface GenerationRequest {
  prompt: string;
  style: StyleType;
}

export interface GenerationResponse {
  id: string;
  status: string;
  output?: string[];
  error?: string;
}
