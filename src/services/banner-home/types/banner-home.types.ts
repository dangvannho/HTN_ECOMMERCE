export interface BannerHome {
    _id: string;
    title: string;
    description: string;
    images: string;
    position: number;
    isActive: boolean;
}

export interface BannerHomeResponse {
    data: BannerHome[];
    statusCode: number;
    message: string;
}