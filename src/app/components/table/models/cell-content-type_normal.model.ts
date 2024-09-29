import { CellContentTypeBaseModel } from './cell-content-type-base.model';

/** Will literally render cell content as `<span>{{row[item.key]}}</span>`. */
export class CellContentType_NormalModel extends CellContentTypeBaseModel {
    override myName = 'CellContentType_Normal' as const;
}