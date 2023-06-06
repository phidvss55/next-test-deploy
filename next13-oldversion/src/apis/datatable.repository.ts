import { DataTable } from '@/types/table.type';
import { baseApi } from './baseApi';
import { APIDomain } from './baseURL';

let client = new baseApi(APIDomain);

export function getListLane() {
    return client.get('/lane');
}
export function getDataTableData(): Promise<DataTable[]> {
    return client.get('/datatable');
}
