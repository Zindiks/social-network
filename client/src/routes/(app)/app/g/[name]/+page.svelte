<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { JoinGroup, type GroupJson } from '$lib/client/api/group-requests';
	import Post from '$lib/components/Post.svelte';
	import PostForm from '$lib/components/forms/PostForm.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { currentUserStore } from '$lib/store/user-store';
	import type { UserType } from '$lib/types/user';
	import type { PageData } from './$types';
	import Createeventform from './createeventform.svelte';
	import Namelayout from '$lib/components/forms/namelayout.svelte';
	import Reactform from './reactform.svelte';

	import en from 'javascript-time-ago/locale/en';
	import TimeAgo from 'javascript-time-ago';

	export let data: PageData;

	TimeAgo.addLocale(en);
	const timeAgo = new TimeAgo('en-US');

	let id: string, name: string, description: string, image_path: string;
	const currentUser = $currentUserStore as UserType;

	const group = data.group;
	let errorMessage = '';
	let isMember = false;

	if (currentUser && 'id' in currentUser && group?.ok) {
		if (data.group?.ok && data.group.group.creator_id == currentUser.id) {
			isMember = true;
		}
		if (data.group?.ok)
			data.group.group.members?.forEach((user) => {
				if (user && user.id == currentUser.id) {
					isMember = true;
				}
			});
	}

	let groupInf: GroupJson;
	if (group?.ok) {
		const data = group.group;
		groupInf = group.group;
		id = data.id;
		name = data.name;
		description = data.description;
		if (data.image_path) {
			image_path = data.image_path[0];
		} else {
			image_path =
				'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
		}
	} else {
		name = '404 Not Found';
		description = '';
		image_path =
			'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
	}

	async function joinGroup() {
		if (group?.ok) {
			const result = await JoinGroup(group.group.name, fetch);
		}
	}

	let eventDialog: boolean;
	function handleEventSubmit() {
		invalidate((url) => url.pathname == `/api/v1/auth/group/${groupInf.id}/event/all`);
		eventDialog = false;
	}

	let reactionDialog: boolean;
	function handleReactionSubmit() {
		invalidate((url) => url.pathname == `/api/v1/auth/group/${groupInf.id}/event/all`);
		reactionDialog = false;
	}

	let inviteMember: boolean;
	function handleInviteUser() {
		invalidate((url) => url.pathname == `/api/v1/auth/group/${groupInf.id}/invited/all`);
		inviteMember = false;
	}

	console.log(data);
</script>

<svelte:head>
	<title>g/{name}</title>
</svelte:head>

<!-- user profile page -->

