DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('admin', 'user', 'evaluator', 'advisor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deliveries" (
	"id" text PRIMARY KEY NOT NULL,
	"stage_id" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forgot_password" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp DEFAULT CURRENT_TIMESTAMP + INTERVAL '6 minutes'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" text,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stages" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date_of_start" date NOT NULL,
	"date_of_end" date NOT NULL,
	"status" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"registration" numeric NOT NULL,
	"course" text NOT NULL,
	"period" numeric NOT NULL,
	"first_access" boolean DEFAULT true NOT NULL,
	"university" text NOT NULL,
	"country" text NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
