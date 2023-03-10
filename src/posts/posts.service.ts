import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostNotFoundException } from './postNotFound.exception';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UpdatePostDto } from './dto/update-post.dto';
let PrismaError = '404';
@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(Post: CreatePostDto) {
    return this.prismaService.post.create({
      data: Post,
    });
  }

  async getPosts() {
    return this.prismaService.post.findMany();
  }
  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }
  async updatePost(id: number, post: UpdatePostDto) {
    try {
      return await this.prismaService.post.update({
        data: {
          ...post,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }
  // async findtwotable() {
  //   try {
  //     return await this.prismaService.address.findMany({
  //       include: { user: true },
  //     });
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // }

  async findtwotable() {
    try {
      return await this.prismaService.user.findMany({
        include: { address: true },
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async deletePost(id: number) {
    try {
      return this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }

  async checkpost(title: string) {
    const post = await this.prismaService.post.findFirst({
      where: {
        title,
      },
    });
    return post;
  }
  // ...
}