<main class="flex">
	<div class=" m-auto h-full w-full max-w-[1096px]">
		<!-- profile info header -->
		<div class="profile-info relative">
			<!-- banner img  -->
			<div class="m-auto h-32 sm:h-60 max-w-[1096px] p-0 sm:px-2">
				<img
					class="h-full w-full object-cover object-center sm:rounded-xl"
					src={image_path}
					alt="banner"
				/>
			</div>

			<div class="max-w-[1096px] sm:px-2 h-16">
				{#if data.allevents}
					{#each data.allevents as event, i (i)}
						<div
							class="w-full bg-neutral-200/30 dark:bg-neutral-800 p-1 mt-1 h-full flex justify-between items-center sm:rounded-xl"
						>
							<div>
								<p class="text-primary">{event.name}</p>
								<p class="">{event.description}</p>
							</div>

							<div>
								<p class="text-primary">Date</p>
								<p class="">
									{event.event_start_date === '' ? 'no idea' : event.event_start_date}
								</p>
							</div>

							<div>
								<p class="text-muted-foreground text-xs">created</p>
								<p class="text-primary">
									{timeAgo.format(new Date(event.created_at), 'mini')}
									<span class="text-muted-foreground text-xs">ago</span>
								</p>
							</div>

							<div>
								<p class="text-muted-foreground text-xs">host</p>

								<a href="/app/u/{event.user_information.username}" class="text-primary"
									>{event.user_information.username}</a
								>
							</div>

							{#if event.participants}
								<div class="flex flex-col items-center align-middle">
									<p class="text-muted-foreground text-xs">Participants:</p>
									<p class="text-primary">{event.participants.length}</p>
								</div>
							{:else}
								<p>Participants: 0</p>
							{/if}
							{#if event.is_participant}
								<p class="text-sm rounded-md px-5 p-1 m-0.5 border bg-primary">
									I am {event.event_status}
								</p>
							{:else if isMember}
								<Dialog.Root>
									<Dialog.Trigger class="text-sm rounded-md px-5 p-1 m-0.5 border bg-primary">
										React
										<Dialog.Content>
											<Reactform eventInfo={event} on:submit={handleReactionSubmit} />
										</Dialog.Content>
									</Dialog.Trigger>
								</Dialog.Root>
							{/if}
						</div>
					{/each}
				{/if}
				<div
					class="w-full bg-neutral-200/30 p-1 mt-1 h-full flex justify-between items-center sm:rounded-xl"
				>
					<div class="h-full align-middle flex-col self-start">
						<p
							class="md:text-xl text-lg text-ellipsis w-full bold text-left font-bold mr-2 text-primary"
						>
							{name}
						</p>
						<p class="lines3 text-sm text-left text-neutral-400">{description}</p>
					</div>
					<div class="flex flex-row">
						{#if isMember}
							<Dialog.Root bind:open={inviteMember}>
								<Dialog.Trigger class="text-sm rounded-md px-5 p-1 m-0.5 border bg-primary"
									>Invite user</Dialog.Trigger
								>

								<Dialog.Content>
									{#if data.group?.ok}
										{#if data.group.group.members}
											<Namelayout
												groupid={groupInf.id}
												invitedUsers={data.allInvitedUsers}
												userList={data.group.group.members}
												on:click={handleInviteUser}
											/>
										{/if}
									{:else}
										<p class="m-2">Group Info Not found, try reloading the page!</p>
									{/if}
								</Dialog.Content>
							</Dialog.Root>

							<input type="text" hidden name="target_id" value={id} />

							<Dialog.Root>
								<Dialog.Trigger class="text-sm rounded-md px-5 p-1 m-0.5 border bg-primary"
									>Create Post</Dialog.Trigger
								>

								<Dialog.Content>
									<!-- I tried to put 2 PROPS to this component  -->
									<!-- data : Took from previous Form, and i dont remember why it's required  -->
									<!-- groupId - this PROP i put intentionally because i think we need PARENT_ID for post in groups -->
									{#if data.group?.ok}
										<!-- <GroupPostForm data={data.form} groupId={data.group?.group.id} /> -->

										<PostForm data={data.form} community_id={data.group?.group.id} />
									{:else}
										<p class="m-2">Group Info Not found, try reloading the page!</p>
									{/if}
								</Dialog.Content>
							</Dialog.Root>

							<Dialog.Root bind:open={eventDialog}>
								<Dialog.Trigger class="text-sm rounded-md px-5 p-1 m-0.5 border bg-primary">
									Create event
									<Dialog.Content>
										<Createeventform
											data={data.form}
											currUser={currentUser}
											group={groupInf}
											on:submit={handleEventSubmit}
										/>
									</Dialog.Content>
								</Dialog.Trigger>
							</Dialog.Root>
						{:else}
							<form on:submit={joinGroup} method="post" class=" text-center">
								<p>
									{#if errorMessage}
										{errorMessage}
									{/if}
								</p>
								<input type="text" hidden name="target_id" value={id} />
								<button class="text-sm rounded-md px-5 border bg-sky-500 p-1 m-0.5" type="submit">
									Join group
								</button>
							</form>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- group activity / posts -->

		<div class="h-full w-full sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-0 sm:p-4 md:mt-80">
			{#if data.posts}
				{#each data.posts as post}
					<Post data={post} />
				{/each}
			{/if}

			<!-- <div class="bg-pink-500 h-56 w-full sm:rounded-lg">group</div>
			<div class="bg-purple-500 h-56 w-full sm:rounded-lg">group</div>
			<div class="bg-red-500 h-56 w-full sm:rounded-lg">123</div>
			<div class="bg-yellow-500 h-56 w-full sm:rounded-lg">123</div>
			<div class="bg-orange-500 h-56 w-full sm:rounded-lg">123</div> -->
		</div>
	</div>
</main>

<style>
	/* absolute */
</style>
