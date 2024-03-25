
export default interface INavigationResponse {
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