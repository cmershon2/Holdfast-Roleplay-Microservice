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