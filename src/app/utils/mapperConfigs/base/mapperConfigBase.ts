interface MapperConfig<T, TDto> {
    forward: (model: T) => TDto
    reverse: (model: Partial<TDto>) => Partial<T>
}

abstract class MapperConfigBase<TSrc, TDest> implements MapperConfig<TSrc, TDest> {
    abstract forward(model: TSrc): TDest;
    abstract reverse(model: Partial<TDest>): Partial<TSrc>
}

export { MapperConfig, MapperConfigBase }