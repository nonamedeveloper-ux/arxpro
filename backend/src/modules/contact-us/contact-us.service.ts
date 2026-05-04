import { Injectable } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { ContactUsRepository } from './contact-us.repository';
import { ResData } from '../../lib/resData';
import { ContactUsEntity } from './entities/contact-us.entity';

@Injectable()
export class ContactUsService {
  constructor(private readonly repository: ContactUsRepository) {}

  create(createContactUsDto: CreateContactUsDto) {
    return 'This action adds a new contactUs';
  }

  async findAll(): Promise<ResData<Array<ContactUsEntity>>> {
    const allData = await this.repository.findAll();
    return new ResData<Array<ContactUsEntity>>(
      'contact us all data',
      200,
      allData,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} contactUs`;
  }

  update(id: number, updateContactUsDto: UpdateContactUsDto) {
    return `This action updates a #${id} contactUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactUs`;
  }
}
