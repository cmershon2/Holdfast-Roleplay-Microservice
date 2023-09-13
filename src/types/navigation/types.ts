import { IconType } from "react-icons";

export type sideBarLink = {
    label: string;
    href: string | undefined;
    icon: IconType;
    links: sideBarLink[] | undefined;
}