import { sideBarLink } from '@/types/navigation/types';
import { GiBackpack, GiCompass, GiPerson, GiAbstract050, GiAbdominalArmor, GiGearHammer, GiCoins, GiShop, GiSecretBook, GiKey} from 'react-icons/gi';

export const SideBarStructure: sideBarLink[] = [
    {
        label: 'Overview',
        href: '/app',
        icon: GiAbstract050,
        links: undefined
    },
    {
        label: 'Players',
        href: '/app/players',
        icon: GiPerson,
        links: undefined
    },
    {
        label: 'Economy',
        icon: GiCoins,
        href: undefined,
        links: [
            {
                label: 'Items',
                href: '/app/items',
                icon: GiAbdominalArmor,
                links: undefined
            },
            {
                label: 'Shops',
                href: '/app/shops',
                icon: GiShop,
                links: undefined
            },
        ]
    },
    {
        label: 'Quests',
        href: '/app/quests',
        icon: GiCompass,
        links: undefined
    },
    {
        label: 'Inventories',
        href: '/app/inventories',
        icon: GiBackpack,
        links: undefined
    },
]

export const SideBarAdminStructure : sideBarLink[] = [
    {
        label: 'Admin Settings',
        icon: GiGearHammer,
        href: undefined,
        links: [
            {
                label: 'Manage Users',
                href: '/app/users',
                icon: GiSecretBook,
                links: undefined
            },
            {
                label: 'Manage Tokens',
                href: '/app/tokens',
                icon: GiKey,
                links: undefined
            }
        ]
    }
]