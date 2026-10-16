/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteSeoRegistry } from '../seoData';
import { PageSeoInfo } from '../types';

export function updatePageSeo(path: string, customInfo?: Partial<PageSeoInfo>) {
  if (typeof document === 'undefined') return;

  // Clean path (trim trailing slash unless root)
  const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  
  // Find SEO config or fallback to root
  const seoConfig: PageSeoInfo = {
    ...(siteSeoRegistry[normalizedPath] || siteSeoRegistry['/']),
    ...customInfo
  };

  // 1. Update Document Title
  document.title = seoConfig.pageTitle;

  // 2. Helper to set or create meta tags
  const setMetaTag = (selector: string, attr: string, value: string, content: string) => {
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, value);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', seoConfig.metaDescription);

  // Meta Keywords: Main keyword + 2 related keywords
  const allKeywords = [seoConfig.mainKeyword, ...seoConfig.relatedKeywords].join(', ');
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', allKeywords);

  // OpenGraph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', seoConfig.pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', seoConfig.metaDescription);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', seoConfig.canonicalUrl || (window.location.origin + normalizedPath));
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', seoConfig.ogType || 'website');
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'The Second Story');

  // Twitter Card Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seoConfig.pageTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seoConfig.metaDescription);

  // 3. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seoConfig.canonicalUrl || (window.location.origin + normalizedPath));

  // 4. Update Schema.org JSON-LD Structured Data
  let ldJsonScript = document.querySelector('script#schema-structured-data');
  if (!ldJsonScript) {
    ldJsonScript = document.createElement('script');
    ldJsonScript.setAttribute('type', 'application/ld+json');
    ldJsonScript.setAttribute('id', 'schema-structured-data');
    document.head.appendChild(ldJsonScript);
  }

  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': seoConfig.schemaType || 'WebPage',
    'name': seoConfig.pageTitle,
    'description': seoConfig.metaDescription,
    'url': seoConfig.canonicalUrl || (window.location.origin + normalizedPath),
    'publisher': {
      '@type': 'Organization',
      'name': 'The Second Story',
      'logo': {
        '@type': 'ImageObject',
        'url': window.location.origin + '/src/assets/images/craft_glass_mosaic_lamp_1791988805283.jpg'
      }
    }
  };

  // If page contains AEO FAQ items, attach FAQPage schema
  if (seoConfig.aeoQuestions && seoConfig.aeoQuestions.length > 0) {
    structuredData['mainEntity'] = seoConfig.aeoQuestions.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }));
  }

  ldJsonScript.textContent = JSON.stringify(structuredData);
}
