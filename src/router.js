import Vue from 'vue'
import Router from 'vue-router'

import CancelOrder from './views/CancelOrder.vue'
import ChooseItemGroup from './views/ChooseItemGroup.vue'
import ChooseItem from './views/ChooseItem.vue'
import CustomizeItem from './views/CustomizeItem.vue'
import EatLocation from './views/EatLocation.vue'
import WhoIAm from './views/WhoIAm.vue'
import Start from './views/Start.vue'
import NewOrder from './views/NewOrder.vue'
import OrderCompleted from './views/OrderCompleted.vue'
import Payment from './views/Payment.vue'
import PaymentTabaco from './views/PaymentTabaco.vue'
import ChoseTabaco from './views/ChoseTabaco.vue'
import ChoseTabaco2 from './views/ChoseTabaco2.vue'
import ChoseTabaco3 from './views/ChoseTabaco3.vue'
import OrderSummary from './views/OrderSummary.vue'
import UpdateAvailable from './views/UpdateAvailable.vue'
import TabacoCompleted from './views/TabacoCompleted.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //{
    //  path: '/update',
    //  name: 'updateAvailable',
    //  component: UpdateAvailable,
   //   meta: { step: -1 }
  //  },
    //{
     // path: '/',
     // name: 'start',
      //component: Start,
      //meta: { step: 0 }
    //},
    {
      path: '/',
      name: 'newOrder',
      component: NewOrder,
      meta: { step: 0 }
    },
    {
      path: '/eat-location',
      name: 'eatLocation',
      component: EatLocation,
      meta: { step: 1 }
    },
    {
      path: '/choose-item-group',
      name: 'chooseItemGroup',
      component: ChooseItemGroup,
      meta: { step: 2 }
    },
    {
      path: '/choose-item',
      name: 'chooseItem',
      component: ChooseItem,
      meta: { step: 3 }
    },
    {
      path: '/customize-item',
      name: 'customizeItem',
      component: CustomizeItem,
      meta: { step: 4 }
    },
    {
      path: '/order-summary',
      name: 'orderSummary',
      component: OrderSummary,
      meta: { step: 5 }
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: { step: 6 }
    },
   
    {
      path: '/cancel-order',
      name: 'cancelOrder',
      component: CancelOrder,
      meta: { step: 7 }
    },
    {
      path: '/order-completed',
      name: 'orderCompleted',
      component: OrderCompleted,
      meta: { step: 8 }
    },
    {
      path: '/chose-tabaco',
      name: 'choseTabaco',
      component: ChoseTabaco,
      meta: {step: 0.5}
    }
    ,
    {
      path: '/chose-tabaco2',
      name: 'choseTabaco2',
      component: ChoseTabaco2,
      meta: {step: 0.6}
    },
    {
      path: '/chose-tabaco3',
      name: 'choseTabaco3',
      component: ChoseTabaco3,
      meta: {step: 0.65}
    },
    {
      path: '/paymenttabaco',
      name: 'paymentTabaco',
      component: PaymentTabaco,
      meta: {step: 0.7}
    },
    {
      path: '/tabacocompleted',
      name: 'tabacoCompleted',
      component: TabacoCompleted,
      meta: {step: 0.8}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
