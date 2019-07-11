/**
 * Um item de dado que pode ser usado para compor um combobox ou radio
 */
export interface IDataItem {
    id: string;
    display: string;
    icon?: string;
    dataEnum?: any;
}
