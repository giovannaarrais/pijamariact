'server-only'

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { feedbacksTable } from "@/db/schema";

import type { NewFeedback } from "@/app/types/catalog";

type FeedbackPayload = Omit<NewFeedback, "id" | "createdAt" | "updatedAt">;

export async function getFeedbacks() {
    return db.select().from(feedbacksTable).orderBy(desc(feedbacksTable.createdAt));
}

export async function getFeedbackById(id: string) {
    const [feedback] = await db.select().from(feedbacksTable).where(eq(feedbacksTable.id, id)).limit(1);
    return feedback ?? null;
}

export async function createFeedback(data: FeedbackPayload) {
    const [feedback] = await db
        .insert(feedbacksTable)
        .values({
            name: data.name,
            message: data.message,
            rating: data.rating,
            active: data.active,
        })
        .returning();

    return feedback;
}

export async function updateFeedback(id: string, data: FeedbackPayload) {
    const [feedback] = await db
        .update(feedbacksTable)
        .set({
            name: data.name,
            message: data.message,
            rating: data.rating,
            active: data.active,
            updatedAt: new Date(),
        })
        .where(eq(feedbacksTable.id, id))
        .returning();

    return feedback ?? null;
}

export async function deleteFeedback(id: string) {
    const [feedback] = await db.delete(feedbacksTable).where(eq(feedbacksTable.id, id)).returning();
    return feedback ?? null;
}
