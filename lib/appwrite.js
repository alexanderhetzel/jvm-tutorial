import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage
} from "react-native-appwrite";
import {router} from "expo-router";

export const appwriteConfig = {
    endpoint: "https://db.hetzelcloud.com/v1",
    platform: "com.jsm.aora",
    projectId: "6702a622000a256937b4",
    storageId: "67027682002d5b08f44d",
    databaseId: "670272c8001fb5a105d8",
    userCollectionId: "670272ef00381051af03",
    videoCollectionId: "67027307001087c6202f",
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
    try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        }
    );

    return newUser;
    } catch (error) {
    throw new Error(error);
    }
}

// Sign In
export async function signIn(email, password) {
    try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
    } catch (error) {
    throw new Error(error);
    }
}

// Get Account
export async function getAccount() {
    try {
    const currentAccount = await account.get();

    return currentAccount;
    } catch (error) {
    throw new Error(error);
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
    } catch (error) {
    console.log(error);
    return null;
    }
}

export async function signOut() {
    try {
    const session = await account.deleteSession("current");

    return session;
    } catch (error) {
    throw new Error(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUsersPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]

        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if (type ==='video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if(type === 'image') {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type!')
        }

        if(!fileUrl) throw Error;

        return fileUrl;
    } catch(error) {
        throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    if (!file) return;

    const {mimetype, ...rest} = file;
    const asset = {type: mimetype, ...rest};

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            } )

        return newPost;

    } catch (error) {
        throw new Error(error);
    }
}
