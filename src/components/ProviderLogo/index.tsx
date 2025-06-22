import React from 'react';
import styles from './styles.module.css';

interface ProviderLogoProps {
  provider: string;
  className?: string;
}

const providerLogos: Record<string, string> = {
  'OpenAI': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'Anthropic': 'https://upload.wikimedia.org/wikipedia/commons/8/86/Anthropic_logo.svg',
  'Google': 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
  'Meta': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
  'Mistral': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Mistral_AI_logo.svg',
  'Cohere': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cohere_logo.svg',
  'Alibaba': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Alibaba_Group_logo.svg',
  'Self-Hosted': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center'
};

const providerFallbacks: Record<string, string> = {
  'OpenAI': '🤖',
  'Anthropic': '🧠',
  'Google': '🔍',
  'Meta': '📘',
  'Mistral': '💨',
  'Cohere': '🔗',
  'Alibaba': '🛒',
  'Self-Hosted': '🏠'
};

export default function ProviderLogo({ provider, className = '' }: ProviderLogoProps) {
  const [imageError, setImageError] = React.useState(false);
  const logoUrl = providerLogos[provider];
  const fallback = providerFallbacks[provider];

  if (!logoUrl || imageError) {
    return (
      <div className={`${styles.providerLogoFallback} ${className}`}>
        <span>{fallback}</span>
      </div>
    );
  }

  return (
    <img 
      src={logoUrl}
      alt={`${provider} logo`}
      className={className}
      onError={() => setImageError(true)}
    />
  );
} 