import { useAuthState } from "../../hooks/useAuthState";
import { useNotification } from "../../hooks/useNotifications";
import { UnApprovedUsers } from "../../components/admin/unApprovedUsers";

function AdminPage(){

    const userInfo = useAuthState()
    const notificationService = useNotification(userInfo.getAccessToken())

    return( 
    <div>
        Admin page
        <UnApprovedUsers />
    </div>
    );
}

export { AdminPage };
