export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          requirement_type: string
          requirement_value: number | null
          title: string
          xp_reward: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          requirement_type: string
          requirement_value?: number | null
          title: string
          xp_reward?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          requirement_type?: string
          requirement_value?: number | null
          title?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          duration_hours: number | null
          emoji: string | null
          gradient: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          title: string
          total_lessons: number | null
          updated_at: string
          xp_reward: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_hours?: number | null
          emoji?: string | null
          gradient?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          title: string
          total_lessons?: number | null
          updated_at?: string
          xp_reward?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_hours?: number | null
          emoji?: string | null
          gradient?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          title?: string
          total_lessons?: number | null
          updated_at?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: Json | null
          course_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          order_index: number
          title: string
          updated_at: string
          xp_reward: number | null
        }
        Insert: {
          content?: Json | null
          course_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index: number
          title: string
          updated_at?: string
          xp_reward?: number | null
        }
        Update: {
          content?: Json | null
          course_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number
          title?: string
          updated_at?: string
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          completed_at: string | null
          completion_percentage: number | null
          created_at: string
          demo_url: string | null
          description: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          is_public: boolean | null
          likes_count: number | null
          lines_of_code: number | null
          project_type: string | null
          status: string | null
          tech_stack: string[] | null
          title: string
          updated_at: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          likes_count?: number | null
          lines_of_code?: number | null
          project_type?: string | null
          status?: string | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          likes_count?: number | null
          lines_of_code?: number | null
          project_type?: string | null
          status?: string | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: []
      }
      portfolio_stats: {
        Row: {
          code_quality_score: number | null
          completed_projects: number | null
          created_at: string
          github_connected: boolean | null
          github_repos_count: number | null
          github_username: string | null
          id: string
          live_deployments_count: number | null
          team_projects_count: number | null
          technologies_mastered: string[] | null
          total_likes: number | null
          total_lines_of_code: number | null
          total_projects: number | null
          total_views: number | null
          updated_at: string
          uptime_percentage: number | null
          user_id: string
        }
        Insert: {
          code_quality_score?: number | null
          completed_projects?: number | null
          created_at?: string
          github_connected?: boolean | null
          github_repos_count?: number | null
          github_username?: string | null
          id?: string
          live_deployments_count?: number | null
          team_projects_count?: number | null
          technologies_mastered?: string[] | null
          total_likes?: number | null
          total_lines_of_code?: number | null
          total_projects?: number | null
          total_views?: number | null
          updated_at?: string
          uptime_percentage?: number | null
          user_id: string
        }
        Update: {
          code_quality_score?: number | null
          completed_projects?: number | null
          created_at?: string
          github_connected?: boolean | null
          github_repos_count?: number | null
          github_username?: string | null
          id?: string
          live_deployments_count?: number | null
          team_projects_count?: number | null
          technologies_mastered?: string[] | null
          total_likes?: number | null
          total_lines_of_code?: number | null
          total_projects?: number | null
          total_views?: number | null
          updated_at?: string
          uptime_percentage?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          last_activity_at: string | null
          level: number | null
          privacy_settings: Json | null
          streak_days: number | null
          updated_at: string
          user_id: string
          username: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          last_activity_at?: string | null
          level?: number | null
          privacy_settings?: Json | null
          streak_days?: number | null
          updated_at?: string
          user_id: string
          username?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          last_activity_at?: string | null
          level?: number | null
          privacy_settings?: Json | null
          streak_days?: number | null
          updated_at?: string
          user_id?: string
          username?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      project_challenges: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty: string | null
          duration_hours: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          resources: Json | null
          steps: Json
          tech_stack: string[] | null
          title: string
          updated_at: string
          xp_reward: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty?: string | null
          duration_hours?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          resources?: Json | null
          steps?: Json
          tech_stack?: string[] | null
          title: string
          updated_at?: string
          xp_reward?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty?: string | null
          duration_hours?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          resources?: Json | null
          steps?: Json
          tech_stack?: string[] | null
          title?: string
          updated_at?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      project_likes: {
        Row: {
          id: string
          liked_at: string
          project_id: string
          user_id: string
        }
        Insert: {
          id?: string
          liked_at?: string
          project_id: string
          user_id: string
        }
        Update: {
          id?: string
          liked_at?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_likes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_views: {
        Row: {
          id: string
          ip_address: unknown | null
          project_id: string
          user_agent: string | null
          viewed_at: string
          viewer_id: string | null
        }
        Insert: {
          id?: string
          ip_address?: unknown | null
          project_id: string
          user_agent?: string | null
          viewed_at?: string
          viewer_id?: string | null
        }
        Update: {
          id?: string
          ip_address?: unknown | null
          project_id?: string
          user_agent?: string | null
          viewed_at?: string
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_views_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_collaborations: {
        Row: {
          collaborator_id: string
          id: string
          joined_at: string
          project_id: string
          role: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          collaborator_id: string
          id?: string
          joined_at?: string
          project_id: string
          role?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          collaborator_id?: string
          id?: string
          joined_at?: string
          project_id?: string
          role?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_collaborations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      tutorials: {
        Row: {
          category: string
          content: Json
          created_at: string
          description: string | null
          difficulty: string | null
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          order_index: number | null
          tags: string[] | null
          title: string
          updated_at: string
          xp_reward: number | null
        }
        Insert: {
          category: string
          content: Json
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          xp_reward?: number | null
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          completed_at: string | null
          completed_steps: number[] | null
          created_at: string
          current_step: number | null
          id: string
          is_completed: boolean | null
          notes: string | null
          progress_data: Json | null
          started_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          completed_steps?: number[] | null
          created_at?: string
          current_step?: number | null
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          progress_data?: Json | null
          started_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          completed_steps?: number[] | null
          created_at?: string
          current_step?: number | null
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          progress_data?: Json | null
          started_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "project_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_courses: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string | null
          id: string
          progress_percentage: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string | null
          id?: string
          progress_percentage?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string | null
          id?: string
          progress_percentage?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lesson_progress: {
        Row: {
          completed_at: string | null
          id: string
          is_completed: boolean | null
          lesson_id: string
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          lesson_id: string
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          lesson_id?: string
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tutorial_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          progress_data: Json | null
          tutorial_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          progress_data?: Json | null
          tutorial_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          progress_data?: Json | null
          tutorial_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tutorial_progress_tutorial_id_fkey"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "tutorials"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_profile_stats: {
        Args: { profile_user_id: string }
        Returns: boolean
      }
      increment_project_views: {
        Args: {
          project_uuid: string
          user_agent_text?: string
          viewer_ip?: unknown
          viewer_uuid?: string
        }
        Returns: undefined
      }
      toggle_project_like: {
        Args: { project_uuid: string; user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
