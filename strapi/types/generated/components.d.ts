import type { Schema, Struct } from '@strapi/strapi';

export interface ServiceAudienceItem extends Struct.ComponentSchema {
  collectionName: 'components_service_audience_items';
  info: {
    displayName: 'AudienceItem';
    icon: 'user';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface ServiceHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_service_how_it_works';
  info: {
    displayName: 'HowItWorks';
    icon: 'puzzle';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ServiceWhoIsItFor extends Struct.ComponentSchema {
  collectionName: 'components_service_who_is_it_fors';
  info: {
    displayName: 'WhoIsItFor';
  };
  attributes: {
    items: Schema.Attribute.Component<'service.audience-item', true>;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'Hero';
    icon: 'monitor';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'shared.hero-cta', true>;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeroCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_ctas';
  info: {
    displayName: 'HeroCTA';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<['none', 'arrowLink', 'whatsapp']> &
      Schema.Attribute.DefaultTo<'none'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'hashtag';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'SocialLink';
    icon: 'manyToOne';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['instagram', 'linkedin', 'youtube', 'facebook', 'x', 'tiktok']
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'service.audience-item': ServiceAudienceItem;
      'service.how-it-works': ServiceHowItWorks;
      'service.who-is-it-for': ServiceWhoIsItFor;
      'shared.hero': SharedHero;
      'shared.hero-cta': SharedHeroCta;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
