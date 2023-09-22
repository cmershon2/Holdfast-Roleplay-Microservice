export type serverToken = {
    id: string;
    name: string;
    token: string;
    active: boolean;
    createdAt: string;
}

export type servers = {
    id: string;
    name: string;
    status: string;
    description: string;
    lastRunDate: string;
}

export type holdfastUser = {
    id: string;
    steamId: string;
    status: string;
    isOnline: boolean;
    createdAt: string;
    updatedAt: string;
    role: string;
}

export type tableRowSelection = {
    name: string;
    checked: boolean;
}