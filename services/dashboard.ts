'server-only'

import { count, desc } from "drizzle-orm";

import { db } from "@/db";
import { categoriesTable, feedbacksTable, galleryImagesTable, productsTable, usersTable } from "@/db/schema";

export async function getDashboardStats() {
    const [[products], [categories], [galleryImages], [feedbacks], [users], recentFeedbacks] = await Promise.all([
        db.select({ total: count() }).from(productsTable),
        db.select({ total: count() }).from(categoriesTable),
        db.select({ total: count() }).from(galleryImagesTable),
        db.select({ total: count() }).from(feedbacksTable),
        db.select({ total: count() }).from(usersTable),
        db.select().from(feedbacksTable).orderBy(desc(feedbacksTable.createdAt)).limit(5),
    ]);

    return {
        products: products.total,
        categories: categories.total,
        galleryImages: galleryImages.total,
        feedbacks: feedbacks.total,
        users: users.total,
        recentFeedbacks,
    };
}
