export type notification = {
    description: string;
    type: notificationType;
}

enum notificationType {
    SUCCESS,
    FAILURE,
    INFORMATION,
    WARNING
}