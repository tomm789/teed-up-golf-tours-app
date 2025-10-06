import { WPGraphQLClient } from '@/services/wpGraphqlClient';

export type SingleTour = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
  tourFields?: {
    subtitle?: string;
    dates?: string;
    duration?: string;
    route?: string;
    badges?: string[];
    highlights?: string[];
    pricing?: { double?: number; single?: number; nonGolfer?: number; currency?: string };
  };
  // Related entities (optional during rollout)
  accommodations?: { nodes: Array<{ id: string; title: string; featuredImage?: { node?: { sourceUrl?: string; altText?: string } }; accommodationFields?: { location?: string; rating?: number; features?: string[]; description?: string } }> };
  golfCourses?: { nodes: Array<{ id: string; title: string; featuredImage?: { node?: { sourceUrl?: string; altText?: string } }; golfCourseFields?: { location?: string; par?: number; yardage?: number; designer?: string; description?: string } }> };
  events?: { nodes: Array<{ id: string; title: string; eventFields?: { eventDate?: string; location?: string; description?: string; featured?: boolean } }> };
  activities?: { nodes: Array<{ id: string; title: string; featuredImage?: { node?: { sourceUrl?: string; altText?: string } }; activityFields?: { duration?: string; difficulty?: string; description?: string; included?: string[] } }> };
  days?: Array<{ id: string; title?: string; description?: string; activities?: string[]; meals?: string[]; accommodation?: string[] }>;
  host?: { id: string; title?: string; featuredImage?: { node?: { sourceUrl?: string; altText?: string } }; hostFields?: { name?: string; title?: string; bio?: string } } | null;
  faq?: Array<{ question?: string; answer?: string }>;
  similarTours?: { nodes: Array<{ id: string; title: string; slug: string; featuredImage?: { node?: { sourceUrl?: string } } }> };
};

const SINGLE_TOUR_QUERY = `
  query GetTour($slug: ID!) {
    golfTour(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      featuredImage { node { sourceUrl altText } }
      tourFields {
        subtitle
        dates
        duration
        route
        badges
        highlights
        pricing { double single nonGolfer currency }
      }
      accommodations { nodes { id title featuredImage { node { sourceUrl altText } } accommodationFields { location rating features description } } }
      golfCourses { nodes { id title featuredImage { node { sourceUrl altText } } golfCourseFields { location par yardage designer description } } }
      events { nodes { id title eventFields { eventDate location description featured } } }
      activities { nodes { id title featuredImage { node { sourceUrl altText } } activityFields { duration difficulty description included } } }
      faq { question answer }
      similarTours: relatedTours { nodes { id title slug featuredImage { node { sourceUrl } } } }
    }
  }
`;

export class TourService {
  private gql = new WPGraphQLClient();

  async fetchTour(slug: string): Promise<SingleTour | null> {
    const data = await this.gql.request<{ golfTour: SingleTour | null }>({
      query: SINGLE_TOUR_QUERY,
      variables: { slug }
    });
    return data?.golfTour || null;
  }
}


