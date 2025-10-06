import { WPGraphQLClient } from '@/services/wpGraphqlClient';

export type HomepageHeroSlide = {
  tour?: {
    id: string;
    title: string;
    slug: string;
    featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
    tourFields?: { subtitle?: string; duration?: string; route?: string };
  } | null;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
};

export type HomepageFeaturesBlock = {
  icon?: string | null;
  headline?: string | null;
  description?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
};

export type HomepageData = {
  slides: HomepageHeroSlide[];
  features: HomepageFeaturesBlock[];
  tours: Array<{
    id: string;
    title: string;
    slug: string;
    featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
    tourFields?: {
      subtitle?: string;
      duration?: string;
      route?: string;
      pricing?: { double?: number; currency?: string };
      highlights?: string[];
    };
  }>;
};

const HERO_QUERY = `
  query GetHomepageHero {
    page(id: "homepage", idType: SLUG) {
      homepageFields {
        heroSlideshow { slides {
          headline
          subheadline
          ctaText
          ctaLink
          tour { ... on GolfTour {
            id
            title
            slug
            featuredImage { node { sourceUrl altText } }
            tourFields { subtitle duration route }
          }}
        }}
        featureBlocks { icon headline description ctaText ctaLink }
      }
    }
  }
`;

const TOURS_QUERY = `
  query GetHomepageTours {
    golfTours(first: 8, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        slug
        featuredImage { node { sourceUrl altText } }
        tourFields {
          subtitle
          duration
          route
          pricing { double currency }
          highlights
        }
      }
    }
  }
`;

export class HomepageService {
  private gql = new WPGraphQLClient();

  async fetchHomepage(): Promise<HomepageData> {
    const [heroRes, toursRes] = await Promise.all([
      this.gql.request<{ page: { homepageFields?: { heroSlideshow?: { slides?: HomepageHeroSlide[] }, featureBlocks?: HomepageFeaturesBlock[] } } }>(
        { query: HERO_QUERY }
      ),
      this.gql.request<{ golfTours: { nodes: HomepageData['tours'] } }>({ query: TOURS_QUERY })
    ]);

    const slides = heroRes?.page?.homepageFields?.heroSlideshow?.slides || [];
    const features = heroRes?.page?.homepageFields?.featureBlocks || [];
    const tours = toursRes?.golfTours?.nodes || [];
    return { slides, features, tours };
  }
}


