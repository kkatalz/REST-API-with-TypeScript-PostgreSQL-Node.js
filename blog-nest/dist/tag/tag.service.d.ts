import { TagEntity } from '@/tag/tag.entity';
import { Repository } from 'typeorm';
export declare class TagService {
    private readonly tagRepository;
    constructor(tagRepository: Repository<TagEntity>);
    getAll(): Promise<TagEntity[]>;
}
