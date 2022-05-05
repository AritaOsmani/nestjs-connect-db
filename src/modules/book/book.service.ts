import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";
import { Book } from "../../database/entities/book.schema";
import { BookInterface } from "./interfaces/book.interface";


@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) { }

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find()
    }
    async findOne(id: string): Promise<Book> {
        return await this.bookModel.findOne({ _id: id })
    }

    async create(item: BookInterface): Promise<Book> {
        const newBook = new this.bookModel(item)
        return await newBook.save()
    }
    async delete(id: string): Promise<Book[]> {
        await this.bookModel.findByIdAndRemove(id)
        return this.bookModel.find()
    }
    async update(id: string, item: BookInterface): Promise<BookInterface> {
        const updated = await this.bookModel.findByIdAndUpdate(id, item)
        return updated
    }
    async getByHighestRatings() {
        // console.log('Hello')
        //Works for pages but not for ratings
        const books = await this.bookModel.where("pages").gt(300)
        console.log('Books: ', books)
        return books
    }
    async findByGenres(genre: string) {
        //   console.log('Hello')
        const booksFound = await this.bookModel.find({ genres: genre })
        if (booksFound) {
            return booksFound
        } else {
            throw new NotFoundException('Book not found!')
        }
    }
    async findByMultipleGenres(genres: string[]) {
        const booksFound = await this.bookModel.find({ genres: { $all: genres } })
        if (booksFound) {
            return booksFound
        } else {
            throw new NotFoundException('No such books')
        }
    }
    async findByRangeOfRatings(range: number[]) {
        console.log('Hello')
        const booksFound = await this.bookModel.find({ pages: { $in: range } })
        if (booksFound) {
            return booksFound
        } else {
            throw new NotFoundException('No such books')
        }
    }

}