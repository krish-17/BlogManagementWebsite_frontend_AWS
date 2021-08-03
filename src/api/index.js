import axios from 'axios';

const url = 'https://utwxc7sctk.execute-api.us-east-1.amazonaws.com/blog/posts';

const headers = {
    headers : {
        Authorization: "Bearer eyJraWQiOiJSTEwrN2JaZkJSTkpjTUc4TVwvdlRcL1dmRVJidFpEbWxoSERTVDkxb2xBazA9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmZmFlMDNmOC1hODM4LTQ3MjItOTNmMy1mMGZhNTQ0OTQyOTUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGh0dHBzOlwvXC9ibG9nc2l0ZS5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbVwvYmxvZy5hbGwgZW1haWwiLCJhdXRoX3RpbWUiOjE2Mjc2MTI3MzQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1kyYjdJN3VxdSIsImV4cCI6MTYyNzYxNjMzNCwiaWF0IjoxNjI3NjEyNzM0LCJ2ZXJzaW9uIjoyLCJqdGkiOiJjYmRjMWViNy1iNzEwLTQ3NWUtYTExNC05YjhiNjY5MjExNmQiLCJjbGllbnRfaWQiOiIxdmxmdjVrbTB2MWszZzgzNDBybzF0Zmg1ZSIsInVzZXJuYW1lIjoic3Jpa3Jpc2huYW4ifQ.BjAsa2AZoJVctIcyAbj7mDRZ-P8OeMGvpfJDQ5ls7IR7WUipEwltsmWpKO17kw6_AU9-_D8h_b1mtyjQsT7natqUUR8yyBX58KddJxh1BxU1GXLpovNtehAYa3wcEj7VPnhy7kFCJaPjd_Ntd10bxbgm4Vif8dW9su5FHjNVkPdLESlhD1fTM0battNCMAKHwpwO4-w41lJUiUzw_SngIM_9Tc1SSTumEb9hOAm_5E8VMQe-kVPSSQf6y_EIiyJj544SEPST0OG-GgXm9AW1hJo1ltFV5unGiT2Q_IS6Csm1NUrqveJ156XZ35dtakmYerKcNng62VxTwogXT5rBdA"
    }
}
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.patch(url + "/create", newPost, headers);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`, headers);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost, headers);
export const deletePost = (id) => axios.delete(`${url}/${id}`, headers);
