export function getValue<DataType, PathType extends string, DefaultType>(data: DataType, path: PathType, defaultValue?: DefaultType) {
    const value = path
        .split(/[.[\]]/)
        .filter(Boolean)
        .reduce((value, key) => (value as any)?.[key], data as any);

    return value !== undefined ? value : (defaultValue as DefaultType);
}
