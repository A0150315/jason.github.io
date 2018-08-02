interface Data {
    data: data;
    [propname: string]: any;
}
interface data {
    [propname: string]: any;
}
declare function defineReactive(data: object, key: (number | string), val: any): void;
declare const test: Data;
declare const OtherData: Data;
