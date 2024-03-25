import { useEffect, useState } from "react";
import NavigationSearch from "./NavigationSearch";
import NavigationLink from "./NavigationLink";
import INavigationResponse from "@/interfaces/navigation-resopnse.interface";
import useNavigationStore from "../../context/navigation-store";
import NavigationLinkWithDescription from "./NavigationLinkWithDescription";

const NavigationLinks: React.FC<{ links: INavigationResponse }> = ({ links }) => {
    const [filteredLinksData, setFilteredLinksData] = useState(links?.data.navigation);
    const [combinedLinks, setCombinedLinks] = useState<{ title: string; URL: string; description?: string }[]>([]);
    const { top10Data, contentUrl } = useNavigationStore();

    const searchEvent = (event: any) => {
        const value = event.target.value
        if (!value) {
            setFilteredLinksData(links.data.navigation);
        }
        setFilteredLinksData(links.data.navigation.filter((row) => row.text.toLowerCase().includes(value.toLowerCase())));
    }

    useEffect(() => {
        let combinedObjects: { title: string; URL: string; description?: string }[] = [];
        filteredLinksData.forEach(obj => {
            combinedObjects.push({ title: obj.text, URL: obj.url });
        });
        if (!top10Data[contentUrl]) {
            setCombinedLinks(combinedObjects);
            return;
        }
        top10Data[contentUrl].forEach(obj => {
            const object = combinedObjects.find(link => link.URL == obj.URL)
            if (object) {
                object.description = obj.description;
            }
        });
        combinedObjects = combinedObjects.sort((a, b) => {
            if (a.description && !b.description) {
                return -1;
            } else if (!a.description && b.description) {
                return 1;
            } else {
                return 0;
            }
        })
        setCombinedLinks(combinedObjects);
    }, [links.data.navigation, filteredLinksData, top10Data])

    return (
        <div className="p-3">
            <h1 className='mb-2'>The Navigation Links: </h1>
            <NavigationSearch searchEvent={searchEvent} />
            <hr />
            <ul>
                {filteredLinksData && combinedLinks.map((link) => {
                    if (link.description) {
                        return <NavigationLinkWithDescription
                            textContent={link.title}
                            description={link.description}
                            href={link.URL}
                            key={link.title} />
                    }
                    return <NavigationLink
                        textContent={link.title}
                        href={link.URL}
                        key={link.title} />
                })}
            </ul>
        </div>
    );
}

export default NavigationLinks;

