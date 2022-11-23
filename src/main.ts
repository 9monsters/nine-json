import { createApp } from 'vue'
import Antd from 'ant-design-vue'

import './styles/index.less'
import App from './App.vue'

createApp(App)
    .use(Antd)
    .mount('#app')
