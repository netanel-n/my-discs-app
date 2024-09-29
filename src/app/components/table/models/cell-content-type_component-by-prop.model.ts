import { Type } from '@angular/core';
import { CellContentTypeBaseModel } from './cell-content-type-base.model';

export class CellContentType_ComponentByPropModel extends CellContentTypeBaseModel {
    override myName = 'CellContentType_ComponentByProp' as const;
    componentTypeRef: Type<any>;

    constructor(param: Partial<CellContentType_ComponentByPropModel>) {
        super();
        this.componentTypeRef = param.componentTypeRef!;
    }
}