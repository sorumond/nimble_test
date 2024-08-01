// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/' }),
    tagTypes: ['Contacts', 'Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: 'contacts',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'
                }
            }),
            providesTags: ['Contacts'],
        }),
        getContact: builder.query({
            query: (id: string) => ({
                url: `contact/${id}`,
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'
                }
            }),
            providesTags: ['Contact'],
        }),
        addContacts: builder.mutation({
            query: (body) => ({
                url: 'contact',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'
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
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'
                }
            }),
            invalidatesTags: ['Contacts'],
        }),
        putTagToContact: builder.mutation({
            query: (body) => ({
                url: `contacts/${body.contact_id}/tags`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'
                },
                body
            }),
            invalidatesTags: ['Contact', 'Contacts'],

        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContactsQuery, useGetContactQuery, useAddContactsMutation, useDeleteContactMutation, usePutTagToContactMutation } = contactsApi