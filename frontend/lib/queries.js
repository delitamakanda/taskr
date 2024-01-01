import axios from "axios";

export const createWorkspace = async (session, workspace) => {
    try {
        const res = await axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'workspaces/create/',
            headers: { Authorization: `Bearer ${session?.access_token}` },
            body: JSON.stringify(workspace),
        })
        return {data: res.data, status: res.status, error: null};
    } catch (err) {
        console.log(err);
        return {data: null, status: null, error: err};
    }
}

export const deleteWorkspace = async (session, workspaceId) => {
    if (!workspaceId) {
        return;
    }
    await axios({
        method: 'DELETE',
        url: process.env.NEXT_PUBLIC_BACKEND_URL + 'workspaces/'+workspaceId+'/delete/',
        headers: { Authorization: `Bearer ${session?.access_token}` },
    });
}

export const getWorkspaces = async (session) => {
    try {
        const res = await axios({
            method: 'GET',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'workspaces/',
            headers: { Authorization: `Bearer ${session?.access_token}` },
        });
        return {data: res.data, status: res.status, error: null};
    } catch (error) {
        console.log(error);
        return {data: null, status: null, error: error};
    }
}

export const getUserSubscriptionStatus = async (session) => {
    try {
        const res = await axios({
            method: 'GET',
            url: process.env.NEXT_PUBLIC_BACKEND_URL + 'subscriptions/',
            headers: { Authorization: `Bearer ${session?.access_token}` },
        });
        if (res.status === 200) {
            return {data: res.data, status: res.status, error: null};
        } else {
            return {data: null, status: res.status, error: null};
        }
    } catch (error) {
        console.log(error);
        return {data: null, status: null, error: error};
    }
}