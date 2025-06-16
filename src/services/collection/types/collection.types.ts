export interface Collection {
    _id: string;
    title: string;
    name: string;
    subTitle: string;
    description: string;
    slug: string;
    images: string[];
}

export interface CollectionResponse {
    data: Collection[];
    statusCode: number;
    message: string;
}