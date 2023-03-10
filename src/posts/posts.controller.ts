import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindOneParams } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Res() res: Response) {
    try {
      let data = await this.postsService.findtwotable();

      return res.status(HttpStatus.OK).send({
        data: data,
        message: 'Post List',
        success: true,
      });
    } catch (error) {
      console.log('Error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message,
        data: null,
        suceess: false,
      });
    }
  }
  @Get('/data')
  async getPost(@Res() res: Response) {
    try {
      let data = await this.postsService.getPosts();

      return res.status(HttpStatus.OK).send({
        data: data,
        message: 'Post List',
        success: true,
      });
    } catch (error) {
      console.log('Error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message,
        data: null,
        suceess: false,
      });
    }
  }


  @Get(':id')
  async getPostById(@Param() { id }: FindOneParams, @Res() res: Response) {
    try {
      let data = await this.postsService.getPostById(Number(id));
      if (data) {
        res.status(HttpStatus.CREATED).send({
          success: true,
          message: 'Post Detial List ById',
          data: data,
        });
      } else {
        res.status(HttpStatus.BAD_GATEWAY).send({
          success: false,
          message: 'Post Not Found ',
          data: null,
        });
      }
    } catch (error) {
      // console.log('Error:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Post()
  async createPost(@Body() createpostdto: CreatePostDto, @Res() res: Response) {
    try {
      let checktitle = await this.postsService.checkpost(createpostdto.title);
      if (checktitle) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          data: null,
          success: false,
          message: 'title Already Exist ',
        });
      }
      let data = await this.postsService.createPost(createpostdto);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'Post Created',
        data: data,
      });
    } catch (error) {
      console.log('Error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Put(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto,
    @Res() res: Response,
  ) {
    try {
      let checkbyId = await this.postsService.getPostById(Number(id));
      if (checkbyId) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          success: false,
          message: 'Post Not Found',
          data: null,
        });
      }
      let data = await this.postsService.updatePost(Number(id), post);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'Updated Post SuccessFully',
        data: data,
      });
    } catch (error) {
      // console.log('Error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams, @Res() res: Response) {
    try {
      let checkbyId = await this.postsService.getPostById(Number(id));
      if (checkbyId) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          success: false,
          message: 'Post Not Found',
          data: null,
        });
      }
      let data = await this.postsService.deletePost(Number(id));
      return res
        .status(HttpStatus.OK)
        .send({ success: true, message: 'Post Deleted', data: data });
    } catch (error) {
      // console.log('Error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
}
