import Vue from 'vue';
import Container from './container.vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-theme-chalk'
import "@iconfu/svg-inject"

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 9999999,
  locale
});


const create = (container, config, clip) => {
  try {
    let inst = new Vue({
      data() {
        return {
          clip
        };
      },
      render(h) {
        return h(Container, {
          props: {
            config
          }
        });
      }
    }).$mount(container)
    return inst

  } catch (error) {
    console.log("init vue fail", error);
  }
};

export const createAppUI = create;