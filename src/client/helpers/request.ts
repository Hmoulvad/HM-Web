export function holidayStatus (status: boolean | undefined | null) {
    if ( status === null || status === undefined) {
        return "Pending"
    } else {
        if ( status ) {
            return "Approved"
        } else {
            return "Unapproved"
        }
    }
}