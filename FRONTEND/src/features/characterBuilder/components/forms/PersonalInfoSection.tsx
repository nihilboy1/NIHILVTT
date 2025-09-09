import { useFormContext } from 'react-hook-form';
import { CharacterBuilderFormData } from '../../schemas/characterBuilderSchema';
import { FormSection, CharacterNameField, ImageUrlField, FormField } from '@/shared/components';
import { textareaVariants } from '@/shared/styles/inputVariants';
import { cn } from '@/shared/lib/utils/cn';

export function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CharacterBuilderFormData>();

  // Observando os valores atuais
  const tokenUrl = watch('personal-info.tokenUrl');
  const splashartUrl = watch('personal-info.splashartUrl');

  return (
    <div className="space-y-8">
      {/* Seção: Informações Básicas */}
      <FormSection
        title="Informações Básicas"
        description="Dados fundamentais do seu personagem"
        variant="default"
        spacing="normal"
      >
        <CharacterNameField
          value={watch('personal-info.name') || ''}
          onChange={(value) => setValue('personal-info.name', value)}
          error={errors['personal-info']?.name?.message}
          required={true}
        />
      </FormSection>

      {/* Seção: Imagens do Personagem */}
      <FormSection
        title="Imagens do Personagem"
        description="Adicione imagens para dar vida ao seu personagem"
        variant="default"
        spacing="normal"
      >
        <div className="space-y-8">
          {/* Token Image */}
          <ImageUrlField
            value={tokenUrl || ''}
            onChange={(value) => setValue('personal-info.tokenUrl', value)}
            error={errors['personal-info']?.tokenUrl?.message}
            placeholder="https://exemplo.com/imagem-token.png"
            previewSize="lg"
            required={false}
          />

          {/* Splashart Image */}
          <ImageUrlField
            value={splashartUrl || ''}
            onChange={(value) => setValue('personal-info.splashartUrl', value)}
            error={errors['personal-info']?.splashartUrl?.message}
            placeholder="https://exemplo.com/splashart.jpg"
            previewSize="xl"
            required={false}
          />
        </div>
      </FormSection>

      {/* Seção: História do Personagem */}
      <FormSection
        title="História do Personagem"
        description="Conte a história e personalidade do seu personagem"
        variant="default"
        spacing="normal"
      >
        <FormField
          label="Lore & Background"
          helpText="Descreva a história, personalidade, motivações e background do seu personagem"
          error={errors['personal-info']?.lore?.message}
          htmlFor="character-lore"
        >
          <textarea
            id="character-lore"
            className={cn(
              textareaVariants({
                variant: errors['personal-info']?.lore ? 'error' : 'default',
                size: 'lg',
              }),
            )}
            placeholder="Conte um pouco sobre a história do seu personagem..."
            {...register('personal-info.lore')}
          />
        </FormField>
      </FormSection>
    </div>
  );
}
