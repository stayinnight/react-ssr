import Home from "../../client/pages/home/Home";
import List from "../../client/pages/list/List";
import Profile from "../../client/pages/profile/Profile";

const config = [
    {
        path: '/home',
        component: Home,
        exect: true
    },
    {
        path: '/list',
        component: List,
        exect: true
    },
    {
        path: '/profile',
        component: Profile,
        exect: true
    },
]

export default config