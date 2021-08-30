import Vue from 'vue';
import fastreplyBox from './fastreply-box.vue';
const fastreplyId = 'rs-fastreply';

const create = (container, clip) => {
    try {
        return new Vue({
            data() {
                return { clip };
            },
            render(h) {
                return h(fastreplyBox, {
                    props: {}
                });
            }
        }).$mount(container);
    } catch (error) {
        console.log("init vue fail", error);
    }
};

export function createFastReply(clip) {
    let oldBox = document.getElementById(fastreplyId)
    if (oldBox) {
        return
    }

    let copyable_area = document.querySelector("footer  .copyable-area")

    let child_div = copyable_area.firstElementChild
    let child_div_height = child_div.offsetHeight

    let fastreply_container = document.createElement("div")
    fastreply_container.id = fastreplyId
    fastreply_container.style.display = 'flex'
    copyable_area.insertBefore(fastreply_container, child_div)

    let fastreply_box = document.createElement("div")
    fastreply_container.appendChild(fastreply_box)

    fastreply_box.style.backgroundColor = "red"
    fastreply_box.style.height = child_div_height + "px"

    create(fastreply_box, clip)

    fastreply_container.style.height = child_div_height + "px"
}