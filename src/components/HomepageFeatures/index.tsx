import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🔌 Easy Integration',
    icon: '🔌',
    description: (
      <>
        Connect OpenAI, Claude, Gemini, and other AI providers to your WordPress site in minutes. 
        No complex coding required - just configure your API keys and start building.
      </>
    ),
  },
  {
    title: '🛠️ Build AI Tools',
    icon: '🛠️',
    description: (
      <>
        Create custom AI tools and workflows without writing code. Design input schemas, 
        configure prompts, and deploy intelligent features directly from the WordPress admin.
      </>
    ),
  },
  {
    title: '📊 Full Control',
    icon: '📊',
    description: (
      <>
        Monitor usage, manage rate limits, and control costs. Complete logging, 
        error handling, and security features give you full visibility and control.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
