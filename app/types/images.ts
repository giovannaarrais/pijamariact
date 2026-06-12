export interface ImageProps {
    id: string;
    open: boolean;
    name: string;
    url: string;
    created_at: Date | string;
    type?: string;
}