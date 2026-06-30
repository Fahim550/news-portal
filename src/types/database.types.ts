export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
        Relationships: any[]
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
        Relationships: any[]
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
        Relationships: any[]
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
        Relationships: any[]
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
        Relationships: any[]
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
        Relationships: any[]
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
        Relationships: any[]
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
        Relationships: any[]
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: any[]
      }
      profiles: {
        Row: {
          id: string
          role_id: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          bio: string | null
          social_links: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          role_id?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          social_links?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          role_id?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          social_links?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: any[]
      }
      comments: {
        Row: {
          id: string
          news_id: string | null
          user_id: string | null
          parent_id: string | null
          content: string
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          news_id?: string | null
          user_id?: string | null
          parent_id?: string | null
          content: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          news_id?: string | null
          user_id?: string | null
          parent_id?: string | null
          content?: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: any[]
      }
      media: {
        Row: {
          id: string
          uploader_id: string | null
          file_name: string
          file_path: string
          file_type: string | null
          file_size: number | null
          alt_text: string | null
          folder: string | null
          created_at: string
        }
        Insert: {
          id?: string
          uploader_id?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          file_size?: number | null
          alt_text?: string | null
          folder?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          uploader_id?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          file_size?: number | null
          alt_text?: string | null
          folder?: string | null
          created_at?: string
        }
        Relationships: any[]
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
