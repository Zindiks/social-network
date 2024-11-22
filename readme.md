# Social Network Project 1



## Getting Started

### Prerequisites

<ul><li>Docker should be installed on your system. <a href="https://www.docker.com/get-started/" target="_new">Get Docker</a></li><li>Go should be installed on your system. <a href="https://go.dev/doc/install" target="_new">Install Go</a></li></ul>
Clone the Repository

```bash
git clone https://01.kood.tech/git/hmahar/social-network.git
cd social-network
```


Build Docker Images
Setting Up the Project

```bash
docker compose up --build
```



## Overview

This project is a Facebook-like social network application designed to support several essential features such as Followers, Profile, Posts, Groups, Notifications, and Chats. It is built using modern web technologies with a separation of concerns between the frontend and backend. The project is containerized using Docker for ease of deployment and scalability.

## Features

<strong>Followers</strong>
Follow/unfollow users
Send follow requests and accept/decline them

<strong>Profile</strong>
View user information, activity, and posts
Public and private profile settings
Followers and following lists

<strong>Posts</strong>
Create and comment on posts
Include images or GIFs
Privacy settings: public, private, and almost private

<strong>Groups</strong>
Create and manage groups
Invite users and accept/decline group requests
Create posts and comments within groups
Create and manage events in groups

<strong>Notifications</strong>
Notifications for follow requests, group invitations, and group events
Differentiate between new notifications and private messages

<strong>Chats</strong>
Private messaging with followers
Real-time messaging with WebSockets
Emoji support

## Frontend
##### SvelteKit
## Backend

###### Technologies

Golang
Gorilla WebSockets
SQLite
AWS S3 for data storage

## Docker

Containers
- Backend Container API
- Frontend Container CLIENT



## Authors
<div align="center">
  <table>
    <tr>
      <td align="center"><a href="https://01.kood.tech/git/azindiks"><img src="https://01.kood.tech/git/avatars/3dc29a90b6669d5d43b4c1cb57f84ef6?size=870" alt="azindiks" width="100"></a></td>
       <td align="center"><a href="https://01.kood.tech/git/hmahar"><img src="https://01.kood.tech/git/avatars/1a0705a2bf733df12b22a69273e2c7b3?size=870" alt="hmahar" width="100"></a></td>
        <td align="center"><a href="https://01.kood.tech/git/mannuk"><img src="https://01.kood.tech/git/avatars/f50eeebae41eb91033ae0956790adf29?size=870" alt="mannuk" width="100"></a></td>
         <td align="center"><a href="https://01.kood.tech/git/mkuzmina"><img src="https://01.kood.tech/git/avatars/e93fda0671647220cf65070aa5afc03a?size=870" alt="mkuzmina" width="100"></a></td>
          <td align="center"><a href="https://01.kood.tech/git/nekitkas"><img src="https://01.kood.tech/git/avatars/912995c935e2a5b0b26f10c00eaa9e36?size=870" alt="nekitkas" width="100"></a></td>
    </tr>
    <tr>
      <td align="center">azindiks</td>
      <td align="center">hmahar</td>
       <td align="center">mannuk</td>
       <td align="center">mkuzmina</td>
       <td align="center">nekitkas</td>
    </tr>
  </table>
</div>