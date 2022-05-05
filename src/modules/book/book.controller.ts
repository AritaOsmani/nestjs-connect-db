import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Book } from "../../database/entities/book.schema";
import { BookService } from "./book.service";
import { BookGenresDto } from "./dto/books-genres.dto";
import { BooksRatingsDto } from "./dto/books-ratings-range.dto";
import { CreateBookDto } from "./dto/createBook.dto";
import { BookInterface } from "./interfaces/book.interface";

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get()
    async findAll(): Promise<Book[]> {
        return this.bookService.findAll()
    }
    @Get('/book/:id')
    findOne(@Param('id') id: string): Promise<Book> {
        return this.bookService.findOne(id)
    }
    @Post()
    create(@Body() createBook: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBook)
    }
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Book[]> {
        return this.bookService.delete(id)
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBook: CreateBookDto): Promise<BookInterface> {
        return this.bookService.update(id, updateBook)
    }
    @Get('/ratings')
    getHighestRatings() {
        return this.bookService.getByHighestRatings()
    }
    @Get('/genres/:genre')
    getBooksByGenres(@Param('genre') genre: string) {
        return this.bookService.findByGenres(genre)
    }
    @Post('/genres')
    getBooksByMultipleGenres(@Body() fields: BookGenresDto) {
        return this.bookService.findByMultipleGenres(fields.fieldsToSearchFor)
    }
    @Post('/ratings')
    getBooksByRangeOfRatings(@Body() ratingsRange: BooksRatingsDto) {
        return this.bookService.findByRangeOfRatings(ratingsRange.range)
    }

}