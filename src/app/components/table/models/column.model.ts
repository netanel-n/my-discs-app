import { CellContentType_NormalModel } from './cell-content-type_normal.model';
import { CellContentType_ComponentByPropModel } from './cell-content-type_component-by-prop.model';

export class ColumnModel {
    /** Header name. */
    name: string;
    /** Object property name. */
    key: string;
    withCellDeferrableView: boolean;
    cellContentType: CellContentType_NormalModel | CellContentType_ComponentByPropModel;

    constructor(param: Partial<ColumnModel> = {}) {
        this.name = param.name || '';
        this.key = param.key || '';
        this.withCellDeferrableView = param.withCellDeferrableView ?? true;
        this.cellContentType = param.cellContentType || new CellContentType_NormalModel();
    }
}