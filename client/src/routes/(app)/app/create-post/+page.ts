// import type { PageServerLoad, Actions, } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { postSchema } from "../../../../lib/types/post-schema"
import { zod } from 'sveltekit-superforms/adapters';
import type { PageLoad } from '../$types';
import { GetAllUsers } from '$lib/client/api/user-requests';
import type { UserType } from '$lib/types/user';


export const ssr = false

export const load: PageLoad = async ({ fetch }) => {
    let allusers: UserType[] = []
    const AllUsersResp = await GetAllUsers(fetch)
    if (AllUsersResp.ok) {
        allusers = AllUsersResp.allUsers
    }
    const form = await superValidate(zod(postSchema));
    return { form, allusers };
};



