import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardInfo from "../DashboardInfo/DashboardInfo";
import {ContentContainer} from "../App/AppStyle"


function Dashboard() {
    return (
        <ContentContainer className="mt-4">
            <DashboardStats />
            <DashboardInfo />
        </ContentContainer>
    )
}

export default Dashboard;
