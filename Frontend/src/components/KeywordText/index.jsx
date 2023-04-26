import { h } from 'vue'
export default {
    name: 'KeywordText',
    props: {
        keyword: String,
        text: String
    },
    render(ctx){
        const vnodes = []
        const content = ctx.text.split(ctx.keyword)
        content.forEach(str => {
            vnodes.push(h('span', null, str))
            vnodes.push(h('span', {style: 'color: rgb(200, 0, 0)'}, ctx.keyword))
        });
        if(content.length > 0)
            vnodes.pop()
        return h('span', null, vnodes)
    }
}
