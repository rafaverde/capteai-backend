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

export interface WebbyBlogCodeBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_code_block';
  info: {
    description: 'Code snippet block with syntax highlighting';
    displayName: 'Code Block';
    icon: 'code';
  };
  attributes: {
    code: Schema.Attribute.Text & Schema.Attribute.Required;
    filename: Schema.Attribute.String;
    language: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'javascript'>;
  };
}

export interface WebbyBlogCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_cta_block';
  info: {
    description: 'Call to action button block';
    displayName: 'Call to Action Block';
    icon: 'hand-pointer';
  };
  attributes: {
    button_style: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
    button_text: Schema.Attribute.String & Schema.Attribute.Required;
    button_url: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebbyBlogDividerBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_divider_block';
  info: {
    description: 'Visual divider/separator block';
    displayName: 'Divider Block';
    icon: 'minus';
  };
  attributes: {
    style: Schema.Attribute.Enumeration<['solid', 'dashed', 'dotted']> &
      Schema.Attribute.DefaultTo<'solid'>;
  };
}

export interface WebbyBlogFaqBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_faq_block';
  info: {
    description: 'Frequently Asked Questions block with title, description, button, and question-answer pairs';
    displayName: 'FAQ Block';
    icon: 'question';
  };
  attributes: {
    button_text: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    faqs: Schema.Attribute.Component<'webby-blog.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface WebbyBlogFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_faq_item';
  info: {
    description: 'Single FAQ item with question and answer';
    displayName: 'FAQ Item';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    is_expanded: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebbyBlogGalleryBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_gallery_block';
  info: {
    description: 'Image gallery block';
    displayName: 'Gallery Block';
    icon: 'images';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface WebbyBlogHeadingBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_heading_block';
  info: {
    description: 'Heading block with different sizes';
    displayName: 'Heading Block';
    icon: 'heading';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']> &
      Schema.Attribute.DefaultTo<'h2'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebbyBlogImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_image_block';
  info: {
    description: 'Image block with optional caption';
    displayName: 'Image Block';
    icon: 'image';
  };
  attributes: {
    alt_text: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface WebbyBlogImageContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_image_content_block';
  info: {
    description: 'Two-column block with image and content, with toggleable image position';
    displayName: 'Image Content Block';
    icon: 'layout';
  };
  attributes: {
    button_text: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    image_position: Schema.Attribute.Enumeration<
      ['left', 'right', 'top', 'bottom']
    > &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface WebbyBlogImagesSliderBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_images_slider_block';
  info: {
    description: 'Image slider/carousel block with multiple images';
    displayName: 'Images Slider Block';
    icon: 'slideshow';
  };
  attributes: {
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    show_arrows: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    show_dots: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    slide_interval: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1000;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3000>;
    title: Schema.Attribute.String;
  };
}

export interface WebbyBlogQuoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_quote_block';
  info: {
    description: 'Quote or testimonial block';
    displayName: 'Quote Block';
    icon: 'quote';
  };
  attributes: {
    author: Schema.Attribute.String;
    author_title: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface WebbyBlogTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_text_block';
  info: {
    description: 'Rich text content block for blog posts';
    displayName: 'Text Block';
    icon: 'file-alt';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface WebbyBlogVideoBlock extends Struct.ComponentSchema {
  collectionName: 'components_webby-blog_video_block';
  info: {
    description: 'Video embed block (YouTube, Vimeo, or uploaded video)';
    displayName: 'Video Block';
    icon: 'video';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    embed_url: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'>;
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
      'webby-blog.code-block': WebbyBlogCodeBlock;
      'webby-blog.cta-block': WebbyBlogCtaBlock;
      'webby-blog.divider-block': WebbyBlogDividerBlock;
      'webby-blog.faq-block': WebbyBlogFaqBlock;
      'webby-blog.faq-item': WebbyBlogFaqItem;
      'webby-blog.gallery-block': WebbyBlogGalleryBlock;
      'webby-blog.heading-block': WebbyBlogHeadingBlock;
      'webby-blog.image-block': WebbyBlogImageBlock;
      'webby-blog.image-content-block': WebbyBlogImageContentBlock;
      'webby-blog.images-slider-block': WebbyBlogImagesSliderBlock;
      'webby-blog.quote-block': WebbyBlogQuoteBlock;
      'webby-blog.text-block': WebbyBlogTextBlock;
      'webby-blog.video-block': WebbyBlogVideoBlock;
    }
  }
}
