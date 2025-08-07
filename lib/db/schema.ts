import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

export const waitlistSubmissions = pgTable('waitlist_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  hardestPart: text('hardest_part'),
  fromCountry: text('from_country'),
  studyCountry: text('study_country'),
  university: text('university'),
  otherReason: text('other_reason'),
  timestamp: timestamp('created_at').defaultNow().notNull()
}); 