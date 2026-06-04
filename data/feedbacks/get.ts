'server-only'

import { getFeedbackById, getFeedbacks } from "@/services/feedbacks";

export async function listFeedbacks() {
    try {
        return await getFeedbacks();
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
