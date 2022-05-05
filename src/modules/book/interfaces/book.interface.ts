export interface BookInterface {
    _id?: string
    title: String,
    author: String,
    pages: number,
    genres: String[],
    reviews: Review[]
}

export interface Review {
    name: String,
    body: String
}