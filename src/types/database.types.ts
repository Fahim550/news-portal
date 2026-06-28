export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      advertisements: {
        Row: {
          id: string
          name: string
          position: 'homepage_banner' | 'sidebar' | 'header' | 'footer' | 'article_top' | 'article_middle' | 'article_bottom' | 'popup'
          image: string | null
          redirect_url: string | null
          adsense_code: string | null
          custom_html: string | null
          start_date: string | null
          end_date: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          position: 'homepage_banner' | 'sidebar' | 'header' | 'footer' | 'article_top' | 'article_middle' | 'article_bottom' | 'popup'
          image?: string | null
          redirect_url?: string | null
          adsense_code?: string | null
          custom_html?: string | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          position?: 'homepage_banner' | 'sidebar' | 'header' | 'footer' | 'article_top' | 'article_middle' | 'article_bottom' | 'popup'
          image?: string | null
          redirect_url?: string | null
          adsense_code?: string | null
          custom_html?: string | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      authors: {
        Row: {
          id: string
          name: string
          slug: string
          photo: string | null
          bio: string | null
          social_links: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          photo?: string | null
          bio?: string | null
          social_links?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          photo?: string | null
          bio?: string | null
          social_links?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image: string | null
          icon: string | null
          status: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image?: string | null
          icon?: string | null
          status?: boolean | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image?: string | null
          icon?: string | null
          status?: boolean | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      homepage_sections: {
        Row: {
          id: string
          name: string
          type: string
          category_id: string | null
          article_count: number | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          category_id?: string | null
          article_count?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          category_id?: string | null
          article_count?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      news: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string | null
          content: string | null
          featured_image: string | null
          gallery_images: string[] | null
          video_url: string | null
          category_id: string | null
          subcategory_id: string | null
          author_id: string | null
          is_breaking: boolean | null
          is_featured: boolean | null
          is_trending: boolean | null
          is_editors_choice: boolean | null
          status: 'draft' | 'published' | 'pending' | null
          views: number | null
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary?: string | null
          content?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          video_url?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          author_id?: string | null
          is_breaking?: boolean | null
          is_featured?: boolean | null
          is_trending?: boolean | null
          is_editors_choice?: boolean | null
          status?: 'draft' | 'published' | 'pending' | null
          views?: number | null
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string | null
          content?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          video_url?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          author_id?: string | null
          is_breaking?: boolean | null
          is_featured?: boolean | null
          is_trending?: boolean | null
          is_editors_choice?: boolean | null
          status?: 'draft' | 'published' | 'pending' | null
          views?: number | null
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      news_tags: {
        Row: {
          news_id: string
          tag_id: string
        }
        Insert: {
          news_id: string
          tag_id: string
        }
        Update: {
          news_id?: string
          tag_id?: string
        }
      }
      settings: {
        Row: {
          id: string
          site_name: string
          logo: string | null
          favicon: string | null
          contact_email: string | null
          contact_phone: string | null
          contact_address: string | null
          social_links: Json | null
          footer_info: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          site_name?: string
          logo?: string | null
          favicon?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_address?: string | null
          social_links?: Json | null
          footer_info?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          site_name?: string
          logo?: string | null
          favicon?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_address?: string | null
          social_links?: Json | null
          footer_info?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ad_position: 'homepage_banner' | 'sidebar' | 'header' | 'footer' | 'article_top' | 'article_middle' | 'article_bottom' | 'popup'
      news_status: 'draft' | 'published' | 'pending'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
