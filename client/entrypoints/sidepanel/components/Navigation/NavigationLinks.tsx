import { useState } from "react";
import NavigationSearch from "./NavigationSearch";
import NavigationLink from "./NavigationLink";
import INavigationResponse from "@/interfaces/navigation-resopnse.interface";
import useNavigationStore from "../../context/navigation-store";
import NavigationLinkWithDescription from "./NavigationLinkWithDescription";

const NavigationLinks: React.FC<{ links: INavigationResponse }> = ({ links }) => {
    const [filteredLinksData, setFilteredLinksData] = useState(links?.data.navigation);
    const { top10Data, contentUrl } = useNavigationStore();

    const searchEvent = (event: any) => {
        const value = event.target.value
        if (!value) {
            setFilteredLinksData(links.data.navigation);
        }
        setFilteredLinksData(links.data.navigation.filter((row) => row.text.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <div className="p-3">
            {top10Data[contentUrl] && <h1 className='mb-2'>The Top Navigation Links: </h1>}
            {top10Data[contentUrl] && <hr />}
            {top10Data[contentUrl] && <ul>
                {top10Data[contentUrl].map((topLink) => {
                    return <NavigationLinkWithDescription
                        textContent={topLink.title}
                        description={topLink.description}
                        href={topLink.URL}
                        key={topLink.title} />
                })}
            </ul>}
            <h1 className='mb-2'>The Navigation Links: </h1>
            <NavigationSearch searchEvent={searchEvent} />
            <hr />
            <ul>
                {filteredLinksData && filteredLinksData.map((link) => {
                    return <NavigationLink
                        textContent={link.text}
                        href={link.url}
                        key={link.text} />
                })}
            </ul>
        </div>
    );
}

export default NavigationLinks;