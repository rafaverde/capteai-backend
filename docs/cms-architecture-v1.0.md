# Capte.AI Website
# Arquitetura do CMS (Strapi)

> Versão 1.1 – Documento de arquitetura do CMS.

Este documento consolida as decisões arquiteturais do CMS da Capte.AI.

---

# Stack

## Backend

- Strapi
- PostgreSQL

## Desenvolvimento

- PostgreSQL via Docker
- Strapi local

## Produção

- Railway (Strapi + PostgreSQL)

---

# Arquitetura

```text
Frontend (Next.js)
        │
        ▼
Camada de Integração (Services/Mappers)
        │
        ▼
      Strapi
        │
        ▼
   PostgreSQL
```

O frontend nunca consome diretamente o formato do Strapi.

---

# Filosofia

- O frontend define a estrutura.
- O CMS gerencia conteúdo.
- Sem Dynamic Zones.
- Sem modelagem especulativa.
- A presença do conteúdo determina a renderização.
- Apenas HeroSlide utiliza campo `order`.

---

# Estrutura

## Collection Types

- Service
- Client
- Testimonial
- Case
- FundingEntity
- HeroSlide
- Statistic
- BlogCategory
- BlogTag
- BlogPost

## Single Types

- Settings
- AboutPage
- CasesPage

## Components

- Hero
- HeroCTA
- SEO
- SocialLink
- WhoIsItFor
- AudienceItem
- HowItWorks

---

# Components

## Hero

- headline (Text)
- title (Text com destaque via sintaxe `[texto]`)
- image (Media)
- ctas (Repeatable HeroCTA)

## HeroCTA

- label
- url
- icon (none | arrowLink | whatsapp)

## SEO

- title
- description
- image (opcional)

## SocialLink

- label
- url
- icon (instagram, linkedin, youtube, facebook, x, tiktok)

## WhoIsItFor

- items (Repeatable AudienceItem)

### AudienceItem

- text

## HowItWorks

- title
- description

A numeração é gerada automaticamente pelo frontend.

---

# Collection Types

## Service

- name
- slug
- summary
- hero (Hero)
- icon (SVG)
- whoIsItFor (WhoIsItFor)
- howItWorks (Repeatable HowItWorks)
- seo (SEO)

## Client

- name
- logo

## Testimonial

- author
- role
- company
- content
- avatar (opcional)

## Case

- clientName
- clientLogo
- entities (Text)
- prefix (opcional)
- value (Text)
- suffix (opcional)
- description

## FundingEntity

- name
- logo

## HeroSlide

- title
- description
- image
- imagePosition (left/right)
- altText
- ctas (Repeatable HeroCTA)
- statistic (Relation Statistic, opcional)
- order

## Statistic

- title
- value (Number)
- prefix (opcional)
- suffix (opcional)
- decimals (opcional)

---

## BlogCategory
- name
- slug

--- 

## BlogTag
- name
- slug

--- 

## BlogPost
- title
- slug
- excerpt
- content (Rich Text)
- featuredImage (Media)
- categories (Relation BlogCategory)
- tags (Relation BlogTag)
- seo (Component SEO, opcional)

# Single Types

## Settings

- companyName
- logo
- favicon
- email
- phone
- whatsapp
- address
- socialLinks (Repeatable SocialLink)
- defaultSeo (SEO)

## AboutPage

- hero (Hero)
- seo (SEO)

Apenas o Hero é editável.

## CasesPage

- hero (Hero)
- seo (SEO)

Os Cases e FundingEntities são consumidos diretamente das Collections.

---

# Home

Não possui Single Type.

É composta por:

- HeroSlide
- Client
- Statistic
- Service
- Testimonial
- Settings

---

# Próxima Etapa

- Criar projeto Strapi
- Configurar PostgreSQL
- Criar Components
- Criar Collection Types
- Criar Single Types
- Configurar permissões
- Popular dados
- Integrar com o frontend

---

# Status

✅ Arquitetura concluída.
