# Capte.AI Website
# Arquitetura do CMS (Strapi)

> Documento de decisões arquiteturais do CMS da Capte.AI.
>
> Este documento registra apenas decisões consolidadas durante a modelagem do backend.
>
> O objetivo é servir como referência para implementação do Strapi e integração com o frontend, evitando retrabalho e mudanças de direção ao longo do projeto.

---

# Stack

## Backend

- Strapi
- PostgreSQL

## Desenvolvimento

- PostgreSQL executando via Docker
- Strapi executando localmente (fora do Docker)

## Produção

- Strapi hospedado no Railway
- PostgreSQL do Railway

---

# Filosofia do Projeto

O frontend é responsável pela estrutura e pela experiência do usuário.

O Strapi é responsável exclusivamente pelo gerenciamento de conteúdo.

O cliente **não terá liberdade para alterar a estrutura das páginas**, apenas o conteúdo previsto para cada seção.

Não serão utilizadas Dynamic Zones para montagem de páginas.

Cada página possui uma estrutura fixa implementada no Next.js, consumindo apenas os dados necessários do CMS.

Frontend (Next.js)

```
↓

Camada de Integração

↓

Strapi

↓

PostgreSQL
```

---

# Regras Arquiteturais

## 1. O Frontend é o dono da estrutura

O React define:

- Layout
- Ordem das seções
- Componentes
- Responsividade
- Comportamentos

O CMS fornece apenas os dados.

---

## 2. O CMS gerencia conteúdo

O Strapi não deve conhecer regras de apresentação.

Ele apenas disponibiliza informações para consumo do frontend.

---

## 3. Sem modelagem especulativa

Campos serão criados apenas quando houver necessidade real.

Não serão adicionados campos "para o futuro".

A evolução do modelo acontecerá conforme novas necessidades surgirem.

---

## 4. Sem Dynamic Zones

A estrutura das páginas permanece fixa.

Isso reduz complexidade tanto no CMS quanto no frontend.

---

## 5. O Frontend nunca dependerá do formato do Strapi

Esta é uma regra permanente do projeto.

Os componentes React nunca consumirão diretamente o retorno do Strapi.

Sempre existirá uma camada de integração responsável por transformar os dados.

Exemplo:

```
Strapi
↓

Service API

↓

Interfaces da aplicação

↓

Componentes React
```

Essa camada será responsável por:

- normalizar Media;
- normalizar relações;
- transformar Components;
- converter `documentId`;
- adaptar o contrato da aplicação.

Isso garante desacoplamento entre frontend e CMS.

---

## 6. Ordenação

A regra geral do projeto é **não utilizar campo `order`**.

Os conteúdos utilizarão a ordenação nativa do Strapi (`publishedAt`).

### Exceção

O Hero Slider utilizará um campo:

```
order
```

Motivo:

A sequência dos slides faz parte da experiência da Home.

---

## 7. A presença do conteúdo determina a renderização

Sempre que possível, o frontend utilizará a presença ou ausência de conteúdo para decidir o que será exibido.

Exemplos:

- Avatar do depoimento;
- Imagens opcionais;
- CTAs opcionais.

Evita-se a criação de campos boolean apenas para controlar visibilidade.

Essa abordagem simplifica o CMS, reduz redundância e melhora a experiência de edição.

---

# Home

A Home não possui um Single Type no CMS.

Seu conteúdo é composto exclusivamente por entidades reutilizáveis.

Estrutura:

- HeroSlider
- Client
- Statistic
- Service
- Testimonial
- Settings

Essa abordagem reduz complexidade e evita a criação de páginas sem conteúdo próprio.

--- 

# Estrutura Inicial

## Collection Types

- Service
- Client
- Testimonial
- Case
- FundingEntity
- HeroSlide
- Statistic

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

Outros componentes serão adicionados conforme a modelagem evoluir.

---

# Component: Hero

## Objetivo

Componente reutilizável utilizado nos heróis das páginas.

Inicialmente será utilizado em:

- Services
- About
- CasesPage

---

## Campos

| Campo | Tipo |
|--------|------|
| headline | Text (opcional) |
| title | Text |
| image | Media |
| ctas | Repeatable HeroCTA (0..*)

---

## Destaque de texto

O campo `title` será um **Text**, e **não** um Rich Text.

Para destacar partes do título, será utilizada uma sintaxe simples baseada em colchetes.

Exemplo no CMS:

```
Transformamos a sua [inovação] em recursos.
```

O frontend será responsável por converter automaticamente o conteúdo entre colchetes em elementos de destaque.

Resultado:

```html
Transformamos a sua <span>inovação</span> em recursos.
```

Essa abordagem evita que o cliente escreva HTML diretamente e elimina a necessidade de sanitização para este componente.

