import { StyleType, DescriptionData } from '@/types';

// 风格数据
export const styles = {
  A: {
    id: 'A' as StyleType,
    name: '数字印象主义',
    nameEn: 'Digital Impressionism',
    description: '互补冷暖色、painterly笔触、氛围感优先',
    icon: '🎨',
    features: ['冷暖色对比', '笔触感强', '氛围优先', '艺术感强'],
  },
  B: {
    id: 'B' as StyleType,
    name: '炭笔线条',
    nameEn: 'Charcoal Line Art',
    description: '粗颗粒炭笔、呼吸感线条、纯白背景',
    icon: '✏️',
    features: ['手绘质感', '线条清晰', '纯白背景', '速写风格'],
  },
  C: {
    id: 'C' as StyleType,
    name: '半写实动漫',
    nameEn: 'Semi-Realistic Anime',
    description: '光滑瓷器肌、纯色背景、梦幻光点',
    icon: '✨',
    features: ['动漫风格', '瓷器肌肤', '纯色背景', '梦幻光效'],
  },
  D: {
    id: 'D' as StyleType,
    name: '彩色数字肖像',
    nameEn: 'Color Digital Portrait',
    description: '丰富色彩层次、边缘变化、画家式笔触',
    icon: '🖼️',
    features: ['色彩丰富', '边缘变化', '层次分明', '数字绘画'],
  },
};

// 默认描述
export const defaultDescriptions: DescriptionData = {
  appearance: '',
  hairstyle: '',
  expression: '',
  clothing: '',
  custom: '',
};

// 通用签名
const signature = `artist signature "Kelsey Hsiao" in handwritten cursive style,
first letters capitalized (K, H), rest lowercase,
slightly slanted to the right, flowing and natural,
small and elegant, integrated with the artwork,
positioned at lower right area of the composition`;

// 通用负面提示词
const negativePrompt = `photorealistic, hyperrealistic, 3D render, CGI, anime, manga,
cartoon, line art, flat colors, sharp edges everywhere,
photograph, over-detailed, noisy, grainy, low quality,
deformed, asymmetric, extra fingers, bad anatomy,
watermark, text, signature, frame, border`;

// 风格A: 数字印象主义提示词
function buildStyleA(description: DescriptionData): string {
  const { appearance, hairstyle, expression, clothing, custom } = description;

  let prompt = 'Portrait of ';

  if (appearance) prompt += `${appearance}, `;
  if (hairstyle) prompt += `${hairstyle}, `;
  if (expression) prompt += `${expression}, `;
  if (clothing) prompt += `${clothing}, `;
  if (custom) prompt += `${custom}, `;

  prompt += `Contemporary digital impressionism style,
painterly brushwork with soft blending and hard edge details on eyes.
Complementary color palette: teal-blue atmospheric background,
warm peach skin tones, rose accent colors.
Soft atmospheric lighting from upper left, planar form simplification,
lost-and-found edges, abstract non-representational background
with visible confident brushstrokes.

${signature},

Digital painting, high quality, 4:5 vertical composition, professional illustration.`;

  return prompt;
}

// 风格B: 炭笔线条提示词
function buildStyleB(description: DescriptionData): string {
  const { appearance, hairstyle, expression, clothing, custom } = description;

  let subjectDesc = '';
  if (appearance) subjectDesc += `${appearance}`;
  if (hairstyle) subjectDesc += `, ${hairstyle}`;
  if (expression) subjectDesc += `, ${expression}`;
  if (clothing) subjectDesc += `, ${clothing}`;
  if (custom) subjectDesc += `, ${custom}`;

  return `Hand-drawn portrait sketch on slightly textured white paper, using a thick charcoal pencil or coarse brush pen with visible grainy texture.

Portrait of ${subjectDesc || 'a young woman with long flowing hair, gentle contemplative expression'},

Hair drawn ENTIRELY with individual visible line strokes — NOT solid black fills, NOT silhouettes. Every strand and clump of hair is defined by separate visible strokes. Hair volume comes from the density and layering of these individual strokes, not from filling areas with solid black. Some strokes are bold and dark, others are lighter with more grain showing through.

thick charcoal pencil on rough toothy paper, grainy texture,
bold chunky lines with visible paper grain catching the charcoal,
pressure-sensitive with natural swelling and thinning along each stroke,
dry brush effects at stroke endings, flying white technique,
organic imperfections, tactile physical quality, hand-drawn energy,
calligraphic brush stroke quality, visible ink pooling at pressure points,

large expressive eyes with bold grainy lash lines, small delicate nose,
full lips with cupid's bow drawn with 2-3 grainy strokes, elegant jawline,
slender neck, gentle contemplative expression, soft downcast gaze,

minimal fabric rendering — garment defined by bold grainy contour lines only,
2-3 economical wrinkle curves at joints, clean garment edges,

${signature},

pure black grainy lines on white paper, no grayscale fills, no gradients,
generous white negative space, half-body composition,
quiet contemplative mood, gentle elegance,
professional illustration quality`;
}

// 风格C: 半写实动漫提示词
function buildStyleC(description: DescriptionData): string {
  const { appearance, hairstyle, expression, clothing, custom } = description;

  let prompt = '';

  if (appearance) prompt += `${appearance}, `;
  if (hairstyle) prompt += `${hairstyle}, `;
  if (expression) prompt += `${expression}, `;
  if (clothing) prompt += `${clothing}, `;
  if (custom) prompt += `${custom}, `;

  return `${prompt || 'beautiful young woman'}, portrait illustration, Kelsey Hsiao style, semi-realistic anime portrait,
three-quarter view, teal-blue solid color background, contemplative and confident mood,
smooth porcelain skin, large expressive eyes with detailed highlights,
directional hair brushstrokes, soft diffused upper-left lighting,
canvas texture overlay, scattered white light particles,
digital painting, contemporary illustration, square format,
handwritten signature "Kelsey Hsiao"`;
}

// 风格D: 彩色数字肖像提示词
function buildStyleD(description: DescriptionData): string {
  const { appearance, hairstyle, expression, clothing, custom } = description;

  let prompt = 'Portrait of ';

  if (appearance) prompt += `${appearance}, `;
  if (hairstyle) prompt += `${hairstyle}, `;
  if (expression) prompt += `${expression}, `;
  if (clothing) prompt += `${clothing}, `;
  if (custom) prompt += `${custom}, `;

  prompt += `stylized realism portrait painting,
painterly digital art portrait, atmospheric portrait painting.

Complementary color harmony with teal-cyan background,
warm peach and rose skin tones, limited palette of 15-20 hues.

Loose brushwork on clothing and background,
soft edge blending on skin transitions,
hard edge details on eyes and facial features.

Planar form simplification, idealized proportions,
expressive color application, lost-and-found edges,
abstract non-representational background.

${signature},

Digital painting, professional quality, 4:5 vertical composition.`;

  return prompt;
}

// 主函数：根据风格和描述构建提示词
export function buildPrompt(style: StyleType, description: DescriptionData): string {
  switch (style) {
    case 'A':
      return buildStyleA(description);
    case 'B':
      return buildStyleB(description);
    case 'C':
      return buildStyleC(description);
    case 'D':
      return buildStyleD(description);
    default:
      return buildStyleA(description);
  }
}

// 获取负面提示词
export function getNegativePrompt(): string {
  return negativePrompt;
}
