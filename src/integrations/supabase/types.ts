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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string | null
          category: string | null
          cover_image: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_published: boolean | null
          language: string | null
          pdf_url: string | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          language?: string | null
          pdf_url?: string | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          language?: string | null
          pdf_url?: string | null
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      emagazines: {
        Row: {
          cover_image: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_published: boolean | null
          issue_date: string | null
          pdf_url: string
          title: string
          updated_at: string
          volume: string | null
          year: number
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          issue_date?: string | null
          pdf_url: string
          title: string
          updated_at?: string
          volume?: string | null
          year: number
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          issue_date?: string | null
          pdf_url?: string
          title?: string
          updated_at?: string
          volume?: string | null
          year?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          category_division: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string
          is_published: boolean | null
          title: string
        }
        Insert: {
          category?: string | null
          category_division?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_published?: boolean | null
          title: string
        }
        Update: {
          category?: string | null
          category_division?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_published?: boolean | null
          title?: string
        }
        Relationships: []
      }
      guruvani: {
        Row: {
          audio_url: string | null
          category: string | null
          content: string | null
          created_at: string
          created_by: string | null
          date: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          is_restricted: boolean | null
          source: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_restricted?: boolean | null
          source?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_restricted?: boolean | null
          source?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      live_telecasts: {
        Row: {
          created_at: string
          description: string | null
          event_date: string | null
          id: string
          is_live: boolean | null
          is_published: boolean | null
          source_type: string
          stream_url: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date?: string | null
          id?: string
          is_live?: boolean | null
          is_published?: boolean | null
          source_type?: string
          stream_url?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string | null
          id?: string
          is_live?: boolean | null
          is_published?: boolean | null
          source_type?: string
          stream_url?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lms_announcements: {
        Row: {
          batch_id: string | null
          content: string | null
          course_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_pinned: boolean | null
          title: string
        }
        Insert: {
          batch_id?: string | null
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_pinned?: boolean | null
          title: string
        }
        Update: {
          batch_id?: string | null
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_pinned?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_announcements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "lms_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_announcements_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_assignment_submissions: {
        Row: {
          assignment_id: string
          feedback: string | null
          file_url: string | null
          graded_at: string | null
          graded_by: string | null
          id: string
          score: number | null
          status: string | null
          submission_text: string | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          assignment_id: string
          feedback?: string | null
          file_url?: string | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          score?: number | null
          status?: string | null
          submission_text?: string | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          assignment_id?: string
          feedback?: string | null
          file_url?: string | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          score?: number | null
          status?: string | null
          submission_text?: string | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "lms_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_assignments: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          instructions: string | null
          is_published: boolean | null
          lecture_id: string | null
          max_score: number | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          instructions?: string | null
          is_published?: boolean | null
          lecture_id?: string | null
          max_score?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          instructions?: string | null
          is_published?: boolean | null
          lecture_id?: string | null
          max_score?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_assignments_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lms_lectures"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_attendance: {
        Row: {
          attended_at: string
          id: string
          lecture_id: string
          marked_by: string | null
          notes: string | null
          user_id: string
        }
        Insert: {
          attended_at?: string
          id?: string
          lecture_id: string
          marked_by?: string | null
          notes?: string | null
          user_id: string
        }
        Update: {
          attended_at?: string
          id?: string
          lecture_id?: string
          marked_by?: string | null
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_attendance_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lms_lectures"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_batch_enrollments: {
        Row: {
          batch_id: string
          enrolled_at: string | null
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          batch_id: string
          enrolled_at?: string | null
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          batch_id?: string
          enrolled_at?: string | null
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_batch_enrollments_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "lms_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_batches: {
        Row: {
          course_id: string | null
          created_at: string
          end_date: string | null
          id: string
          max_students: number | null
          name: string
          program_id: string | null
          start_date: string
          status: string | null
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          max_students?: number | null
          name: string
          program_id?: string | null
          start_date: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          max_students?: number | null
          name?: string
          program_id?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_batches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_batches_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "lms_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_certificates: {
        Row: {
          certificate_number: string
          certificate_url: string | null
          course_id: string | null
          id: string
          issued_at: string | null
          program_id: string | null
          user_id: string
          valid_until: string | null
        }
        Insert: {
          certificate_number: string
          certificate_url?: string | null
          course_id?: string | null
          id?: string
          issued_at?: string | null
          program_id?: string | null
          user_id: string
          valid_until?: string | null
        }
        Update: {
          certificate_number?: string
          certificate_url?: string | null
          course_id?: string | null
          id?: string
          issued_at?: string | null
          program_id?: string | null
          user_id?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lms_certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_certificates_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "lms_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_courses: {
        Row: {
          course_mode: string
          created_at: string
          created_by: string | null
          description: string | null
          duration: string | null
          id: string
          instructor_id: string | null
          instructor_name: string | null
          is_paid: boolean | null
          is_published: boolean | null
          is_restricted: boolean | null
          language: string | null
          level: string
          price: number | null
          subject: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_mode?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_paid?: boolean | null
          is_published?: boolean | null
          is_restricted?: boolean | null
          language?: string | null
          level?: string
          price?: number | null
          subject?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_mode?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_paid?: boolean | null
          is_published?: boolean | null
          is_restricted?: boolean | null
          language?: string | null
          level?: string
          price?: number | null
          subject?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lms_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_lecture_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          lecture_id: string
          status: string | null
          updated_at: string
          user_id: string
          watched_seconds: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lecture_id: string
          status?: string | null
          updated_at?: string
          user_id: string
          watched_seconds?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lecture_id?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          watched_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lms_lecture_progress_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lms_lectures"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_lectures: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          lecture_type: string
          notes: string | null
          order_index: number | null
          references_text: string | null
          scheduled_date: string | null
          speaker: string | null
          stream_url: string | null
          title: string
          updated_at: string
          venue: string | null
          video_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          lecture_type?: string
          notes?: string | null
          order_index?: number | null
          references_text?: string | null
          scheduled_date?: string | null
          speaker?: string | null
          stream_url?: string | null
          title: string
          updated_at?: string
          venue?: string | null
          video_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          lecture_type?: string
          notes?: string | null
          order_index?: number | null
          references_text?: string | null
          scheduled_date?: string | null
          speaker?: string | null
          stream_url?: string | null
          title?: string
          updated_at?: string
          venue?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lms_lectures_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_materials: {
        Row: {
          course_id: string | null
          created_at: string
          file_type: string | null
          file_url: string
          id: string
          lecture_id: string | null
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          file_type?: string | null
          file_url: string
          id?: string
          lecture_id?: string | null
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          file_type?: string | null
          file_url?: string
          id?: string
          lecture_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_materials_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lms_lectures"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lms_program_courses: {
        Row: {
          course_id: string
          id: string
          order_index: number | null
          program_id: string
        }
        Insert: {
          course_id: string
          id?: string
          order_index?: number | null
          program_id: string
        }
        Update: {
          course_id?: string
          id?: string
          order_index?: number | null
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_program_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_program_courses_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "lms_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_programs: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration: string | null
          id: string
          is_paid: boolean | null
          is_published: boolean | null
          level: string | null
          price: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_paid?: boolean | null
          is_published?: boolean | null
          level?: string | null
          price?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_paid?: boolean | null
          is_published?: boolean | null
          level?: string | null
          price?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lms_quiz_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          passed: boolean | null
          quiz_id: string
          score: number | null
          started_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          passed?: boolean | null
          quiz_id: string
          score?: number | null
          started_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          passed?: boolean | null
          quiz_id?: string
          score?: number | null
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "lms_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_quiz_questions: {
        Row: {
          correct_answer: string | null
          id: string
          options: Json | null
          order_index: number | null
          points: number | null
          question_text: string
          question_type: string | null
          quiz_id: string
        }
        Insert: {
          correct_answer?: string | null
          id?: string
          options?: Json | null
          order_index?: number | null
          points?: number | null
          question_text: string
          question_type?: string | null
          quiz_id: string
        }
        Update: {
          correct_answer?: string | null
          id?: string
          options?: Json | null
          order_index?: number | null
          points?: number | null
          question_text?: string
          question_type?: string | null
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "lms_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      lms_quizzes: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          lecture_id: string | null
          max_attempts: number | null
          passing_score: number | null
          time_limit_minutes: number | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          lecture_id?: string | null
          max_attempts?: number | null
          passing_score?: number | null
          time_limit_minutes?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          lecture_id?: string | null
          max_attempts?: number | null
          passing_score?: number | null
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lms_quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "lms_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lms_quizzes_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lms_lectures"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      social_media_settings: {
        Row: {
          created_at: string
          display_order: number | null
          icon_name: string | null
          id: string
          is_enabled: boolean | null
          platform: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_enabled?: boolean | null
          platform: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_enabled?: boolean | null
          platform?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_feedback: {
        Row: {
          created_at: string
          email: string | null
          feedback_type: string | null
          id: string
          is_read: boolean | null
          message: string
          name: string | null
          phone: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          feedback_type?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          name?: string | null
          phone?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          feedback_type?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string | null
          phone?: string | null
          rating?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "superadmin"
        | "admin"
        | "librarian"
        | "scholar"
        | "user"
        | "lms"
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
    Enums: {
      app_role: ["superadmin", "admin", "librarian", "scholar", "user", "lms"],
    },
  },
} as const
