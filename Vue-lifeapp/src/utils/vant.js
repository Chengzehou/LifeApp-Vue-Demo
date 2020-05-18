//方式1. 引入vant全部      npm i vant -S
// import Vant from 'vant'; 
// import 'vant/lib/index.css';
// Vue.use(Vant);


//方式2. 按需求加载vant 
//npm i babel-plugin-import -D    安装插件
//对于使用 babel7 的用户，可以在 babel.config.js 中配置
// module.exports = {
//     plugins: [
//       ['import', {
//         libraryName: 'vant',
//         libraryDirectory: 'es',
//         style: true
//       }, 'vant']
//     ]
//   };
import Vue from 'vue';
import {
    Tabbar, TabbarItem, NavBar, Icon, IndexBar, IndexAnchor, Cell, Tab, Tabs, Toast, Grid, GridItem,
    Image as VanImage, NoticeBar, Lazyload, Sidebar, SidebarItem, SubmitBar, Checkbox, CheckboxGroup,
    Empty, Button, Search, Form, Field, Card, Tag, GoodsAction, GoodsActionIcon, GoodsActionButton,
    Swipe, SwipeItem, Panel, SwipeCell
} from 'vant';

Vue.use(Tabbar)
    .use(TabbarItem)
    .use(NavBar)
    .use(Icon)
    .use(IndexBar)
    .use(IndexAnchor)
    .use(Cell)
    .use(Tab)
    .use(Tabs)
    .use(Toast)
    .use(Grid)
    .use(GridItem)
    .use(VanImage)
    .use(NoticeBar)
    .use(Lazyload)
    .use(Sidebar)
    .use(SidebarItem)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Empty)
    .use(Button)
    .use(Search)
    .use(Form)
    .use(Field)
    .use(Card)
    .use(Tag)
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton)
    .use(Swipe)
    .use(SwipeItem)
    .use(Panel)
    .use(SwipeCell)
