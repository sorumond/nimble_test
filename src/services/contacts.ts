import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const autorizationKey = 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/' }),
    tagTypes: ['Contacts', 'Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: 'contacts',
                headers: {
                    Authorization: autorizationKey,
                },
                params: {
                    sort: 'created:desc'
                }
            }),
            providesTags: ['Contacts'],
        }),
        getContact: builder.query({
            query: (id: string) => ({
                url: `contact/${id}`,
                headers: {
                    'Authorization': autorizationKey
                }
            }),
            providesTags: ['Contact'],
        }),
        addContact: builder.mutation({
            query: (body) => ({
                url: 'contact',
                method: 'POST',
                headers: {
                    'Authorization': autorizationKey
                },
                body
            }),
            invalidatesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: (id: string) => ({
                url: `contact/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': autorizationKey
                }
            }),
            invalidatesTags: ['Contacts'],
        }),
        putTagToContact: builder.mutation({
            query: (body) => ({
                url: `contacts/${body.contact_id}/tags`,
                method: 'PUT',
                headers: {
                    'Authorization': autorizationKey
                },
                body
            }),
            invalidatesTags: ['Contact', 'Contacts'],

        }),
    }),
})

export const { useGetContactsQuery, useGetContactQuery, useAddContactMutation, useDeleteContactMutation, usePutTagToContactMutation } = contactsApi