<template>
    <section>
        <b-message>
            <template #header>
                {{post.name}} <b-tag>{{time}}</b-tag>
            </template>
            {{post.msg}}
        </b-message>    
    </section>
</template>

<script>
export default {
    name: 'Post',

    props: {
        post: {type: Object, required: false, }
    },
    computed: {
        time: function() {
            let timeToShow = new Date(this.post.time);
            return timeToShow.toLocaleTimeString();
        }
    }
}
</script>
<style scoped>

</style>