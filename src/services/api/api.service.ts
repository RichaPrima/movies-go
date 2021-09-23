import httpClient from "../httpClient";
import {AxiosResponse} from "axios";
import {MoviesResponse} from "../../types/apiTypes";
import { API_KEY } from "../../env/env";

export const getMovies = async (page: number = 1): Promise<AxiosResponse<MoviesResponse> | undefined> => {
    try {
        return await httpClient.get("/discover/movie", {
            params: {
                api_key: API_KEY,
                language: "en-US",
                sort_by: "popularity.desc",
                page: page,
            }
        });
    } catch (err) {
        console.error(err);
        return undefined
    }
}
