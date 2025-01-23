export function paginate(page: number, limit: number) {
    return {
        skip: (page - 1) * limit,
        take: limit,
    };
}
