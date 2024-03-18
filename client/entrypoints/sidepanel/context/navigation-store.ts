import { create } from "zustand";

interface INavigationState {
    contentScript: string;
    currentUrl: string;
    loading: boolean;
    setData: (script: string, url: string) => void;
    links: INavigationResponse
}

export interface INavigationResponse {
    data: {
        navigation: {
            text: string,
            url: string
        }[],
        content: {
            text: string,
            url: string
        }[]
    }
}

const useNavigationStore = create<INavigationState>((set) => ({
    loading: true,
    contentScript: '',
    currentUrl: '',
    setData: (script, url) => set({
        contentScript: script,
        currentUrl: url
    }),
    links: { data: { navigation: [], content: [] } }
}))

export default useNavigationStore;