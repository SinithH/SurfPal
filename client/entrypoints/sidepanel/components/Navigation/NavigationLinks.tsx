import { useState } from "react";
import NavigationSearch from "./NavigationSearch";
import { INavigationResponse } from "../../context/navigation-store";
import NavigationLink from "./NavigationLink";

const NavigationLinks: React.FC<{links: INavigationResponse}> = ({ links }) => {
    let [filteredLinksData, setFilteredLinksData] = useState(links.data.navigation);

    const searchEvent = (event: any) => {
        const value = event.target.value
        if (!value) {
            setFilteredLinksData(links.data.navigation);
        }
        setFilteredLinksData(links.data.navigation.filter((row) => row.text.includes(value)));
    }
    return (
        <div className="p-3">
            <h1 className='mb-2'>The Navigation Links: </h1>
            <NavigationSearch searchEvent={searchEvent} />
            <hr />
            <ul>
                {filteredLinksData.map((link) => {
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