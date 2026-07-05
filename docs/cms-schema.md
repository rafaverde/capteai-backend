# Capte.AI Website
# CMS Schema (Strapi)

> Especificação da modelagem do CMS.

---

# Components

## Hero

| Campo | Tipo |
|------|------|
| headline | Text (opcional) |
| title | Text |
| image | Media |
| ctas | Repeatable HeroCTA |

Observação: `title` utiliza a sintaxe `[texto]` para destaque. O frontend converte automaticamente para um elemento destacado.

---

## HeroCTA

| Campo | Tipo |
|------|------|
| label | Text |
| url | Text |
| icon | Enum |

Enum:

- none
- arrowLink
- whatsapp

---

## SEO

| Campo | Tipo |
|------|------|
| title | Text |
| description | Text |
| image | Media (opcional) |

---

## SocialLink

| Campo | Tipo |
|------|------|
| label | Text |
| url | Text |
| icon | Enum |

Enum:

- instagram
- linkedin
- youtube
- facebook
- x
- tiktok

---

## AudienceItem

| Campo | Tipo |
|------|------|
| text | Text |

---

## WhoIsItFor

| Campo | Tipo |
|------|------|
| title | Text |
| items | Repeatable AudienceItem |

---

## HowItWorks

| Campo | Tipo |
|------|------|
| title | Text |
| description | Text |

---

# Collection Types

## Service

| Campo | Tipo |
|------|------|
| name | Text |
| slug | UID |
| summary | Text |
| hero | Component Hero |
| icon | Media (SVG) |
| whoIsItFor | Component WhoIsItFor |
| howItWorks | Repeatable HowItWorks |
| seo | Component SEO (opcional) |

---

## Client

| Campo | Tipo |
|------|------|
| name | Text |
| logo | Media |

---

## Testimonial

| Campo | Tipo |
|------|------|
| author | Text |
| role | Text |
| company | Text |
| content | Text |
| avatar | Media (opcional) |

---

## Case

| Campo | Tipo |
|------|------|
| clientName | Text |
| clientLogo | Media |
| prefix | Text (opcional) |
| value | Text |
| suffix | Text (opcional) |
| description | Text |

---

## FundingEntity

| Campo | Tipo |
|------|------|
| name | Text |
| logo | Media |

---

## Statistic

| Campo | Tipo |
|------|------|
| title | Text |
| value | Number |
| prefix | Text (opcional) |
| suffix | Text (opcional) |
| decimals | Integer (opcional) |

---

## HeroSlide

| Campo | Tipo |
|------|------|
| title | Text |
| description | Text |
| image | Media |
| imagePosition | Enum (left/right) |
| altText | Text |
| ctas | Repeatable HeroCTA |
| statistic | Relation -> Statistic (opcional) |
| order | Integer |

---

# Single Types

## Settings

| Campo | Tipo |
|------|------|
| companyName | Text |
| logo | Media |
| favicon | Media |
| email | Email |
| phone | Text |
| whatsapp | Text |
| address | Text |
| socialLinks | Repeatable SocialLink |
| defaultSeo | SEO |

---

## AboutPage

| Campo | Tipo |
|------|------|
| hero | Hero |
| seo | SEO (opcional) |

---

## CasesPage

| Campo | Tipo |
|------|------|
| hero | Hero |
| seo | SEO (opcional) |

---

# Home

Não possui Single Type.

Composição:

- HeroSlide
- Client
- Statistic
- Service
- Testimonial
- Settings
