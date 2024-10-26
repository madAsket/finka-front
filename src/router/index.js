import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserProfileView from '@/views/profile/UserProfileView.vue'
import ProjectExpencesTypeListView from '@/views/projects/ProjectExpencesTypeListView.vue'
import ProjectCurrencyListView from '@/views/projects/ProjectCurrencyListView.vue'
import ProjectUserListView from '@/views/projects/ProjectUserListView.vue'
import ProjectsSettingsView from '@/views/projects/ProjectsSettingsView.vue'
import StatisticExpensesListView from '@/views/statistic/StatisticExpensesListView.vue'
import StatisticDashboardView from '@/views/statistic/StatisticDashboardView.vue'
import BalanceDepositListView from '@/views/balance/BalanceDepositListView.vue'
import BalanceDashboardView from '@/views/balance/BalanceDashboardView.vue'
import ExpensesLimitListView from '@/views/dashboard/ExpensesLimitListView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import BalanceView from '@/views/balance/BalanceView.vue'
import BalanceTransfersListView from '@/views/balance/BalanceTransfersListView.vue'
import ProjectListView from '@/views/projects/ProjectListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, //Login or DashboardView (Edit limits will be in modal)
      children:[
        {
          path:"",
          name:"dashboard",
          component:DashboardView
        },
        {
          path: '/limits',
          name: 'limits',
          component: ExpensesLimitListView //Login or DashboardView (Edit limits will be in modal)
        },
      ]
    },

    { 
      path: '/balance',
      component: BalanceView, //list of current items of balance with CRUD feature, total amount with tabs for details
      children:[
        {
          path:"",
          name:"balance",
          component:BalanceDashboardView
        },
        {
          path:"deposits",
          name:"deposits",
          component:BalanceDepositListView //List of debits with CRUD feature;
        },
        {
          path:"transfers",
          name:"transfers",
          component:BalanceTransfersListView //List of debits with CRUD feature;
        },
      ]
    },
    { 
      path: '/statistic',
      component: StatisticDashboardView, //Default view - is statistic for current month for limits/There is selector for other monthes.
      children:[
        {
          path:"/expenses",
          component:StatisticExpensesListView //General Statistic of total expenses by month (with graphics?)
        },
      ]
    },
    {
      path: '/projects',
      name: 'projectsettings',
      component: ProjectsSettingsView, //list of projects;
      children:[
        { 
          path: '',
          name:"projects",
          component: ProjectListView, //list of users with CRUD features
        },
        { 
          path: ':id/users',
          component: ProjectUserListView, //list of users with CRUD features
        },
        { 
          path: ':id/currency',
          component: ProjectCurrencyListView, //list of currency with CRUD features
        },
        { 
          path: ':id/expensetypes',
          component: ProjectExpencesTypeListView, //list of type expenses with CRUD features
        },
      ]
    },
    { 
      path: '/profile',
      component: UserProfileView, //avatar, username, password form etc.
      // children:[
      //   //password change,
      //   //notifications
      //   //etc.
      // ]
    },
  ] 
});

export default router
