'server-only'

import { getFeedbackById, getFeedbacks } from "@/services/feedbacks";

export async function listFeedbacks() {
    try {
        const feedbacks = await getFeedbacks();
        if(!feedbacks || feedbacks.length === 0) return null;
        return feedbacks;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function findFeedbackById(id: string) {
    try {
        return await getFeedbackById(id);
    } catch (error) {
        console.error(error);
        return null;
    }
}
