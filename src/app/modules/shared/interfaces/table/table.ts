import { GetPagedBody } from "core/interfaces/get-paged/get-paged";


export interface TableOptions {
    inputUrl: URL;
    inputCols: ColumnsInterface[];
    inputActions?: ActionsInterface[];
    bodyOptions?: GetPagedBody<any> | any;
    responsiveDisplayedProperties: string[];
    permissions?: Permission;
    route?: string;
    app?: { appId: number; };
}

interface ColumnsInterface {
    field: string;
    header: string;
    placeholder?: string;
    filter?: boolean;
    filterMode: string;
    filterColumnName?: string;
    sort?: boolean;
    sortCol?: string;
    dataType?: string;
    dateFormat?: string;
}

interface ActionsInterface {
    name: string;
    icon: string;
    color: string;
    displayBasedOn?: string;
    permission?: string;
    isDelete?: boolean;
    isBlock?: boolean;
    isEdit?: boolean;
    isView?: boolean;
    route?: string;
    call?: (row?: any) => any;
}

interface URL {
    getAll: string;
    getAllMethod: API_Methods;
    delete?: string;
}

interface Permission {
    listOfPermissions: string[];
    componentName: string;
}

type API_Methods = 'GET' | 'POST'