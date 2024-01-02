import axios from "axios";

export const createWorkspace = async (accessToken, workspace) => {
    try {
        const res = await axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'workspaces/create/',
            headers: { Authorization: `Bearer ${accessToken}` },
            data: workspace,
        })
        return {data: res.data, status: res.status, error: null};
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteWorkspace = async (accessToken, workspaceId) => {
    if (!workspaceId) {
        return;
    }
    await axios({
        method: 'DELETE',
        url: process.env.NEXT_PUBLIC_BACKEND_URL + 'workspaces/'+workspaceId+'/delete/',
        headers: { Authorization: `Bearer ${accessToken}` },
    });
}

export const getWorkspaces = async (accessToken) => {
    try {
        const res = await axios({
            method: 'GET',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'workspaces/',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {data: res.data, status: res.status, error: null};
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserSubscriptionStatus = async (accessToken) => {
    try {
        const res = await axios({
            method: 'GET',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'subscriptions/',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.status === 200) {
            return {data: res.data, status: res.status, error: null};
        } else {
            return {data: null, status: res.status, error: null};
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}