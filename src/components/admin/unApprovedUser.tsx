import { ApproveUser } from "../../api/types/types"

function UnApprovedUser(user: ApproveUser, key: number ) {
    return(
        <div key = {key}>
            <div>{user.userName}</div>
            <div>{user.email}</div>
            <div>{user.registrationDate}</div>
        </div>
    )
}

export { UnApprovedUser }