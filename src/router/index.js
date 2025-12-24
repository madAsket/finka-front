import { createRouter, createWebHistory } from 'vue-router'
import ExpensesView from '@/views/expenses/ExpensesPage.vue'
import UserProfileView from '@/views/profile/UserProfile.vue'
import ProjectUserListView from '@/views/projects/users/ProjectUserList.vue'
import ProjectSettingsView from '@/views/projects/ProjectSettings.vue'
import BalanceDepositListView from '@/views/balance/deposits/DepositList.vue'
import BalanceStorageListView from '@/views/balance/storages/StorageList.vue'
import ExpensesLimitListView from '@/views/expenses/limits/ExpenseLimitList.vue'
import ExpenseListView from '@/views/expenses/ExpenseList.vue'
import BalanceView from '@/views/balance/BalancePage.vue'
import BalanceTransferListView from '@/views/balance/transfers/TransferList.vue'
import ProjectListView from '@/views/projects/ProjectList.vue'
import LoginView from '@/views/auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth';
import SignUpView from '@/views/auth/SignUpView.vue'
import SecuritySettingsView from '@/views/profile/SecuritySettings.vue'
import ProfileSettingsView from '@/views/profile/ProfileSettings.vue'
import AnalyticsPage from '@/views/analytics/AnalyticsPage.vue'
// import AnalyticExpenses from '@/views/analytics/expenses/AnalyticExpenses.vue'
import AnalyticAI from '@/views/analytics/ai/AnalyticAI.vue'
import SubscriptionSettings from '@/views/profile/SubscriptionSettings.vue'
import ResetPasswordForm from '@/views/auth/resetpass/ResetPasswordForm.vue'
import ResetPasswordConfirm from '@/views/auth/resetpass/ResetPasswordConfirm.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: ExpensesView, //DashboardView (Edit limits will be in modal)
      children:[
        {
          path:"",
          name:"expenses",
          component:ExpenseListView
        },
        {
          path: '/limits',
          name: 'limits',
          component: ExpensesLimitListView //Login or DashboardView (Edit limits will be in modal)
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
          authNotRequired:true,
          onlyUnathorized:true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta:{
          authNotRequired:true,
          onlyUnathorized:true
      }
    },
    { 
      path: '/resetpass',
      name:'resetpass',
      component: ResetPasswordForm,
      meta:{
        authNotRequired:true,
        onlyUnathorized:true
      }
    },
    { 
      path: '/resetpass/:token',
      component: ResetPasswordConfirm,
      name:'resetpassConfirm',
      meta:{
        authNotRequired:true,
        onlyUnathorized:true
      }
    },
    { 
      path: '/balance',
      component: BalanceView, //list of current items of balance with CRUD feature, total amount with tabs for details
      children:[
        {
          path:"",
          name:"balance",
          component:BalanceStorageListView
        },
        {
          path:"deposits",
          name:"deposits",
          component:BalanceDepositListView //List of debits with CRUD feature;
        },
        {
          path:"transfers",
          name:"transfers",
          component:BalanceTransferListView //List of debits with CRUD feature;
        },
      ]
    },
    { 
      path: '/analytics',
      component: AnalyticsPage, //Default view - is statistic for current month for limits/There is selector for other monthes.
      children:[
        {
          path:"",
          name:"analyticexpenses",
          component:()=>import('@/views/analytics/expenses/AnalyticExpenses.vue') //General Statistic of total expenses by month (with graphics?)
        },
        {
          path:"analyticai",
          name:"analyticai",
          component:AnalyticAI //General Statistic of total expenses by month (with graphics?)
        },
      ]
    },
    {
      path: '/projects',
      name: 'projectsettings',
      component: ProjectSettingsView, //list of projects;
      children:[
        { 
          path: '',
          name:"projects",
          component: ProjectListView, //list of users with CRUD features
        },
        { 
          path: 'users',
          name:"projectUsers",
          component: ProjectUserListView, //list of users with CRUD features
        },
      ]
    },
    { 
      path: '/profile',
      component: UserProfileView, //avatar, username, password form etc.
      children:[
        { 
          path: '',
          name:"profile",
          component: ProfileSettingsView, 
        },
        { 
          path: 'subscription',
          name:"manage_subscription",
          component: SubscriptionSettings, 
        },
        { 
          path: 'security',
          name:"security",
          component: SecuritySettingsView, 
        },
      ]
    },
  ] 
});

async function getCurrentUser(){
  const auth = useAuthStore();
  console.log('token exist trying get user');
  await auth.syncCurrentUser();
}

const checkRouteMeta = (to, from, next, auth)=>{
  if(to.meta.authNotRequired) {
    if(to.meta.onlyUnathorized && auth.user){
        return next("/");
      }
    return next();
  }
  if(!auth.user){
    return next("/login");
  }
  return next();
}

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
      // Non-protected route, allow access
  if(!auth.user && auth.token) {
      try {
        await getCurrentUser();
        return checkRouteMeta(to, from, next, auth);
      }catch(e){
        next("/login");
      }
    // User is not authenticated, redirect to login
  }else{
      checkRouteMeta(to, from, next, auth);
  }
});

export default router
