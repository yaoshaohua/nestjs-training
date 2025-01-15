import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (existingCategory) {
      throw new Error(`${createCategoryDto.name} already exists`);
    }
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const { id, ...rest } = updateCategoryDto;
    const existingCategory = await this.categoryModel.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!existingCategory) throw new Error('Category not found');
    return this.categoryModel.findOneAndUpdate(
      { _id: id },
      { $set: rest },
      { new: true },
    );
  }
}
