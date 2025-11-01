import Script from 'next/script';

interface JsonLdProps {
  data: Record<string, any>;
  id?: string;
}

/**
 * Generic JSON-LD component for injecting structured data
 * Prevents duplicate script tags by using unique IDs
 */
export function JsonLd({ data, id = 'json-ld' }: JsonLdProps) {
  // Ensure @context is set
  const schema = {
    '@context': 'https://schema.org',
    ...data,
  };

  // Validate JSON structure
  let jsonString: string;
  try {
    jsonString = JSON.stringify(schema);
  } catch (error) {
    console.error('Invalid JSON-LD data:', error);
    return null;
  }

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