---

# Component: HeroCTA

## Campos

| Campo | Tipo |
|--------|------|
| label | Text |
| url | Text |
| icon | Enumeration |

---

## Enum

```
none
arrowLink
whatsapp
```

---

# Collection Type: Service

## Objetivo

Representa um serviço oferecido pela Capte.AI.

O mesmo registro será utilizado:

- nos cards da Home;
- na página individual do serviço.

Não existirão registros separados para essas visualizações.

---

## Campos

| Campo | Tipo |
|--------|------|
| name | Text |
| slug | UID |
| summary | Text |
| hero | Hero |
| icon | Media (SVG) |
| whoIsItFor | WhoIsItFor |
| howItWorks | Repeatable HowItWorks |
| seo | SEO (opcional) |

---

## Ícones

Os ícones serão enviados como arquivos SVG.

Não serão utilizados nomes de bibliotecas de ícones (Remix Icon, Lucide etc.) dentro do CMS.

Motivos:

- desacoplamento do frontend;
- independência de bibliotecas;
- possibilidade de utilizar ícones personalizados;
- não exige deploy do frontend para adicionar novos ícones.

---

## Convenção dos SVGs

Os arquivos deverão utilizar:

```
fill="currentColor"
```

ou

```
stroke="currentColor"
```

Isso permite que o frontend controle a aparência utilizando Tailwind.

Exemplos:

```
text-primary
text-white
text-muted-foreground
hover:text-primary
```

---

## Frontend

Será criado um componente único responsável pela renderização de SVGs vindos do CMS.

Exemplo:

```tsx
<Icon
    svg={service.icon}
    className="size-8 text-primary"
/>
```

Todo o tratamento dos SVGs ficará centralizado neste componente.

Nenhum outro componente da aplicação deverá renderizar SVG diretamente.

---

# Collection Type: Client

## Objetivo

Representa uma empresa atendida pela Capte.AI.

Atualmente é utilizado exclusivamente como logo em carrosséis distribuídos pelo site.

Não possui página própria.

---

## Campos

| Campo | Tipo |
|--------|------|
| name | Text |
| logo | Media |

---

## Observações

Não serão adicionados campos como:

- website;
- descrição;
- Instagram;
- LinkedIn;
- segmento.

Essas informações não fazem parte da experiência atual do site.

Caso futuramente exista uma página dedicada aos clientes, novos campos poderão ser adicionados sem impacto na estrutura existente.

---

# Contratos do Frontend

As interfaces da aplicação representam o contrato interno do frontend.

Essas interfaces não precisam refletir exatamente a estrutura retornada pelo Strapi.

Exemplo:

```ts
export interface Client {
    id: string
    name: string
    logoUrl: string
}
```

A camada de integração será responsável por transformar:

```
Media

↓

logoUrl
```

O mesmo princípio será aplicado para todas as demais entidades do projeto.

---

# Collection Type: Testimonial

## Objetivo

Representa um depoimento de um cliente da Capte.AI.

Os depoimentos serão utilizados em diferentes páginas do site, sempre em formato de citação.

---

## Campos

| Campo | Tipo |
|--------|------|
| author | Text |
| role | Text |
| company | Text |
| content | Text |
| avatar | Media (opcional) |

---

## Avatar

O avatar é opcional.

A presença ou ausência da imagem define automaticamente como o componente será renderizado no frontend.

Não será utilizado um campo boolean para controlar sua exibição.

---

## Conteúdo

O campo `content` será um **Text** simples.

Não será utilizado Rich Text.

Os depoimentos não suportarão:

- HTML
- vídeos
- links
- listas
- formatação

O objetivo é manter o conteúdo simples e padronizado.

---

## Observações

A renderização do avatar seguirá a regra geral do projeto:

> A presença do conteúdo determina a renderização.

Sempre que possível, evitaremos criar campos boolean apenas para esconder ou mostrar elementos da interface.

---

# Collection Type: Case

## Objetivo

Representa um case de sucesso da Capte.AI.

Os cases serão utilizados exclusivamente como cards institucionais na página de Cases.

Não existirão páginas individuais para cada case.

---

## Campos

| Campo | Tipo |
|--------|------|
| clientName | Text |
| clientLogo | Media |
| prefix | Text (opcional) |
| value | Text |
| suffix | Text (opcional) |
| description | Text |

---

## Valor captado

O valor será armazenado como texto.

Exemplos:

```
R$ 14 Milhões
R$ 8 Milhões
R$ 5 Milhões
```

Os campos `prefix` e `suffix` permitem maior liberdade editorial.

Exemplos:

```
prefix: "+"
value: "R$ 5 Milhões"
suffix: ""
```

ou

```
prefix: "Mais de"
value: "R$ 70 Milhões"
suffix: "captados"
```

