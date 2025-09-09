import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils/cn';

const imagePreviewVariants = cva(
  'relative overflow-hidden border-2 border-dashed transition-all duration-200',
  {
    variants: {
      state: {
        default: 'border-surface-3 bg-surface-1',
        valid: 'border-feedback-positive bg-surface-2',
        invalid: 'border-feedback-negative bg-surface-2',
        loading: 'border-accent-primary bg-surface-2',
      },
      size: {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-40 h-40',
      },
      shape: {
        square: 'rounded-lg',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'lg',
      shape: 'square',
    },
  },
);

const imageVariants = cva('transition-all duration-200', {
  variants: {
    fit: {
      cover: 'object-cover w-full h-full',
      contain: 'object-contain w-full h-full',
      fill: 'object-fill w-full h-full',
    },
  },
  defaultVariants: {
    fit: 'cover',
  },
});

interface ImagePreviewProps extends VariantProps<typeof imagePreviewVariants> {
  src?: string;
  alt?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: React.ReactNode;
  fit?: VariantProps<typeof imageVariants>['fit'];
}

export function ImagePreview({
  src,
  alt = '',
  className,
  state,
  size,
  shape,
  fit,
  onLoad,
  onError,
  placeholder,
}: ImagePreviewProps) {
  const handleLoad = () => {
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  return (
    <div className={cn(imagePreviewVariants({ state, size, shape }), className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={imageVariants({ fit })}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <div className="text-text-secondary flex h-full w-full items-center justify-center">
          {placeholder || (
            <div className="text-center">
              <svg className="mx-auto mb-2 h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-xs">Sem imagem</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
