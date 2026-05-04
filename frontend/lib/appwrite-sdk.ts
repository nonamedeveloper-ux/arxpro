import { Client, Users } from 'node-appwrite'

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
const apiKey = process.env.APPWRITE_API_KEY

const client = new Client()

if (endpoint && projectId && apiKey) {
  client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey)
}

export const users = new Users(client)