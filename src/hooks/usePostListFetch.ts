import { useState } from "react"
import { Users, Posts, PostsResponse, PostsWithUser, UserResponse } from "../types/post"

type Props = {
    queryParams: URLSearchParams
}

export const usePostFetch = ({ queryParams }:Props) => {

    const [posts, setPosts] = useState<PostsWithUser>()
    const [total, setTotal] = useState(0)
    const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
    const [tags, setTags] = useState([])
    const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
    const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
    const [loading, setLoading] = useState(false)

    const fetchPosts = () => {
        setLoading(true)
        let postsData: PostsResponse
        let usersData: Users

        fetch(`/api/posts?limit=${limit}&skip=${skip}`)
            .then((response) => response.json())
            .then((data) => {
                postsData = data
                return fetch("/api/users?limit=0&select=username,image")
            })
            .then((response) => response.json())
            .then((users) => {
                usersData = users.users
                const postsWithUsers = postsData.posts.map((post) => ({
                    ...post,
                    author: usersData.find((user) => user.id === post.userId),
                }))
                setPosts({ posts: postsWithUsers })
                setTotal(postsData.total)
            })
            .catch((error) => {
                console.error("게시물 가져오기 오류:", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const searchPosts = async () => {
        if (!searchQuery) {
            fetchPosts()
            return
        }
        setLoading(true)
        try {
            const response = await fetch(`/api/posts/search?q=${searchQuery}`)
            const data = await response.json()
            setPosts(data.posts)
            setTotal(data.total)
        } catch (error) {
            console.error("게시물 검색 오류:", error)
        }
        setLoading(false)
    }

    // 태그별 게시물 가져오기
    const fetchPostsByTag = async (tag: string) => {
        if (!tag || tag === "all") {
            fetchPosts()
            return
        }
        setLoading(true)
        try {
            const [postsResponse, usersResponse] = await Promise.all([
                fetch(`/api/posts/tag/${tag}`),
                fetch("/api/users?limit=0&select=username,image"),
            ])
            const postsData:PostsResponse = await postsResponse.json()
            const usersData:Users = await usersResponse.json()

            const postsWithUsers = postsData.posts.map((post) => ({
                ...post,
                author: usersData.find((user) => user.id === post.userId),
            }))

            setPosts({ posts: postsWithUsers })
            setTotal(postsData.total)
        } catch (error) {
            console.error("태그별 게시물 가져오기 오류:", error)
        }
        setLoading(false)
    }

    const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

    return {
        posts,
        total,
        skip,
        limit,
        searchQuery,
        tags,
        loading,
        setPosts,
        setTotal,
        setSkip,
        setLimit,
        setSearchQuery,
        fetchPosts,
        searchPosts,
        fetchPostsByTag,
        fetchTags
    }

}