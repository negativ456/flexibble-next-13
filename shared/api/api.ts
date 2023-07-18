import { GraphQLClient } from "graphql-request";
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
  projectsQuery,
} from "@/shared/api/graphql";
import { UserProfile } from "@/entities/User";
import fetch from "cross-fetch";
import { Form } from "@/features/ProjectForm/model/types/form";
import { UploadApiResponse } from "cloudinary";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);
const makeGraphQLRequest = async <T>(query: string, variables = {}) => {
  try {
    return await client.request<T>(query, variables);
  } catch (e) {
    console.log(e);
  }
};
export const getUser = (email: string) => {
  client.setHeaders({ "x-api-url": apiKey });
  return makeGraphQLRequest<UserProfile>(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeaders({ "x-api-url": apiKey });
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (e) {
    throw e;
  }
};

export const uploadImage = async (
  imagePath: string
): Promise<UploadApiResponse> => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
};

export const createNewProject = async (
  form: Form,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeaders({ Authorization: `Bearer ${token}` });

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async <T>(
  category?: string,
  endcursor?: string
) => {
  client.setHeaders({ "x-api-url": apiKey });

  return makeGraphQLRequest<T>(projectsQuery, { category, endcursor });
};