Essa abordagem elimina regras de formatação no frontend.

---

## Conteúdo

O campo `description` será um **Text** simples.

Não será utilizado Rich Text.

O objetivo é manter a padronização dos cards e evitar formatações desnecessárias.

---

## Ordenação

Não será utilizado campo `order`.

A ordenação seguirá a regra geral do projeto utilizando `publishedAt`.

---

## Observações

Os cases representam apenas conteúdo resumido.

Caso futuramente exista uma página individual para cada case, essa modelagem poderá evoluir sem impacto na estrutura atual.

---

# Collection Type: FundingEntity

## Objetivo

Representa uma instituição ou entidade onde a Capte.AI já captou recursos para seus clientes.

Atualmente é utilizado exclusivamente como um carrossel de logos na página de Cases.

Não possui página própria nem informações adicionais.

---

## Campos

| Campo | Tipo |
|--------|------|
| name | Text |
| logo | Media |

---

## Ordenação

Não será utilizado campo `order`.

A ordenação seguirá a regra geral do projeto utilizando `publishedAt`.

---

## Observações

Não serão adicionados campos como:

- website;
- descrição;
- URL;
- categoria.

A entidade possui responsabilidade exclusivamente visual dentro do site.

Caso futuramente seja criada uma página dedicada às entidades de fomento, novos campos poderão ser adicionados sem impacto na estrutura atual.

---

# Contrato do Frontend

O frontend consumirá uma interface própria da aplicação.

Exemplo:

```ts
export interface FundingEntity {
    id: string
    name: string
    logoUrl: string
}
```

A camada de integração será responsável por transformar o retorno do Strapi para esse contrato.

---

# Collection Type: HeroSlide

## Objetivo

Representa um slide do Hero principal da Home.

O Hero Slider é exclusivo da Home e possui comportamento próprio (autoplay, paginação e navegação).

Cada slide possui seu próprio conteúdo e pode, opcionalmente, destacar uma estatística global do site.

---

## Campos

| Campo | Tipo |
|--------|------|
| title | Text |
| description | Text |
| image | Media |
| imagePosition | Enumeration |
| altText | Text |
| ctas | Repeatable HeroCTA |
| statistic | Relation (Statistic) (opcional) |
| order | Integer |

---

## Enum

### imagePosition

```
left
right
```

---

## Destaque de texto

O campo `title` segue exatamente a mesma regra do componente `Hero`.

Para destacar partes do texto será utilizada a sintaxe:

```
Transformamos sua [inovação] em recursos.
```

O frontend será responsável por converter automaticamente o conteúdo entre colchetes em um elemento de destaque.

Não será utilizado HTML.

---

## Estatística

O slide poderá possuir uma relação opcional com uma estatística global.

Quando essa relação existir, o frontend exibirá automaticamente o destaque visual previsto no layout.

Quando não existir, o slide será renderizado normalmente.

Não será utilizado um campo boolean para controlar essa funcionalidade.

---

## Ordenação

Esta é uma das exceções do projeto.

O Hero Slider utilizará um campo `order`, pois a sequência dos slides faz parte da experiência da Home.

---

## Publicação

Não será utilizado campo `active`.

A publicação do conteúdo será controlada exclusivamente pelo sistema nativo do Strapi.

---

# Collection Type: Statistic

## Objetivo

Representa um indicador numérico institucional da Capte.AI.

As estatísticas poderão ser utilizadas em diferentes áreas do site, mantendo uma única fonte de verdade para os indicadores apresentados.

Inicialmente será utilizada em:

- Seção de indicadores da Home;
- Destaque opcional do Hero Slider.

---

## Campos

| Campo | Tipo |
|--------|------|
| title | Text |
| value | Number |
| prefix | Text (opcional) |
| suffix | Text (opcional) |
| decimals | Integer (opcional) |

---

## Responsabilidade

Diferentemente de outras entidades do projeto, como `Case`, a `Statistic` representa um valor numérico que será manipulado pelo frontend.

O componente é responsável pela animação do contador e pela formatação do valor.

Exemplos:

```
prefix: "+"
value: 70
suffix: "M"
title: "Em recursos não reembolsáveis captados."
```

```
value: 500
title: "Clientes e empresas atendidas."
```

```
value: 700
title: "Projetos técnicos elaborados."
```

---

## Decimais

O campo `decimals` controla a quantidade de casas decimais exibidas pelo contador.

Caso não informado, o frontend utilizará o valor padrão (`0`).

---

## Observações

Não serão adicionados campos de apresentação, como:

- className;
- prefixClassName;
- estilos;
- cores.

Essas responsabilidades pertencem exclusivamente ao frontend.

---

## Ordenação

Não será utilizado campo `order`.

