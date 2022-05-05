import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthorQueryDto } from "./dto/author-query.dto";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authorService.createAuthor(createAuthorDto)
    }
    // @Get()
    // getAllAuthors(@Query('surname') surname, @Query('name') name) {
    //     if (surname) {
    //         console.log('Query: ', { name: name, surname: surname })
    //         return this.authorService.findAuthorBySurname(surname)
    //     } else if (name) {
    //         return this.authorService.findAuthorByName(name)
    //     }
    //     else {
    //         return this.authorService.getAuthors()
    //     }


    // }

    //Not working as expected
    @Get()
    getAllAuthors(@Query() query: AuthorQueryDto) {
        console.log('query', query);
        if (query.surname && query.name) {
            console.log('get by name and surname');
            return [];
        } else if (query.surname) {
            // console.log('Query: ', { name: name, surname: surname })
            return this.authorService.findAuthorBySurname(query.surname)
        } else if (query.name) {
            return this.authorService.findAuthorByName(query.name)
        }
        else {
            return this.authorService.getAuthors()
        }


    }
    @Get(':id')
    getSingleAuthor(@Param('id') id: string) {
        return this.authorService.getSingleAuthor(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAuthor: UpdateAuthorDto) {
        return await this.authorService.updateAuthor(id, updateAuthor)
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.authorService.deleteAuthor(id)
    }

    @Get('/single/:name')
    getAuthorsByName(@Param('name') name: string) {
        return this.authorService.findAuthorByName(name)
    }



}