export class CreateBookDto {
    title: String
    author: String
    pages: number
    genres: String[]
    reviews: { name: String, body: String }[]
}