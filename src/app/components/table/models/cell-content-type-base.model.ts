/** This is `abstract` because, There might be a common logic. */
export abstract class CellContentTypeBaseModel {
    /** Hint: `as const` will not be needed in a next future. */
    abstract myName: 'CellContentType_Normal' | 'CellContentType_ComponentByProp';
}