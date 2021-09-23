import { MovieType } from "./types";

export type MoviesResponse = {
    page: number;
    results: MovieType[];
    total_pages: number;
    total_results: number;
};