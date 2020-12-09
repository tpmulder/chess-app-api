export interface MapperConfig<T, TDto> {
    forward: (model: T) => TDto
    reverse: (model: Partial<TDto>) => Partial<T>
}

export default abstract class MapperConfigBase<T, TDto> implements MapperConfig<T, TDto> {
    abstract forward(model: T): TDto;
    abstract reverse(model: Partial<TDto>): Partial<T>
}