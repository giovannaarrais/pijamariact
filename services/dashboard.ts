'server-only'

import { desc, sql } from "drizzle-orm";

import { db } from "@/db";
import { categoriesTable, feedbacksTable, productsTable, usersTable } from "@/db/schema";

type DashboardCounts = {
    products: number;
    categories: number;
    feedbacks: number;
    users: number;
};

export async function getDashboardStats() {
    // Uma única query com subqueries para todos os counts (evita contenção no pool de conexões)
    const [countsResult, recentFeedbacks] = await Promise.all([
        db.execute<DashboardCounts>(sql`
            SELECT
                (SELECT COUNT(*)::int FROM ${productsTable})     AS products,
                (SELECT COUNT(*)::int FROM ${categoriesTable})   AS categories,
                (SELECT COUNT(*)::int FROM ${feedbacksTable})    AS feedbacks,
                (SELECT COUNT(*)::int FROM ${usersTable})        AS users
        `),
        db.select().from(feedbacksTable).orderBy(desc(feedbacksTable.createdAt)).limit(5),
    ]);

    const counts = countsResult[0];

    return {
        products: counts.products,
        categories: counts.categories,
        feedbacks: counts.feedbacks,
        users: counts.users,
        recentFeedbacks,
    };
}

