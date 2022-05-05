import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Author } from "../../database/entities/author.schema";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private readonly authorModel: Model<Author>) { }


    async createAuthor(entry: CreateAuthorDto): Promise<Author> {
        const newAuthor = await new this.authorModel(entry)
        return newAuthor.save()
    }
    async getAuthors(): Promise<Author[]> {
        const authors = await this.authorModel.find()
        return authors
    }
    async getSingleAuthor(id: string): Promise<Author> {
        const author = await this.authorModel.findById(id)
        return author
    }

    async updateAuthor(id: string, body: UpdateAuthorDto): Promise<Author> {
        const updatedAuthor = await this.authorModel.findByIdAndUpdate(id, body).setOptions({ returnDocument: "after" })
        console.log(updatedAuthor)
        return updatedAuthor
    }
    async deleteAuthor(id: string): Promise<Author[]> {
        await this.authorModel.findByIdAndDelete(id)
        return this.authorModel.find()
    }

    async findAuthorByName(name: string): Promise<Author[]> {
        const match = await this.authorModel.find({ name })
        console.log('match: ', match)
        if (match) {
            console.log('match inside condition: ', match)
            return match
        } else {
            throw new NotFoundException('User not found')
        }
    }
    async findAuthorBySurname(surname: string): Promise<Author[]> {
        console.log(surname)
        const match = await this.authorModel.find({ surname })

        if (match) {
            return match
        } else {
            throw new NotFoundException('User not found!')
        }
    }
}