A ordenação seguirá a regra geral do projeto utilizando `publishedAt`.

---

# Single Type: Settings

## Objetivo

Centralizar as informações institucionais globais da Capte.AI utilizadas em todo o site.

O Settings não possui responsabilidade sobre a estrutura ou navegação da aplicação.

Seu objetivo é disponibilizar apenas informações institucionais compartilhadas entre diferentes páginas.

---

## Campos

| Campo | Tipo |
|--------|------|
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

## Responsabilidades

O Settings será responsável por fornecer:

- identidade visual da empresa;
- informações de contato;
- endereço;
- redes sociais;
- SEO padrão.

---

## Não pertence ao Settings

Os seguintes itens permanecem definidos pelo frontend:

- menu de navegação;
- estrutura do Header;
- estrutura do Footer;
- links internos da aplicação;
- textos dos botões.

---

## Header

O Header consumirá apenas:

- logo;
- número do WhatsApp.

O botão "Falar com especialista" será construído pelo frontend utilizando o número de WhatsApp configurado no Settings.

---

## Footer

O Footer consumirá:

- logo;
- email;
- telefone;
- WhatsApp;
- endereço;
- redes sociais.

A estrutura permanece fixa no frontend.

---

# Component: SEO

## Objetivo

Centralizar as informações de SEO utilizadas pelos Single Types.

---

## Campos

| Campo | Tipo |
|--------|------|
| title | Text |
| description | Text |
| image | Media (opcional) |

---

## Observações

Cada página poderá sobrescrever essas informações.

Na ausência de SEO específico, o frontend utilizará o SEO padrão definido em `Settings`.

--- 

# Single Type: AboutPage

## Objetivo

Representa o conteúdo exclusivo da página "Sobre".

Atualmente apenas o Hero é editável pelo CMS.

O restante da página permanece implementado no frontend.

---

## Campos

| Campo | Tipo |
|--------|------|
| hero | Hero |
| seo | SEO (opcional) |

---

## Observações

Missão, visão, valores e demais conteúdos institucionais permanecem fixos no frontend.

Essa decisão evita alterações estruturais e preserva a consistência do layout.

---

# Single Type: CasesPage

## Objetivo

Representa o conteúdo exclusivo da página de Cases.

Atualmente apenas o Hero é editável pelo CMS.

Os cards de cases e as entidades de fomento são consumidos diretamente de suas respectivas Collections.

---

## Campos

| Campo | Tipo |
|--------|------|
| hero | Hero |
| seo | SEO (opcional) |

---

## Observações

Os conteúdos da página são compostos automaticamente pelo frontend utilizando:

- Case
- FundingEntity

Não existem configurações adicionais para esta página.

---

# Component: SocialLink

## Objetivo

Representa um link para uma rede social da empresa.

---

## Campos

| Campo | Tipo |
|--------|------|
| label | Text |
| url | Text |
| icon | Enumeration |

---

## Enum

```
instagram
linkedin
youtube
facebook
x
tiktok
```

---

## Observações

A renderização dos ícones é responsabilidade do frontend.

O CMS apenas informa qual rede social representa o link.

---

# Component: WhoIsItFor

## Objetivo

Representa a seção "Pra quem é?" presente nas páginas de Serviço.

---

## Campos

| Campo | Tipo |
|--------|------|
| title | Text |
| items | Repeatable AudienceItem |

---

## Component: AudienceItem

| Campo | Tipo |
|--------|------|
| text | Text |

---

## Observações

A estrutura visual da seção permanece fixa no frontend.

O CMS controla apenas o conteúdo.

--- 

# Component: HowItWorks

## Objetivo

Representa uma etapa da seção "Como funciona?" das páginas de Serviço.

---

## Campos

| Campo | Tipo |
|--------|------|
| title | Text |
| description | Text |

---

## Observações

A numeração (01, 02, 03...) será gerada automaticamente pelo frontend de acordo com a posição do item.

Não será criado um campo específico para o número da etapa.

--- 

# Status da Modelagem

## Concluído

### Components

- ✅ Hero
- ✅ HeroCTA

### Collection Types

- ✅ Service
- ✅ Client
- ✅ Testimonial
- ✅ Case
- ✅ FundingEntity
- ✅ HeroSlider
- ✅ Statistic

## Single Types
- ✅ Settings
- ✅ AboutPage
- ✅ CasesPage

## Components
- ✅ SEO
- ✅ SocialLink
- ✅ WhoIsItFor
- ✅ HowItWorks

### Regras Arquiteturais

- ✅ Filosofia do CMS
- ✅ Estratégia de integração Frontend ⇄ Strapi
- ✅ Estratégia de ordenação
- ✅ Estratégia para SVGs
- ✅ Estrutura inicial do projeto

---

