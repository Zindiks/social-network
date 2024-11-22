<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import { page } from '$app/stores';
	import type { UserType } from '$lib/types/user';
	import { InviteToGroup, type InviteJson } from '$lib/client/api/group-requests';
	import { createEventDispatcher } from 'svelte';

	let allUsers = $page.data.allusers as UserType[];
	export let invitedUsers: string[] = [];
	export let userList: UserType[];
	export let groupid: string;
	export let post_inv: boolean = false;

	interface MessageEventDetail {
		click: { detail: string };
	}
	const dispatch = createEventDispatcher<MessageEventDetail>();

	function inviteUser(user_id: string) {
		// console.log('user', user);
		if (!post_inv) {
			let invite: InviteJson = {
				group_id: groupid,
				target_id: user_id,
				message: 'has invited you to a group!'
			};
			const resp = InviteToGroup(invite);
			dispatch('click', { detail: 'Invited user to a group' });
		} else {
			invitedUsers?.push(user_id);
			allUsers = allUsers;
			dispatch('click', { detail: 'Invited user to a group' });
		}
	}

	function isInGroup(user: UserType) {
		return userList.some((groupUser) => groupUser.id === user.id);
	}

	function isInvited(userId: string) {
		if (invitedUsers) {
			return invitedUsers.some((user) => {
				if (user === userId) {
					return true;
				}
				return false;
			});
		}
		return false;
	}

	$: filteredUsers = allUsers.filter((user) => !isInGroup(user) && !isInvited(user.id!));
</script>

<Command.Root>
	<Command.Input placeholder="Search a user..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			{#each filteredUsers as s}
				<Command.Item
					><button class="w-full" on:click|preventDefault={() => inviteUser(s.id)}
						>{s.username}</button
					></Command.Item
				>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Root>
