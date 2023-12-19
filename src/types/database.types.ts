export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      generations: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          generation: number | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          generation?: number | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          generation?: number | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      places: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: number
          place: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          place?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          place?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      posses: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: number
          posse: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          posse?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          posse?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      statuses: {
        Row: {
          comment: string
          created_at: string | null
          date: string
          deleted_at: string | null
          id: number
          is_entered: boolean
          place_id: number
          scheduled_time_to_leave: string
          updated_at: string | null
          user_id: number
          working_status_id: number
        }
        Insert: {
          comment: string
          created_at?: string | null
          date: string
          deleted_at?: string | null
          id?: number
          is_entered?: boolean
          place_id: number
          scheduled_time_to_leave: string
          updated_at?: string | null
          user_id: number
          working_status_id: number
        }
        Update: {
          comment?: string
          created_at?: string | null
          date?: string
          deleted_at?: string | null
          id?: number
          is_entered?: boolean
          place_id?: number
          scheduled_time_to_leave?: string
          updated_at?: string | null
          user_id?: number
          working_status_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'statuses_place_id_fkey'
            columns: ['place_id']
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'statuses_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'statuses_working_status_id_fkey'
            columns: ['working_status_id']
            referencedRelation: 'working_statuses'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          auth_id: string
          created_at: string | null
          deleted_at: string | null
          generation_id: number | null
          icon_path: string | null
          id: number
          name: string | null
          posse_id: number | null
          updated_at: string | null
        }
        Insert: {
          auth_id: string
          created_at?: string | null
          deleted_at?: string | null
          generation_id?: number | null
          icon_path?: string | null
          id?: number
          name?: string | null
          posse_id?: number | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          created_at?: string | null
          deleted_at?: string | null
          generation_id?: number | null
          icon_path?: string | null
          id?: number
          name?: string | null
          posse_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_auth_id_fkey'
            columns: ['auth_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'users_generation_id_fkey'
            columns: ['generation_id']
            referencedRelation: 'generations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'users_posse_id_fkey'
            columns: ['posse_id']
            referencedRelation: 'posses'
            referencedColumns: ['id']
          },
        ]
      }
      working_statuses: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
