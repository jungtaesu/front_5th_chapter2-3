export type Posts = {
    posts: Array<{
        id: number
        title: string
        body: string
        tags: string[]
        reactions: {
            likes: number
            dislikes: number
        },
        views: number
        userId: number
        author?: {
            id: number;
            username: string;
            image: string;
        };
    }>
}

export type PostsWithUser = {
    posts: Array<{
        id: number
        title: string
        body: string
        tags: string[]
        reactions: {
            likes: number
            dislikes: number
        },
        views: number
        userId: number
        author?: {
            id: number;
            username: string;
            image: string;
        };
    }>
}

export type PostsResponse = {
    total: number
    skip: number
    limit: number
    posts: Array<{
        id: number
        title: string
        body: string
        tags: string[]
        reactions: {
            likes: number
            dislikes: number
        },
        views: number
        userId: number
        author?: {
            id: number;
            username: string;
            image: string;
        };
    }>
}

export type Users = Array<{
        id: number
        username: string
        image: string
}>

export type UserResponse = {
    total: number
    skip: number
    limit: number
    users: Array<{
        id: number
        username: string
        image: string
    }>
}