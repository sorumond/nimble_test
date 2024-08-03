export interface IGetContact {
    data: IContactsList
}

export interface IContactsList {
    resources: Array<IContact>
}

export interface IContact {
    id: string,
    avatar_url: string,
    tags: Array<{
        id: string,
        tag: string
    }>,
    tags2: Array<string>,
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
