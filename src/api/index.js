import axios from 'axios';

const url = 'https://utwxc7sctk.execute-api.us-east-1.amazonaws.com/blog/posts';

const headers = {
    headers : {
        Authorization: "Bearer " + localStorage.getItem("access_token");
    }
}
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.patch(url + "/create", newPost, headers);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`, headers);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost, headers);
export const deletePost = (id) => axios.delete(`${url}/${id}`, headers);
