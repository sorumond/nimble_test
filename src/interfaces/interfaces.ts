export interface IGetContact {
    data: IContactsList
}

export interface IContactsList {
    users: Array<IContact>
}

export interface IContact {
    uuid: string,
    avatar_url: string,
    tags: Array<string>
    fields: IContactFields
}

export interface IContactFields {
    ["first name"]?: Array<{ [key: string]: string }>,
    ["last name"]?: Array<{ [key: string]: string }>,
    ["email"]?: Array<{ [key: string]: string }>
}

export interface IContactData {
    [key: string]: any,
    fields: IContactFields
}
