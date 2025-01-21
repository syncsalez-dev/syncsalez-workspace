import { validate } from 'class-validator';

export async function validateDto(dto: any) {
    const errors = await validate(dto);
    if (errors.length) {
        throw new Error('Validation failed');
    }
}
