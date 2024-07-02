import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import WeeklyNightComp from "@/components/WeeklyNightComp.vue";

const routes = [
    {
        path: "/",
        component: App
    },
    {
        path: "/weeklyNight",
        component: WeeklyNightComp,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;