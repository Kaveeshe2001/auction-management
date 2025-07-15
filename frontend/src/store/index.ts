import { proxy } from "valtio";

const state = proxy({
    filterSidebar: false,
    dashboardSelected: 'Dashboard',
    switchToSeller: false,
});

export default state;